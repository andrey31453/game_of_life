import { Init_lives } from '../bunddler.mjs'

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
