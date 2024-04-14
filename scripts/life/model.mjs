import {
  Hash,
  Live_Map,
  Lives_From_Map,
  live_config,
  Lives,
} from '../bunddler.mjs'

export class Life_Model {
  #on = false
  #status = live_config.statuses.on
  #lives
  #hash
  #history
  #time
  #size

  constructor({ x, y, time, lives }) {
    this.#lives = lives
    this.#time = time
    this.#size = { x, y }

    this.#init()
  }

  //
  //
  //

  // TODO add new game method
  // TODO add update live state method

  start = () => {
    this.#on = true
    this.#recurse()
  }

  pause = () => (this.#on = false)

  clear = () => (this.#lives = new Lives().value)

  //
  //
  //

  get state() {
    return {
      status: this.#status,

      lives: this.#lives,
      lives: this.#size,

      history: this.#history,

      duration: this.#duration,
      hash: this.#hash,
    }
  }

  // TODO add full correctly method to calc duration
  get #duration() {
    return (this.#history.length - 1) * this.#time
  }

  get #coords_config() {
    return {
      x_max: this.#size.x,
      y_max: this.#size.y,
    }
  }

  get #is_won() {
    return new Set(this.#history).size !== this.#history.length
  }

  get #is_loose() {
    return !this.#lives.length
  }

  //
  //
  //

  #init = () => {
    this.#history = []
    this.#update_history()
  }

  #recurse = () => setTimeout(this.#generation, this.#time)

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
    this.#history.push((this.#hash = new Hash(this.#lives).value))
  }

  #check_to_end_game = () => {
    if (this.#is_loose) return this.#loose()
    if (this.#is_won) return this.#won()
  }

  #won = () => {
    this.#status = live_config.statuses.won
    this.pause()
  }

  #loose = () => {
    this.#status = live_config.statuses.loose
    this.pause()
  }
}
