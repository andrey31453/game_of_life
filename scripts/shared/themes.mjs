import { Target_Iterator, vars } from '../bunddler.mjs'

const default_vars = {
  // colors

  [vars.color.primary]: 'red',
  [vars.color.secondary]: 'green',

  [vars.font_color.primary]: '#fafffa',
  [vars.font_color.secondary]: '#cccccc',

  [vars.background_color.primary]: '#111411',
  [vars.background_color.secondary]: '#222622',

  // distances

  [vars.gap.s]: '8px',
  [vars.gap.d]: '12px',
  [vars.gap.l]: '16px',
  [vars.gap.xl]: '20px',

  // icons

  [vars.icon.live.size]: '40px',
  [vars.icon.live.wrapper_width]: '2px',
  [vars.icon.live.wrapper_proportion]: 0.9,
  [vars.icon.live.inner_proportion]: 0.6,

  [vars.icon.theme_size]: '40px',

  // font params

  [vars.font_size.s]: '14px',
  [vars.font_size.d]: '16px',
  [vars.font_size.l]: '20px',
  [vars.font_size.xl]: '24px',

  [vars.line_height.s]: '22px',
  [vars.line_height.d]: '26px',
  [vars.line_height.l]: '30px',
  [vars.line_height.xl]: '48px',

  [vars.font_weight.s]: 100,
  [vars.font_weight.d]: 300,
  [vars.font_weight.l]: 400,
  [vars.font_weight.xl]: 700,
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
