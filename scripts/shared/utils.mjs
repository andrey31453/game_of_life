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

export class Scroll_Data {
  #node
  #container_node

  constructor(node, container_node) {
    this.#node = node
    this.#container_node = container_node
  }

  get visible_proportions() {
    return [this.#x1, this.#y1, this.#x2, this.#y2]
  }

  // proportions

  get #x1() {
    return (this.#scroll.x - this.#field.left) / this.#field.width
  }

  get #x2() {
    return (
      (this.#container.width + this.#scroll.x - this.#field.left) /
      this.#field.width
    )
  }

  get #y1() {
    return (this.#scroll.y - this.#field.top) / this.#field.height
  }

  get #y2() {
    return (
      (this.#container.height + this.#scroll.y - this.#field.top) /
      this.#field.height
    )
  }

  // config

  get #field() {
    return {
      left: this.#node.offsetLeft,
      top: this.#node.offsetTop,
      width: this.#node.offsetWidth,
      height: this.#node.offsetHeight,
    }
  }

  get #scroll() {
    return {
      x: this.#container_node.scrollLeft,
      y: this.#container_node.scrollTop,
    }
  }

  get #container() {
    return {
      width: this.#container_node.offsetWidth,
      height: this.#container_node.offsetHeight,
    }
  }
}
