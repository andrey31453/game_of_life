import { Canvas } from '../bunddler.mjs'

export class Life_View {
  #canvas
  #config
  #get_model
  #on = false

  constructor(node, get_model, config) {
    this.#canvas = new Canvas(node)
    this.#get_model = get_model
    this.#config = config

    this.#update()
  }

  #recurse = () => requestAnimationFrame(() => this.#animate())

  #animate = () => {
    if (!this.#on) return

    this.#recurse()
    this.#update()
  }

  #update = () => {
    const model = this.#get_model()
    console.log('model: ', model)
  }

  // public

  update = () => this.#update()

  start = () => {
    this.#on = true
    this.#animate()
  }

  pause = () => (this.#on = false)
}
