import { Hash, Live_Map, Lives_From_Map } from '../bunddler.mjs'

export class Life_Model {
  #on = false
  #lives = 'not live'
  #status

  constructor({ x, y, time, lives }) {
    this.#lives = lives
    this.time = time
    this.x = x
    this.y = y

    this.#init()
  }

  // public

  start = () => {
    this.#on = true
    this.#lives = 'live'
    this.#recurse()
  }

  pause = () => (this.#on = false)

  clear = () => (this.hash = new Hash().value)

  // gets

  get state() {
    return {
      status: this.#status,
      value: this.#lives,
    }
  }

  get #coords_config() {
    return {
      x_max: this.x,
      y_max: this.y,
    }
  }

  get #is_won() {
    return new Set(this.history).size !== this.history.length
  }

  get #is_loose() {
    return !this.#lives.length
  }

  // private

  #init = () => {
    this.history = []
    this.#update_history()
  }

  #recurse = () => setTimeout(this.#generation, this.time)

  #generation = () => {
    if (!this.#on) return

    this.#recurse()
    this.#update()
  }

  #update = () => {
    this.#update_lives()
    this.#update_history()
    this.#check_to_end_game()
  }

  #update_lives = () => {
    this.#lives = new Lives_From_Map(
      this.#lives,
      new Live_Map(this.#lives, this.#coords_config).value
    ).value
  }

  #update_history = () => {
    this.history.push(new Hash(this.#lives).value)
  }

  #check_to_end_game = () => {
    if (this.#is_loose) return this.#loose()
    if (this.#is_won) return this.#won()
  }

  #won = () => {
    this.#status = 'won'
    this.pause()
  }

  #loose = () => {
    this.#status = 'loose'
    this.pause()
  }
}
