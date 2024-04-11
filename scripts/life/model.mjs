export class Life_Model {
  constructor() {
    this.#init()
  }

  #init = () => {
    this.value = Math.random()
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
