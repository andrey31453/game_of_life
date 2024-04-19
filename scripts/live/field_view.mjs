import {
  Canvas,
  vars,
  decimal,
  Fields_Canvas_Data,
  Update_Lives_Canvas_Data,
  Scroll_Data,
  Visible_Size,
} from '../bunddler.mjs'

export class Live_Field_View {
  #node
  #scroll_data
  #canvas
  #model = {}
  #config
  #get_config

  constructor(node, container_node, get_config) {
    this.#node = node
    this.#scroll_data = new Scroll_Data(node, container_node)
    this.#get_config = get_config
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
    this.#update_fields()
  }

  // TODO remove magic ${}:${}
  click = ({ x, y }) => `${this.#field_coord(x)}:${this.#field_coord(y)}`

  get visible_proportions() {
    return this.#scroll_data.visible_proportions
  }

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
      new Fields_Canvas_Data(
        this.#model.lives,
        new Visible_Size(
          this.#scroll_data.visible_proportions,
          this.#model.size
        ).value,
        this.#config
      ).value
    )
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

  #update_fields = (hard = true) => {
    if (!this.#model.lives) return

    hard ? this.#hard_update_fields() : this.#soft_update_fields()
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
