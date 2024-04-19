import { Init_lives, iterate, round } from '../bunddler.mjs'

export const live_delimiter = ':'

class Is_Valid_Live {
  #lives
  #live

  constructor(lives, live) {
    this.#lives = lives
    this.#live = live

    this.value = this.uniq_live && this.is_valid_format
  }

  get uniq_live() {
    return !this.#lives.includes(this.#live)
  }

  get is_valid_format() {
    return new RegExp(`^\\d+\\${live_delimiter}\\d+$`).test(this.#live)
  }
}

export class Lives {
  constructor(lives_array = []) {
    this.value = lives_array.reduce(
      (lives, live) =>
        new Is_Valid_Live(lives, live).value ? [...lives, live] : lives,
      new Init_lives().value
    )
  }
}

export class Fields {
  constructor([x1, y1, x2, y2], cb) {
    this.value = iterate(round(x2 - x1), (x) =>
      iterate(round(y2 - y1), (y) => cb(x + x1, y + y1))
    )
      .flat()
      .filter(Boolean)
  }
}
