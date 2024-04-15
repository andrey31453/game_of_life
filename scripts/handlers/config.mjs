import { State, Handler, Live_Controller } from '../bunddler.mjs'

export const Config_Handler = new Handler((v, e) => {
  new State().config[v] = e?.target.value
  new Live_Controller().update()
}).value
