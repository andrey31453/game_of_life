import {
  Hash,
  Live_Map,
  Lives_From_Map,
  live_config,
  Lives,
  Fields,
  Deads_And_Borns,
} from '../bunddler.mjs'

export class Live_Model {
  #on = false
  #get_config
  #state = {}

  constructor(get_config) {
    this.#get_config = get_config
    this.#state.lives = []

    this.#update_config()
    this.#reset(this.#get_config().lives)
  }

  // public

  get state() {
    return {
      ...this.#state,
      duration: this.#duration,
    }
  }

  start = () => {
    this.#on = true
    this.#reset()
    this.#loop()
  }

  pause = () => (this.#on = false)

  clear = () => {
    this.#reset(new Lives().value)
  }

  hard_update = () => {
    this.#update_config()
    this.#validate_lives()
    this.#reset(this.#state.lives)
  }

  // TODO rewrite when lives rewrite to set
  live_toggle = (live) => {
    const lives_set = new Set(this.#state.lives)
    lives_set.has(live) ? lives_set.delete(live) : lives_set.add(live)
    this.#reset(new Lives([...lives_set]).value)
  }

  random = () => {
    this.#reset(this.#random_lives())
  }

  // public utils

  get #duration() {
    return (this.#state.history.length - 1) * this.#state.time
  }

  #update_config = () => {
    const { x, y, time, live_chance } = this.#get_config()

    this.#state.live_chance = +live_chance
    this.#state.time = +time
    this.#state.size = { x: +x, y: +y }
  }

  #reset = (new_lives) => {
    this.#refresh()
    this.#next_generate(new_lives)
  }

  #refresh = () => {
    this.#state.status = live_config.statuses.on
    this.#state.history = []
  }

  #next_generate = (new_lives) => {
    this.#update_lives(new_lives)
    this.#update_hash()
    this.#update_history()
  }

  // loop

  #loop = () => setTimeout(this.#generation, this.#state.time)

  #generation = () => {
    if (!this.#on) return

    this.#loop()
    this.#next_generate()
    this.#check_to_end_game()
  }

  // lives

  get #coords_config() {
    return {
      x_max: this.#state.size.x,
      y_max: this.#state.size.y,
    }
  }

  #validate_lives = () =>
    (this.#state.lives = this.#state.lives.filter(this.#valid_live))

  // TODO remove magik :
  #valid_live = (live) => {
    const [x, y] = live.split(':')
    return +x < this.#state.size.x && +y < this.#state.size.y
  }

  #random_lives = () =>
    new Lives(
      new Fields(this.#state.size, (x, y) =>
        Math.random() < 0.01 * this.#state.live_chance ? `${x}:${y}` : false
      ).value
    ).value

  #update_lives = (
    new_lives = new Lives_From_Map(
      this.#state.lives,
      new Live_Map(this.#state.lives, this.#coords_config).value
    ).value
  ) =>
    ([this.#state.lives, this.#state.deads, this.#state.borns] =
      new Deads_And_Borns(this.#state.lives, new_lives).value)

  // history

  #update_history = () => {
    this.#state.history.push(new Hash(this.#state.lives).value)
  }

  // hash

  #update_hash = () => {}

  // end game

  get #is_won() {
    return new Set(this.#state.history).size !== this.#state.history.length
  }

  get #is_loose() {
    return !this.#state.lives.length
  }

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
