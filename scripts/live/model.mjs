import {
  Hash,
  Live_Map,
  Lives_From_Map,
  live_config,
  Lives,
  Fields,
  Deads_And_Borns,
  debounce,
} from '../bunddler.mjs'

export class Live_Model {
  #on = false
  #get_config
  #state = {}

  constructor(get_config) {
    this.#get_config = get_config
    this.#state.lives = []

    this.#update_config()
    this.#setup(this.#get_config().lives)
  }

  // public

  get state() {
    return {
      ...this.#state,
      duration: this.#duration,
    }
  }

  // TODO add new game method
  // TODO add update live state method

  start = () => {
    this.#on = true
    this.#setup()
    this.#loop()
  }

  pause = () => (this.#on = false)

  clear = () => {
    this.#setup(new Lives().value)
  }

  update_config = debounce(() => {
    this.#update_config()
    this.#filter_lives()
    this.#setup(this.#state.lives)
  })

  // TODO rewrite when lives rewrite to set
  live_toggle = (live) => {
    const lives_set = new Set(this.#state.lives)
    lives_set.has(live) ? lives_set.delete(live) : lives_set.add(live)
    this.#setup(new Lives([...lives_set]).value)
  }

  random = () => {
    this.#setup(this.#random_lives())
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

  #setup = (new_lives) => {
    this.#refresh()
    this.#next_generate(new_lives)
  }

  #update = () => {
    this.#next_generate()
    this.#check_to_end_game()
  }

  #refresh = () => {
    this.#state.status = live_config.statuses.on
    this.#state.history = []
  }

  #next_generate = (new_lives) => {
    this.#update_lives(new_lives)
    this.#update_history()
  }

  // loop

  #loop = () => setTimeout(this.#generation, this.#state.time)

  #generation = () => {
    if (!this.#on) return

    this.#loop()
    this.#update()
  }

  // lives

  get #coords_config() {
    return {
      x_max: this.#state.size.x,
      y_max: this.#state.size.y,
    }
  }

  #filter_lives = () =>
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
  ) => {
    // console.log('this.#state.lives: ', this.#state.lives)
    ;[this.#state.lives, this.#state.deads, this.#state.borns] =
      new Deads_And_Borns(this.#state.lives, new_lives).value

    // console.log('this.#state.lives: ', this.#state.lives)
  }

  // history

  #update_history = () => {
    this.#state.history.push(this.#update_hash())
  }

  // hash

  #update_hash = () => (this.#state.hash = new Hash(this.#state.lives).value)

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
