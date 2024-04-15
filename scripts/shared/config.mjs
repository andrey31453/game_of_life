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
    on: 'Жизнь',
    won: 'ПОБЕДА!',
    loose: 'ПОРАЖЕНИЕ! ',
  },

  sizes: {
    live: 40,
  },
}

export const vars = {
  // colors

  color: {
    primary: '--color--primary',
    secondary: '--color--secondary',
  },

  font_color: {
    primary: '--font-color--primary',
    secondary: '--font-color--secondary',
  },

  background_color: {
    primary: '--background-color--primary',
    secondary: '--background-color--secondary',
    contrast: '--background-color--contrast',
  },

  // icons

  icon: {
    live: {
      size: '--icon--live--size',
      wrapper_width: '--icon-size--live--wrapper_width',
      wrapper_proportion: '--icon-size--live--wrapper_proportion',
      inner_proportion: '--icon--live--inner_proportion',
      empty_type: '--icon--live--empty_type',
    },

    theme_size: '--icon--theme_size',
  },

  // form

  form: {
    border_width: '--form--border_width',
  },

  // distances

  gap: {
    s: '--gap--s',
    d: '--gap--d',
    l: '--gap--l',
    xl: '--gap--xl',
  },

  // font params

  font_size: {
    s: '--font-size--s',
    d: '--font-size--d',
    l: '--font-size--l',
    xl: '--font-size--xl',
  },

  line_height: {
    s: '--line-height--s',
    d: '--line-height--d',
    l: '--line-height--l',
    xl: '--line-height--xl',
  },

  font_weight: {
    s: '--font-weight--s',
    d: '--font-weight--d',
    l: '--font-weight--l',
    xl: '--font-weight--xl',
  },
}
