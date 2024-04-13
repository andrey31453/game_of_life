export class Init_lives {
  constructor() {
    this.value = []
  }
}

export class Init_live_Map {
  constructor() {
    this.value = new Map()
  }
}

export const live_config = {
  live: {
    min_neigbours: 2,
    max_neigbours: 3,
  },

  empty: {
    min_neigbours: 3,
    max_neigbours: 3,
  },
}

// TODO add live status config
