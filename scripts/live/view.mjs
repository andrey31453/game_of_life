import {
  Canvas,
  live_config,
  Canvas_Elem,
  vars,
  decimal,
  Fields_Canvas_Data,
  Update_Lives_Canvas_Data,
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

  hard_update = () => {
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
  #container_node
  #canvas
  #model = {}
  #config
  #get_config

  constructor(node, container_node, get_config) {
    this.#node = node
    this.#container_node = container_node
    this.#get_config = get_config
    this.#update_config()
    this.#set_canvas()
  }

  //

  update = (model) => {
    if (this.#not_need_update(model.hash)) return

    this.#update_state(model)
    this.#update_fields()
  }

  hard_update = (model) => {
    this.#update_config()
    this.#update_state(model)
    // TODO add update sizes method from canvas
    this.#set_canvas()
    this.#model.hard = true
    this.#update_fields()
  }

  // TODO remove magic ${}:${}
  click = ({ x, y }) => `${this.#field_coord(x)}:${this.#field_coord(y)}`

  //

  #set_canvas = () => {
    this.#canvas = new Canvas(this.#node, {
      background: this.#config[vars.background_color.secondary],
      padding: this.#config[vars.gap.l],
      width: decimal(this.#config[vars.icon.live.size]) * this.#config.x,
      height: decimal(this.#config[vars.icon.live.size]) * this.#config.y,
    })
  }

  #hard_update_fields = () => {
    this.#canvas.update(
      new Fields_Canvas_Data(this.#model.lives, this.#model.size, this.#config)
        .value
    )

    this.#model.hard = false
  }

  #soft_update_fields = () => {
    const { clears, lives, emptyes } = new Update_Lives_Canvas_Data({
      borns: this.#model.borns,
      deads: this.#model.deads,
      size: this.#model.size,
      config: this.#config,
    })

    this.#canvas.clears(clears)
    this.#canvas.soft_update([...lives, ...emptyes])
  }

  #update_fields = () => {
    if (!this.#model.lives) return

    this.#model.hard ? this.#hard_update_fields() : this.#soft_update_fields()
  }

  #update_config = () => {
    this.#config = this.#get_config()
    this.#model.hash = null
  }

  #field_coord = (mouse_coord) =>
    Math.round(
      (mouse_coord - 0.5 * decimal(this.#config[vars.icon.live.size])) /
        decimal(this.#config[vars.icon.live.size])
    )

  #not_need_update = (hash) => this.#model.hash === hash

  #update_state = (model) =>
    (this.#model = {
      ...this.#model,
      ...model,
    })
}

//
//
//

export class Live_View {
  #info_view
  #field_view
  #get_model
  #on = false

  constructor(
    { field_node, field_cont_node, info_node },
    get_model,
    get_config
  ) {
    this.#info_view = new Live_Info_View(info_node, get_config)
    this.#field_view = new Live_Field_View(
      field_node,
      field_cont_node,
      get_config
    )
    this.#get_model = get_model
  }

  //

  update = () => this.#update()

  hard_update = () => {
    const model = this.#get_model()
    this.#info_view.hard_update()
    this.#field_view.hard_update(model)
  }

  start = () => {
    this.#on = true
    this.#animate()
  }

  pause = () => (this.#on = false)

  click = (e) => this.#field_view.click(e)

  //

  #recurse = () => requestAnimationFrame(() => this.#animate())

  #animate = () => {
    if (!this.#on) return

    this.#recurse()
    this.#update()
  }

  #update = () => {
    const model = this.#get_model()
    this.#field_view.update(model)
    this.#info_view.update(model)
    this.#end_to_game(model) && this.pause()
  }

  #end_to_game = (model) => {
    return [live_config.statuses.loose, live_config.statuses.won].includes(
      model.status
    )
  }
}
