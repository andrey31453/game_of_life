import { Singleton, Lives } from '../bunddler.mjs'

export const State = new Singleton(
  class {
    config = {
      // TODO change value in state from input
      x: 21,
      y: 21,
      time: 200,
      live_chance: 20,
      lives: new Lives([
        // C
        '1:8',
        '2:8',
        '3:8',
        '1:9',
        '1:10',
        '1:11',
        '1:12',
        '2:12',
        '3:12',

        // Т
        '5:8',
        '6:8',
        '7:8',
        '6:9',
        '6:10',
        '6:11',
        '6:12',

        // A
        '10:8',
        '9:9',
        '11:9',
        '9:10',
        '10:10',
        '11:10',
        '9:11',
        '11:11',
        '9:12',
        '11:12',

        // Р
        '13:8',
        '14:8',
        '13:9',
        '15:9',
        '13:10',
        '14:10',
        '13:11',
        '13:12',

        // T
        '17:8',
        '18:8',
        '19:8',
        '18:9',
        '18:10',
        '18:11',
        '18:12',
      ]).value,
    }

    vars = null
  }
)
