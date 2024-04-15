import {
  Hash,
  Live_Map,
  Lives_From_Map,
  live_config,
  Lives,
  iterate,
} from '../bunddler.mjs'

export class Live_Model {
  #on = false
  #get_config
  #state = {}

  constructor(get_config) {
    this.#get_config = get_config

    this.#update_config()
    this.#init()
  }

  //
  //
  //

  // TODO add new game method
  // TODO add update live state method

  start = () => {
    this.#init()
    this.#on = true
    this.#recurse()
  }

  pause = () => (this.#on = false)

  clear = () => {
    this.#state.lives = new Lives().value
    this.#init()
  }

  live_toggle = (live) => {
    const lives_set = new Set(this.#state.lives)
    lives_set.has(live) ? lives_set.delete(live) : lives_set.add(live)
    this.#state.lives = new Lives([...lives_set]).value
    this.#actuality_history()
  }

  // TODO remove magic  `${x}:${y}`
  // TODO rewrite
  random = () =>
    (this.#state.lives = new Lives(
      iterate(this.#state.size.x, (x) =>
        iterate(this.#state.size.y, (y) =>
          Math.random() < 0.01 * this.#state.live_chance ? `${x}:${y}` : false
        )
      )
        .flat()
        .filter(Boolean)
    ).value)

  //
  //
  //

  get state() {
    return { ...this.#state }
  }

  #update_config = () => {
    const { x, y, time, lives, live_chance } = this.#get_config()

    this.#state.lives = lives
    this.#state.live_chance = live_chance
    this.#state.time = time
    this.#state.size = { x, y }
  }

  // TODO add full correctly method to calc duration
  get #duration() {
    return (this.#state.history.length - 1) * this.#state.time
  }

  get #coords_config() {
    return {
      x_max: this.#state.size.x,
      y_max: this.#state.size.y,
    }
  }

  get #is_won() {
    return new Set(this.#state.history).size !== this.#state.history.length
  }

  get #is_loose() {
    return !this.#state.lives.length
  }

  //
  //
  //

  #init = () => {
    this.#state.status = live_config.statuses.on
    this.#state.history = []
    this.#update_history()
  }

  #recurse = () => setTimeout(this.#generation, this.#state.time)

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
    this.#state.lives = new Lives_From_Map(
      this.#state.lives,
      new Live_Map(this.#state.lives, this.#coords_config).value
    ).value
  }

  #update_history = () => {
    this.#state.history.push(this.#update_hash())
  }

  #actuality_history = () => {
    this.#state.history.pop(0, -1)
    this.#update_history()
  }

  #update_hash = () => (this.#state.hash = new Hash(this.#state.lives).value)

  #check_to_end_game = () => {
    if (this.#is_loose) return this.#loose()
    if (this.#is_won) return this.#won()
  }

  #won = () => {
    this.#state.status = live_config.statuses.won
    this.pause()
  }

  #loose = () => {
    this.#state.status = live_config.statuses.loose
    this.pause()
  }
}
