import { Canvas } from '../bunddler.mjs'

export class Life_View {
  #canvas
  #config
  #cb
  #on = false

  constructor(node, cb, config) {
    this.#canvas = new Canvas(node)
    this.#cb = cb
    this.#config = config

    this.#recurse()
  }

  #recurse = () => requestAnimationFrame(() => this.#animate())

  #animate = () => {
    if (!this.#on) return

    this.#recurse()
    this.update()
  }

  init = () => {}
  update = () => {
    const model = this.#cb()
    console.log('model: ', model)
  }

  start = () => {
    this.#on = true
    this.#recurse()
  }
  pause = () => (this.#on = false)
  stop = () => (this.#on = false)
}
