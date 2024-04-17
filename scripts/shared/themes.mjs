import { Target_Iterator, vars } from '../bunddler.mjs'

const default_vars = {
  // distances

  [vars.gap.s]: '8px',
  [vars.gap.d]: '12px',
  [vars.gap.l]: '16px',
  [vars.gap.xl]: '20px',

  // icons

  [vars.icon.live.size]: '40px',
  [vars.icon.live.wrapper_width]: '1px',
  [vars.icon.live.wrapper_proportion]: 0.9,
  [vars.icon.live.inner_proportion]: 0.6,
  [vars.icon.live.empty_type]: 'round',

  [vars.icon.theme_size]: '40px',

  // form

  [vars.form.border_width]: '0',

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
    atom: {
      ...default_vars,
      [vars.color.primary]: '#ed3cca',
      [vars.color.secondary]: '#7c1af860',

      [vars.font_color.primary]: '#fafffa',
      [vars.font_color.secondary]: '#cccccc',

      [vars.background_color.primary]: '#202026',
      [vars.background_color.secondary]: '#181820',
      [vars.background_color.contrast]: '#cccccc',
    },

    alien: {
      ...default_vars,
      [vars.color.primary]: '#63B473',
      [vars.color.secondary]: '#c6dfed20',

      [vars.font_color.primary]: '#d0edc6',
      [vars.font_color.secondary]: '#cccccc',

      [vars.background_color.primary]: '#111411',
      [vars.background_color.secondary]: '#222622',

      [vars.background_color.contrast]: '#cccccc',

      [vars.icon.live.inner_proportion]: 0.8,
      [vars.icon.live.wrapper_width]: '3px',
    },

    // astronaut: {
    //   ...default_vars,
    // },

    chemical: {
      ...default_vars,
      [vars.color.primary]: '#746DE0',
      [vars.color.secondary]: '#A8A9BA10',

      [vars.font_color.primary]: '#fafffa',
      [vars.font_color.secondary]: '#cccccc',

      [vars.background_color.primary]: '#111411',
      [vars.background_color.secondary]: '#222622',
      [vars.background_color.contrast]: '#A8A9BA',

      [vars.icon.live.inner_proportion]: 0.7,
    },

    // jupiter: {
    //   ...default_vars,
    // },

    meteorite: {
      ...default_vars,
      [vars.color.primary]: '#9EDEFC',
      [vars.color.secondary]: '#333F50',

      [vars.font_color.primary]: '#111411',
      [vars.font_color.secondary]: '#fafffa',

      [vars.background_color.primary]: '#fafffa',
      [vars.background_color.secondary]: '#111411',
      [vars.background_color.contrast]: '#fafffa',

      [vars.form.border_width]: '1px',

      [vars.icon.live.wrapper_proportion]: 0.9,
      [vars.icon.live.inner_proportion]: 0.9,
      [vars.icon.live.empty_type]: 'circle',
    },

    star: {
      ...default_vars,
      [vars.color.primary]: '#ff0101',
      [vars.color.secondary]: '#cccccc24',

      [vars.font_color.primary]: '#fafffa80',
      [vars.font_color.secondary]: '#cccccc',

      [vars.background_color.primary]: '#202020',
      [vars.background_color.secondary]: '#101010',
      [vars.background_color.contrast]: '#cccccc',
    },

    stars: {
      ...default_vars,
      [vars.color.primary]: '#3BABB7',
      [vars.color.secondary]: '#cccccc40',

      [vars.font_color.primary]: '#fafffa80',
      [vars.font_color.secondary]: '#cccccc',

      [vars.background_color.primary]: '#202020',
      [vars.background_color.secondary]: '#101010',
      [vars.background_color.contrast]: '#cccccc',

      [vars.icon.live.wrapper_proportion]: 0.9,
      [vars.icon.live.inner_proportion]: 0.7,
      [vars.icon.live.empty_type]: 'circle',
    },
  },
  []
)
