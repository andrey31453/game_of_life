import { Init_lives } from '../bunddler.mjs'

const hash_delimiter = '|'

class Sort_Lives {
  constructor(lives) {
    this.value = lives.sort()
  }
}

export class Hash {
  constructor(lives = []) {
    this.value = new Sort_Lives(lives).value.join(hash_delimiter)
  }
}
