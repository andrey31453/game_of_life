import { Singleton } from '../bunddler.mjs'

export const State = new Singleton(
	class {
		test = 0

		config = {
			x: 20,
			y: 20,
			time: 400,
		}

		constructor() {}
	}
)
