import { live_config, Live_Info_View, Live_Field_View } from '../bunddler.mjs'

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
    const model = this.#get_model(this.#field_view.visible_proportions)
    this.#info_view.hard_update(model)
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
    const model = this.#get_model(this.#field_view.visible_proportions)
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
