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
