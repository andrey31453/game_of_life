import { Handler, Life_Controller } from '../bunddler.mjs'

export const Field_Handler = new Handler((v, e) => {
  const life_controller = new Life_Controller()
  if (life_controller.not_valid_key(v)) return
  life_controller[v]({ x: e.offsetX, y: e.offsetY })
}).value
