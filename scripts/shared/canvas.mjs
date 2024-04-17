import { delay, wait_condition, decimal } from '../bunddler.mjs'

class Canvas_Coords {
  constructor(position, config) {
    this.width = position[0] * config.width
    this.height = position[1] * config.height
  }
}

// TODO fix blured font

class Canvas_Text {
  #options

  constructor(options) {
    this.#options = options
  }

  drow = (node, ctx, config) => {
    ctx.fillStyle = this.#options.style.color
    // TODO change regular to vars.param
    ctx.font = `${this.#options.style.weight} ${
      this.#options.style.size
    } regular`
    const { width, height } = new Canvas_Coords(this.#options.position, config)

    ctx.fillText(this.#options.text, width, height)
  }
}

class Canvas_Round {
  #options
  #two_pi = 2 * Math.PI

  constructor(options) {
    this.#options = options
  }

  drow = (node, ctx, config) => {
    if (!+this.#options.style.width) return

    ctx.lineWidth = this.#options.style.width
    ctx.strokeStyle = this.#options.style.color
    const { width, height } = new Canvas_Coords(this.#options.position, config)

    ctx.beginPath()
    ctx.arc(width, height, this.#options.style.radius, 0, this.#two_pi)
    ctx.closePath()
    ctx.stroke()
  }
}

class Canvas_Circle {
  #options
  #two_pi = 2 * Math.PI

  constructor(options) {
    this.#options = options
  }

  drow = (node, ctx, config) => {
    ctx.fillStyle = this.#options.style.color
    const { width, height } = new Canvas_Coords(this.#options.position, config)

    ctx.beginPath()
    ctx.arc(width, height, this.#options.style.radius, 0, this.#two_pi)
    ctx.closePath()
    ctx.fill()
  }
}

export class Canvas_Elem {
  #elems = {
    text: Canvas_Text,
    round: Canvas_Round,
    circle: Canvas_Circle,
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
        decimal(this.#config.width) ||
        Math.floor(this.#node.offsetWidth - 2 * decimal(this.#config.padding)),
      // TODO wtf??? delete magic 7!
      height:
        decimal(this.#config.height) ||
        this.#node.offsetHeight - 2 * decimal(this.#config.padding) - 7,
      padding: this.#config.padding,
      background: this.#config.background || '#000000',
    }
  }
}

export class Canvas {
  #node
  #ctx
  #state
  #default_state
  #config
  #node_config

  constructor(node, config, default_state = []) {
    this.#node = node
    this.#ctx = this.#node.getContext('2d')
    this.#default_state = default_state
    this.#state = default_state

    this.#init()
    this.update_config(config)
  }

  //

  soft_update = (state) => {
    this.#soft_drow(state)
  }

  clears = async (clears) => {
    await wait_condition(() => this.#node_config)
    clears.forEach(this.#clear)
  }

  update = (state) => {
    this.#state = [...this.#default_state, ...state]
    this.#drow()
  }

  update_config = async (config) => {
    this.#update_config(config)
    this.#resize()
  }

  //

  #init = () => window.addEventListener('resize', this.#resize)

  #update_config = (config) =>
    (this.#config = {
      ...this.#config,
      ...config,
    })

  #update_node_config = async () => {
    this.#node_config = await new Canvas_Config(
      this.#node,
      this.#config
    ).get_config()
  }

  #resize = async () => {
    await this.#update_node_config()
    this.#update_node()
    this.#drow()
  }

  #update_node = () => {
    this.#node.width = this.#node_config.width
    this.#node.height = this.#node_config.height

    this.#node.style.background = this.#node_config.background
    this.#node.style.top = this.#node_config.padding
    this.#node.style.left = this.#node_config.padding
    this.#node.style.right = this.#node_config.padding
    this.#node.style.bottom = this.#node_config.padding

    this.#node.parentElement.style.background = this.#node_config.background
  }

  #drow = async () => {
    await wait_condition(this.#is_ready, 100)
    this.#clear()

    this.#state.forEach((canvas_elem) =>
      canvas_elem.drow(this.#node, this.#ctx, this.#node_config)
    )
  }

  #soft_drow = async (state) => {
    await wait_condition(this.#is_ready, 100)

    state.forEach((canvas_elem) =>
      canvas_elem.drow(this.#node, this.#ctx, this.#node_config)
    )
  }

  #is_ready = () => Object.keys(this.#node_config || {}).length

  #clear = ([x1, y1, x2, y2] = [0, 0, 1, 1]) => {
    this.#ctx.clearRect(
      x1 * this.#node_config.width,
      y1 * this.#node_config.height,
      (x2 - x1) * this.#node_config.width,
      (y2 - y1) * this.#node_config.height
    )
  }
}
