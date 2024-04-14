import { Target_Iterator, vars } from '../bunddler.mjs'

const default_vars = {
  /* colors */

  [vars.color_primary]: 'red',
  [vars.color_secondary]: 'green',

  [vars.font_color_primary]: '#fafffa',
  [vars.font_color_secondary]: '#cccccc',

  [vars.background_color_primary]: '#111411',
  [vars.background_color_secondary]: '#222622',

  /* distances */

  [vars.gap_s]: '8px',
  [vars.gap_d]: '12px',
  [vars.gap_l]: '16px',
  [vars.gap_xl]: '20px',

  /* font params */

  [vars.font_size_s]: '14px',
  [vars.font_size_d]: '16px',
  [vars.font_size_l]: '20px',
  [vars.font_size_xl]: '24px',

  [vars.line_height_s]: '22px',
  [vars.line_height_d]: '26px',
  [vars.line_height_l]: '30px',
  [vars.line_height_xl]: '48px',

  [vars.font_weight_s]: '100',
  [vars.font_weight_d]: '300',
  [vars.font_weight_l]: '400',
  [vars.font_weight_xl]: '700',
}

export const Theme_Vars = new Target_Iterator(
  {
    alien: {
      ...default_vars,
    },

    astronaut: {
      ...default_vars,
    },

    atom: {
      ...default_vars,
    },

    chemical: {
      ...default_vars,
    },

    jupiter: {
      ...default_vars,
    },

    meteorite: {
      ...default_vars,
    },

    star: {
      ...default_vars,
    },

    stars: {
      ...default_vars,
    },
  },
  []
)
