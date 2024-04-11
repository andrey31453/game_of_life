import { Node_By_Attribute, Singleton, Canvas } from '../bunddler.mjs'

export const Life_Controller = new Singleton(
	class {
		#view
		#model

		constructor() {
			this.#view = new Canvas(
				new Node_By_Attribute('field').value,
				this.#update
			)
			this.#model = new Life_Model()
			this.#init()
		}

		#init = () => {}
		#update = () => this.#model.state

		start = () => this.#model.start()
		pause = () => this.#model.pause()
		stop = () => this.#model.stop()

		not_valid_key = (key) => !['start', 'pause', 'stop'].includes(key)
	}
)
