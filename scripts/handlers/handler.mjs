import { Singleton } from '../bunddler.mjs'

export class Handler {
	constructor(_handler, _default) {
		this.value = new Singleton(
			class {
				constructor() {
					_default && _handler(_default)
				}

				handler = (v, event) => _handler(v, event)
			}
		)
	}
}
