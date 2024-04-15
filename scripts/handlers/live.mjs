import { Handler, Live_Controller } from '../bunddler.mjs'

export const Live_Handler = new Handler((v, e) => {
  const live_controller = new Live_Controller()

  if (live_controller.not_valid_key(v)) return
  live_controller[v]()
}, 'update').value
