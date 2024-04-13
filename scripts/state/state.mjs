import { Singleton, Lives } from '../bunddler.mjs'

export const State = new Singleton(
  class {
    config = {
      x: 30,
      y: 30,
      time: 300,
      // lives: new Lives([
      //   '1:0',
      //   '1:1',
      //   '1:2',
      //   '1:3',
      //   '2:0',
      //   '2:1',
      //   '2:2',
      //   '3:0',
      //   '3:1',
      //   '3:2',
      // ]).value,
      // lives: new Lives(['1:0', '2:1', '3:0']).value,
      lives: new Lives(['1:1', '2:1', '3:1']).value,
    }

    vars = null
  }
)
