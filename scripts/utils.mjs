export const delay = (ms = 50) =>
	new Promise((res) => {
		setTimeout(() => {
			return void res()
		}, ms)
	})

export const maps = (...props) => {
	const datas = props.slice(0, -1)
	const cb = props.at(-1)

	datas[0].forEach((_, i) => cb(...datas.map((data) => data[i])))
}

export const Target_Iterator = function (target, _default) {
	return class {
		constructor(key) {
			this.value = target[key] || _default
		}
	}
}

export const Singleton = function (_class) {
	let _instance_

	return class {
		instance

		constructor() {
			this.instance = _instance_ || (_instance_ = new _class())
		}
	}
}
