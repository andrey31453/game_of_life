import { Canvas, Canvas_Elem, vars } from '../bunddler.mjs'

//
//
//

export class Live_Info_View {
  #node
  #canvas
  #state = {}
  #config
  #get_config

  constructor(node, get_config) {
    this.#node = node
    this.#get_config = get_config
    this.#update_config()
    this.#set_canvas()
  }

  //

  update = (model) => {
    this.#update_state(model)
    this.#canvas.update(this.#canvas_data())
  }

  hard_update = () => {
    this.#update_config()
    // TODO add update sizes method from canvas
    this.#set_canvas()
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

  #set_canvas = () => {
    this.#canvas = new Canvas(this.#node, {
      background: this.#config[vars.background_color.primary],
      padding: this.#config[vars.gap.s],
    })
  }

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
