import { Node_By_Attribute, Singleton, Canvas, State } from '../bunddler.mjs'

export const Life_Model = new Singleton(
	class {
		#canvas
		#state = new State()
		#default_config = {
			elems: [
				{
					type: 'border',
					size: this.#state.config.border_width,
				},
			],
		}

		constructor() {
			this.#canvas = new Canvas(
				new Node_By_Attribute('field').value,
				this.#update
			)

			this.#init()
		}

		#init = () => {}

		#update = () => {
			console.log('#update')
		}

		start = () => {
			console.log('start')
		}

		pause = () => {
			console.log('pause')
		}

		stop = () => {
			console.log('stop')
		}
	}
)
