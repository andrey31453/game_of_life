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
  rules: {
    live: {
      min_neigbours: 2,
      max_neigbours: 3,
    },

    empty: {
      min_neigbours: 3,
      max_neigbours: 3,
    },
  },

  statuses: {
    on: 'live',
    won: 'Stable live. WON!',
    loose: 'All dead. LOOSE! ',
  },
}

export const vars = {
  /* colors */

  color_primary: '--color--primary',
  color_secondary: '--color--secondary',

  font_color_primary: '--font-color--primary',
  font_color_secondary: '--font-color--secondary',

  background_color_primary: '--background-color--primary',
  background_color_secondary: '--background-color--secondary',

  /* distances */

  gap_s: '--gap--s',
  gap_d: '--gap--d',
  gap_l: '--gap--l',
  gap_xl: '--gap--xl',

  /* font params */

  font_size_s: '--font-size--s',
  font_size_d: '--font-size--d',
  font_size_l: '--font-size--l',
  font_size_xl: '--font-size--xl',

  line_height_s: '--line-height--s',
  line_height_d: '--line-height--d',
  line_height_l: '--line-height--l',
  line_height_xl: '--line-height--xl',

  font_weight_s: '--font-weight--s',
  font_weight_d: '--font-weight--d',
  font_weight_l: '--font-weight--l',
  font_weight_xl: '--font-weight--xl',
}
