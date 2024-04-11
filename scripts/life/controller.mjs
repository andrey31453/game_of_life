import {
  Node_By_Attribute,
  Singleton,
  Life_Model,
  Life_View,
  State,
} from '../bunddler.mjs'

export const Life_Controller = new Singleton(
  class {
    #view
    #model
    #state = new State()

    constructor() {
      this.#model = new Life_Model(this.#state.config)
      this.#view = new Life_View(
        new Node_By_Attribute('field').value,
        this.#update,
        this.#state.vars
      )

      this.#view.init()
    }

    #update = () => this.#model.value
    start = () => {
      this.#model.start()
      this.#view.start()
    }
    pause = () => {
      this.#model.pause()
      this.#view.pause()
    }
    stop = () => {
      this.#model.stop()
      this.#view.stop()
    }

    not_valid_key = (key) => !['start', 'pause', 'stop'].includes(key)
  }
)
