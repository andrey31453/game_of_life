import { State, Handler } from '../bunddler.mjs'

export const Config_Handler = new Handler((v, e) => {
	new State().config[v] = e?.target.value
}).value
