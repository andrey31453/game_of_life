import {
  Node_By_Attribute,
  Singleton,
  Live_Model,
  Live_View,
  State,
} from '../bunddler.mjs'

export const Live_Controller = new Singleton(
  class {
    #view
    #model

    constructor() {
      this.#model = new Live_Model(() => new State().config)
      this.#view = new Live_View(
        new Node_By_Attribute('game-field').value,
        new Node_By_Attribute('game-info').value,
        this.#update,
        () => ({
          ...new State().vars,
          ...new State().config,
        })
      )
    }

    #update = () => this.#model.state

    // public

    click = (e) => {
      this.#model.live_toggle(this.#view.click(e))
      this.#view.update()
    }

    start = () => {
      this.#model.start()
      this.#view.start()
    }

    pause = () => {
      this.#model.pause()
      this.#view.pause()
    }

    clear = () => {
      this.#model.clear()
      this.#view.update()
    }

    update = () => {
      console.log('update: ')
      this.#model.update_config()
      this.#view.update_config()
    }

    random = () => {
      this.#model.random()
      this.#view.update()
    }

    not_valid_key = (key) =>
      !['start', 'pause', 'clear', 'click', 'update', 'random'].includes(key)
  }
)
