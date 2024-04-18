import { Handler, Live_Controller } from '../bunddler.mjs'

export const Field_Scroll_Handler = new Handler((v, e) => {
  const field = e.target.children[0]
  const container = e.target

  const live_controller = new Live_Controller()
  if (live_controller.not_valid_key(v)) return
  live_controller[v]({
    field: {
      left: field.offsetLeft,
      top: field.offsetTop,
      width: field.offsetWidth,
      height: field.offsetHeight,
    },
    scroll: {
      x: container.scrollLeft,
      y: container.scrollTop,
    },
    container: {
      width: container.offsetWidth,
      height: container.offsetHeight,
    },
  })

  new Live_Controller().update()
}).value
