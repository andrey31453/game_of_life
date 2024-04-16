import {
  Hash,
  Live_Map,
  Lives_From_Map,
  live_config,
  Lives,
  Fields,
  compare_arrays,
} from '../bunddler.mjs'

export class Live_Model {
  #on = false
  #get_config
  #state = {}

  constructor(get_config) {
    this.#get_config = get_config

    this.#update_config()
    this.#state.new_lives = this.#get_config().lives
    this.#setup()
  }

  //
  //
  //

  // TODO add new game method
  // TODO add update live state method

  start = () => {
    this.#setup()
    this.#on = true
    this.#recurse()
  }

  pause = () => (this.#on = false)

  clear = () => {
    this.#state.new_lives = new Lives().value
    this.#setup()
  }

  update_config = () => {
    this.#update_config()
    this.#filter_lives()
    this.#setup()
  }

  // TODO rewrite when lives rewrite to set
  live_toggle = (live) => {
    const lives_set = new Set(this.#state.lives)
    lives_set.has(live) ? lives_set.delete(live) : lives_set.add(live)
    this.#state.lives = new Lives([...lives_set]).value
    this.#actuality_history()
  }

  // TODO remove magic `${x}:${y}`
  // TODO rewrite
  random = () => {
    this.#create_random_lives()
    this.#setup()
  }

  //
  //
  //

  get state() {
    return {
      ...this.#state,
      duration: this.#duration,
    }
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

  #filter_lives = () =>
    (this.#state.lives = this.#state.lives.filter(this.#valid_live))

  // TODO remove magik :
  #valid_live = (live) => {
    const [x, y] = live.split(':')
    return +x < this.#state.size.x && +y < this.#state.size.y
  }

  #update_config = () => {
    const { x, y, time, live_chance } = this.#get_config()

    this.#state.live_chance = +live_chance
    this.#state.time = +time
    this.#state.size = { x: +x, y: +y }
  }

  #create_random_lives = () => {
    this.#state.new_lives = new Lives(
      new Fields(this.#state.size, (x, y) =>
        Math.random() < 0.01 * this.#state.live_chance ? `${x}:${y}` : false
      ).value
    ).value
    this.#state.lives = []
  }

  #setup = () => {
    this.#state.status = live_config.statuses.on

    this.#state.history = []
    this.#update_history()

    this.#state.lives = []
    this.#update_lives()
  }

  #recurse = () => setTimeout(this.#generation, this.#state.time)

  #generation = () => {
    if (!this.#on) return

    this.#recurse()
    this.#update()
  }

  #update = () => {
    this.#update_new_lives()
    this.#update_lives()
    this.#update_history()
    this.#check_to_end_game()
  }

  #update_new_lives = () => {
    this.#state.new_lives = new Lives_From_Map(
      this.#state.lives,
      new Live_Map(this.#state.lives, this.#coords_config).value
    ).value
  }

  #update_lives = () => {
    ;[this.#state.deads, this.#state.borns] = compare_arrays(
      this.#state.lives,
      this.#state.new_lives
    )
    this.#state.lives = this.#state.new_lives
  }

  #update_history = () => {
    this.#state.history.push(this.#update_hash())
  }

  #actuality_history = () => {
    this.#state.history.pop()
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
