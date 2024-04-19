import { Canvas_Elem, vars, decimal, Fields, round } from '../bunddler.mjs'

const live_canvas_elem = ([x, y], config) =>
  new Canvas_Elem('circle', {
    style: {
      radius:
        0.5 *
        config[vars.icon.live.inner_proportion] *
        decimal(config[vars.icon.live.size]),
      color: config[vars.color.primary],
    },
    position: [(+x + 0.5) / config.x, (+y + 0.5) / config.y],
  }).value

const empty_canvas_elem = ([x, y], config) =>
  new Canvas_Elem(config[vars.icon.live.empty_type], {
    style: {
      radius:
        0.5 *
        config[vars.icon.live.wrapper_proportion] *
        decimal(config[vars.icon.live.size]),
      color: config[vars.color.secondary],
      width: decimal(config[vars.icon.live.wrapper_width]),
    },
    position: [(+x + 0.5) / config.x, (+y + 0.5) / config.y],
  }).value

export class Fields_Canvas_Data {
  constructor(lives, visible_size, config) {
    this.value = [
      ...this.#emptyes(visible_size, config),
      ...this.#lives(lives, visible_size, config),
    ]
  }

  #emptyes = (visible_size, config) =>
    new Fields(visible_size, (x, y) => {
      return empty_canvas_elem([x, y], config)
    }).value

  #lives = (lives, visible_size, config) =>
    new Fields(visible_size, (x, y) => {
      if (this.#is_not_live(lives, [x, y])) return

      return live_canvas_elem([x, y], config)
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

export class Visible_Size {
  #offset = 5

  constructor([x1, y1, x2, y2], size) {
    this.value = [
      Math.max(round(x1 * size.x - this.#offset), 0),
      Math.max(round(y1 * size.y - this.#offset), 0),
      Math.min(round(x2 * size.x + this.#offset), size.x),
      Math.min(round(y2 * size.y + this.#offset), size.y),
    ]
  }
}

export class Visible_Lives {
  constructor(lives, [x1, y1, x2, y2]) {
    this.value = lives.filter((live) => {
      const [x, y] = live.split(':')

      return +x >= x1 && +x <= x2 && +y >= y1 && +y <= y2
    })
  }
}
