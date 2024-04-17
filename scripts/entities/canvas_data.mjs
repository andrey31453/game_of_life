import { Canvas_Elem, vars, decimal, Fields } from '../bunddler.mjs'

const live_canvas_elem = ([x, y], size, config) =>
  new Canvas_Elem('circle', {
    style: {
      radius:
        0.5 *
        config[vars.icon.live.inner_proportion] *
        decimal(config[vars.icon.live.size]),
      color: config[vars.color.primary],
    },
    position: [(+x + 0.5) / size.x, (+y + 0.5) / size.y],
  }).value

const empty_canvas_elem = ([x, y], size, config) =>
  new Canvas_Elem(config[vars.icon.live.empty_type], {
    style: {
      radius:
        0.5 *
        config[vars.icon.live.wrapper_proportion] *
        decimal(config[vars.icon.live.size]),
      color: config[vars.color.secondary],
      width: decimal(config[vars.icon.live.wrapper_width]),
    },
    position: [(+x + 0.5) / size.x, (+y + 0.5) / size.y],
  }).value

export class Fields_Canvas_Data {
  constructor(lives, size, config) {
    this.value = [
      ...this.#emptyes(size, config),
      ...this.#lives(lives, size, config),
    ]
  }

  #emptyes = (size, config) =>
    new Fields(size, (x, y) => empty_canvas_elem([x, y], size, config)).value

  #lives = (lives, size, config) =>
    new Fields(size, (x, y) => {
      if (this.#is_not_live(lives, [x, y])) return

      return live_canvas_elem([x, y], size, config)
    }).value

  // TODO remove magic ${x}:${y}
  #is_not_live = (lives, [x, y]) => !lives.includes(`${x}:${y}`)
}

export class Update_Lives_Canvas_Data {
  #state

  constructor(state) {
    this.#state = state

    this.#set_clears()
    this.#set_lives()
    this.#set_emptyes()
  }

  #set_clears = () => {
    this.clears = [...this.#state.borns, ...this.#state.deads].reduce(
      this.#set_clear,
      []
    )
  }

  #set_clear = (clears, field) => {
    // TODO delete magik :
    const [x, y] = field.split(':')
    // TODO create function for this relation
    clears.push([
      +x / this.#state.size.x,
      +y / this.#state.size.y,
      (+x + 1) / this.#state.size.x,
      (+y + 1) / this.#state.size.y,
    ])
    return clears
  }

  #set_lives = () => {
    this.lives = this.#state.borns.reduce(this.#set_live, [])
  }

  #set_live = (lives, field) => {
    // TODO delete magik :
    const [x, y] = field.split(':')

    lives.push(empty_canvas_elem([x, y], this.#state.size, this.#state.config))
    lives.push(live_canvas_elem([x, y], this.#state.size, this.#state.config))
    return lives
  }

  #set_emptyes = () => {
    this.emptyes = this.#state.deads.reduce(this.#set_emptye, [])
  }

  #set_emptye = (emptyes, field) => {
    // TODO delete magik :
    const [x, y] = field.split(':')

    emptyes.push(
      empty_canvas_elem([x, y], this.#state.size, this.#state.config)
    )
    return emptyes
  }
}
