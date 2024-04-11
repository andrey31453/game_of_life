export const Target_Iterator = function (target, _default) {
	return class {
		constructor(key) {
			this.value = target[key] || _default
		}
	}
}

export const Singleton = function (_class) {
	let instance
	return function (...args) {
		return instance || (instance = new _class(...args))
	}
}

export const Canvas = new Singleton(
	class {
		#node
		#ctx
		#config

		constructor(node, cb, config) {
			this.#node = node
			this.#ctx = this.#node.getContext('2D')
			this.#config = config

			this.#recurse(cb)
		}

		#recurse = (cb) => requestAnimationFrame(() => this.#animate(cb))

		#animate = (cb) => {
			this.#recurse(cb)
			const state = cb()
			console.log('state: ', state)
		}
	}
)
