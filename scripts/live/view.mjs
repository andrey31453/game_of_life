import {
  Canvas,
  live_config,
  Canvas_Elem,
  vars,
  decimal,
  Fields,
} from '../bunddler.mjs'

//
//
//

class Live_Info_View {
  #node
  #canvas
  #state = {}
  #config
  #get_config

  constructor(node, get_config) {
    this.#node = node
    this.#get_config = get_config
    this.#update_config()

    this.#canvas = new Canvas(this.#node, {
      background: this.#config[vars.background_color.primary],
      padding: this.#config[vars.gap.s],
    })
  }

  //

  update = (model) => {
    this.#update_state(model)
    this.#canvas.update(this.#canvas_data())
  }

  update_config = () => {
    this.#update_config()
    this.#canvas = new Canvas(this.#node, {
      background: this.#config[vars.background_color.primary],
      padding: this.#config[vars.gap.s],
    })
  }

  //

  get #style() {
    return {
      size: this.#config[vars.font_size.d],
      weight: this.#config[vars.font_weight.s],
      height: this.#config[vars.line_height.d],
      color: this.#config[vars.font_color.primary],
    }
  }

  //

  #update_config = () => {
    this.#config = this.#get_config()
  }

  #update_state = ({ duration, history, status }) => {
    this.#state.duration = duration / 1000
    this.#state.generations_quantity = history.length
    this.#state.status = status
  }

  #canvas_data = () => [
    new Canvas_Elem('text', {
      text: `Длительность: ${this.#state.duration} c`,
      style: this.#style,
      position: [0, 0.2],
    }).value,

    new Canvas_Elem('text', {
      text: `Генерация: ${this.#state.generations_quantity}`,
      style: this.#style,
      position: [0, 0.5],
    }).value,

    new Canvas_Elem('text', {
      text: `Статус: ${this.#state.status}`,
      style: this.#style,
      position: [0, 0.8],
    }).value,
  ]
}

//
//
//

class Live_Field_View {
  #node
  #canvas
  #state = {}
  #config
  #get_config

  constructor(node, get_config) {
    this.#node = node
    this.#get_config = get_config
    this.#update_config()

    this.#canvas = new Canvas(this.#node, {
      background: this.#config[vars.background_color.secondary],
      padding: this.#config[vars.gap.l],
      width: decimal(this.#config[vars.icon.live.size]) * this.#config.x,
      height: decimal(this.#config[vars.icon.live.size]) * this.#config.y,
    })
  }

  //

  update = (model) => {
    if (this.#not_need_update(model.hash)) return
    console.log('model: ', model)

    this.#update_config()
    this.#update_state(model)
    this.#canvas.update(this.#canvas_data())
  }

  update_config = () => {
    this.#update_config()
    this.#canvas = new Canvas(this.#node, {
      background: this.#config[vars.background_color.secondary],
      padding: this.#config[vars.gap.l],
      width: decimal(this.#config[vars.icon.live.size]) * this.#config.x,
      height: decimal(this.#config[vars.icon.live.size]) * this.#config.y,
    })
  }

  // TODO remove magic ${}:${}
  click = ({ x, y }) => `${this.#field_coord(x)}:${this.#field_coord(y)}`

  //

  #update_config = () => {
    this.#config = this.#get_config()
    this.#state.hash = null
  }

  #field_coord = (mouse_coord) =>
    Math.round(
      (mouse_coord - 0.5 * decimal(this.#config[vars.icon.live.size])) /
        decimal(this.#config[vars.icon.live.size])
    )

  #not_need_update = (hash) => this.#state.hash === hash

  #update_state = ({ lives, hash, size }) => {
    this.#state.hash = hash
    this.#state.lives = lives
    this.#state.size = size
  }

  #canvas_data = () => [...this.#emptys(), ...this.#lives()]

  #emptys = () =>
    new Fields(this.#state.size, (x, y) =>
      this.#empty(
        (x + 0.5) / this.#state.size.x,
        (y + 0.5) / this.#state.size.y
      )
    ).value

  #empty = (x, y) =>
    new Canvas_Elem(this.#config[vars.icon.live.empty_typy], {
      style: {
        radius:
          0.5 *
          this.#config[vars.icon.live.wrapper_proportion] *
          decimal(this.#config[vars.icon.live.size]),
        color: this.#config[vars.color.secondary],
        width: decimal(this.#config[vars.icon.live.wrapper_width]),
      },
      position: [x, y],
    }).value

  #lives = () =>
    new Fields(this.#state.size, (x, y) => {
      if (this.#is_not_live(x, y)) return

      return this.#live(
        (x + 0.5) / this.#state.size.x,
        (y + 0.5) / this.#state.size.y
      )
    }).value

  // TODO remove magic ${x}:${y}
  #is_not_live = (x, y) => !this.#state.lives.includes(`${x}:${y}`)

  #live = (x, y) =>
    new Canvas_Elem('circle', {
      style: {
        radius:
          0.5 *
          this.#config[vars.icon.live.inner_proportion] *
          decimal(this.#config[vars.icon.live.size]),
        color: this.#config[vars.color.primary],
      },
      position: [x, y],
    }).value
}

//
//
//

export class Live_View {
  #info_view
  #field_view
  #get_model
  #model
  #on = false

  constructor(field_node, info_node, get_model, get_config) {
    this.#info_view = new Live_Info_View(info_node, get_config)
    this.#field_view = new Live_Field_View(field_node, get_config)
    this.#get_model = get_model
  }

  //

  update = () => this.#update()

  update_config = () => {
    this.#info_view.update_config()
    this.#field_view.update_config()
    this.#update()
  }

  start = () => {
    this.#on = true
    this.#animate()
  }

  pause = () => (this.#on = false)

  click = (e) => this.#field_view.click(e)

  //

  get #end_to_game() {
    return [live_config.statuses.loose, live_config.statuses.won].includes(
      this.#model.status
    )
  }

  //

  #recurse = () => requestAnimationFrame(() => this.#animate())

  #animate = () => {
    if (!this.#on) return

    this.#recurse()
    this.#update()
  }

  #update = () => {
    this.#model = this.#get_model()
    this.#field_view.update(this.#model)
    this.#info_view.update(this.#model)
    this.#end_to_game && this.pause()
  }
}
