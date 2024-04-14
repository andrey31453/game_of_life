import { delay, wait_condition } from '../bunddler.mjs'

// TODO fix blured font

class Canvas_Text {
  #options

  constructor(options) {
    this.#options = options
  }

  drow = (node, ctx, config) => {
    ctx.fillStyle = this.#options.style.color
    ctx.font = '16px regular'

    ctx.fillText(
      this.#options.text,
      this.#options.position[0] * config.width,
      this.#options.position[1] * config.height
    )
  }
}

export class Canvas_Elem {
  #elems = {
    text: Canvas_Text,
  }

  constructor(type, options) {
    const elem = this.#elems[type]
    if (!elem) throw new Error(`don\'t correct elem type ${type}`)
    this.value = new elem(options)
  }
}

class Canvas_Config {
  #node
  #config
  constructor(node, config) {
    this.#node = node.parentElement
    this.#config = config
  }

  get_config = async () => {
    await delay()

    return {
      width:
        this.#sanitize(this.#config.width) ||
        Math.floor(
          this.#node.offsetWidth - 2 * this.#sanitize(this.#config.padding)
        ),
      // TODO wtf??? delete magic 7!
      height:
        this.#sanitize(this.#config.height) ||
        this.#node.offsetHeight - 2 * this.#sanitize(this.#config.padding) - 7,
      padding: this.#config.padding,
      background: this.#config.background || '#000000',
    }
  }

  #sanitize = (v) => `${v}`.replace(/\D/gi, '')
}

export class Canvas {
  #node
  #ctx
  #state
  #default_state
  #config
  #canvas_config

  constructor(node, config, default_state = []) {
    this.#node = node
    this.#ctx = this.#node.getContext('2d')
    this.#default_state = default_state
    this.#state = default_state

    this.#init()
    this.update_config(config)
  }

  //

  update = (state) => {
    this.#state = [...this.#default_state, ...state]
    this.#drow()
  }

  update_config = (config) => {
    this.#config = config
    this.#hard_drow()
  }

  //

  #init = () => {
    window.addEventListener('resize', this.#hard_drow)
  }

  #hard_drow = async () => {
    this.#canvas_config = await new Canvas_Config(
      this.#node,
      this.#config
    ).get_config()
    this.#resize()
    this.#drow()
  }

  #resize = () => {
    this.#node.width = this.#canvas_config.width
    this.#node.height = this.#canvas_config.height

    this.#node.style.background = this.#canvas_config.background
    this.#node.style.top = this.#canvas_config.padding
    this.#node.style.left = this.#canvas_config.padding
    this.#node.style.right = this.#canvas_config.padding
    this.#node.style.bottom = this.#canvas_config.padding

    this.#node.parentElement.style.background = this.#canvas_config.background
  }

  #drow = async () => {
    await wait_condition(this.#is_ready, 100)
    this.#clear()
    this.#state.forEach((canvas_elem) =>
      canvas_elem.drow(this.#node, this.#ctx, this.#canvas_config)
    )
  }

  #is_ready = () => this.#canvas_config

  #clear = () => {
    this.#ctx.clearRect(
      0,
      0,
      this.#canvas_config.width,
      this.#canvas_config.height
    )
  }
}
