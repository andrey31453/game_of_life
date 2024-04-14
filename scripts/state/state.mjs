import { Singleton, Lives } from '../bunddler.mjs'

export const State = new Singleton(
  class {
    config = {
      x: 20,
      y: 20,
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
