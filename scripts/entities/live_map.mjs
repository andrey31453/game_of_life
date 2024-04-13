import { live_delimiter, Init_live_Map, live_config } from '../bunddler.mjs'

class Coord {
  constructor(coord, max) {
    if (coord >= max) return (this.value = 0)
    if (coord < 0) return (this.value = max - 1)

    this.value = coord
  }
}

class Live_From_Coords {
  constructor({ x, y, x_max, y_max }) {
    this.value =
      new Coord(x, x_max).value + live_delimiter + new Coord(y, y_max).value
  }
}

class Neigbour_Config {
  constructor(live, { x_max, y_max }) {
    const [x, y] = live.split(live_delimiter)
    this.value = { x, y, x_max, y_max }
  }
}

class Neigbours {
  constructor(live, maxes) {
    const config = new Neigbour_Config(live, maxes).value
    this.value = [
      // line
      new Live_From_Coords({
        ...config,
        x: +config.x + 1,
      }).value,
      new Live_From_Coords({
        ...config,
        x: +config.x - 1,
      }).value,
      new Live_From_Coords({
        ...config,
        y: +config.y + 1,
      }).value,
      new Live_From_Coords({
        ...config,
        y: +config.y - 1,
      }).value,

      // diagonal
      new Live_From_Coords({
        ...config,
        x: +config.x + 1,
        y: +config.y + 1,
      }).value,
      new Live_From_Coords({
        ...config,
        x: +config.x - 1,
        y: +config.y - 1,
      }).value,
      new Live_From_Coords({
        ...config,
        x: +config.x + 1,
        y: +config.y - 1,
      }).value,
      new Live_From_Coords({
        ...config,
        x: +config.x - 1,
        y: +config.y + 1,
      }).value,
    ]
  }
}

export class Live_Map {
  #maxes
  constructor(lives, maxes) {
    this.#maxes = maxes
    this.value = lives.reduce(this.#add_live_fields, new Init_live_Map().value)
  }

  #add_live_fields = (live_map, live) => {
    const neigbours = new Neigbours(live, this.#maxes).value
    neigbours.forEach((neigbour) => this.#add_live_field(live_map, neigbour))
    return live_map
  }

  #add_live_field = (live_map, neigbour) => {
    const current_value = live_map.get(neigbour)
    const new_value = current_value ? current_value + 1 : 1
    live_map.set(neigbour, new_value)
  }
}

class Is_Live {
  constructor(neigbours, config) {
    if (neigbours > config.max_neigbours) return (this.value = false)
    if (neigbours < config.min_neigbours) return (this.value = false)
    this.value = true
  }
}

class Live_Config {
  constructor(lives, live) {
    this.value = lives.includes(live) ? live_config.live : live_config.empty
  }
}

export class Lives_From_Map {
  constructor(lives, live_map = new Init_live_Map().value) {
    this.value = []

    live_map.forEach(
      (neigbours, live) =>
        new Is_Live(neigbours, new Live_Config(lives, live).value).value &&
        this.value.push(live)
    )
  }
}
