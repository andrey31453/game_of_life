import { Canvas, live_config, Canvas_Elem, vars } from '../bunddler.mjs'

//
//
//

class Life_Info_View {
  #canvas
  #state = {}
  #config

  constructor(node, config) {
    this.#canvas = new Canvas(node, {
      background: config[vars.background_color_primary],
      padding: config[vars.gap_s],
    })
    this.#config = config
  }

  //

  update = (model) => {
    this.#update_state(model)
    this.#canvas.update(this.#canvas_data(model))
  }

  //

  get #style() {
    return {
      size: this.#config[vars.font_size_d],
      weight: this.#config[vars.font_weight_d],
      height: this.#config[vars.line_height_d],
      color: this.#config[vars.font_color_primary],
    }
  }

  //

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

class Life_Field_View {
  #canvas
  #state = {}
  #config

  constructor(node, config) {
    this.#canvas = new Canvas(node, {})
    this.#config = config
  }

  //

  update = (model) => {
    if (this.#not_need_update(model.hash)) return

    this.#update_state(model)
    this.#canvas.update(this.#canvas_data(model))
  }

  //

  #not_need_update = (hash) => this.#state.hash === hash

  #update_state = ({ lives, hash }) => {
    this.#state.hash = hash
    this.#state.lives = lives
  }

  #canvas_data = () => []
}

//
//
//

export class Life_View {
  #info_view
  #field_view
  #get_model
  #model
  #on = false

  constructor(field_node, info_node, get_model, config) {
    this.#info_view = new Life_Info_View(info_node, config)
    this.#field_view = new Life_Field_View(field_node, config)
    this.#get_model = get_model
  }

  //

  update = () => this.#update()

  start = () => {
    this.#on = true
    this.#animate()
  }

  pause = () => (this.#on = false)

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
