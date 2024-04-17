export const delay = (ms = 50) => new Promise((res) => setTimeout(res, ms))

export const wait_condition = async (condition, ms) => {
  if (condition()) return void 0

  await delay(ms)
  return wait_condition(condition)
}

export const maps = (...props) => {
  const datas = props.slice(0, -1)
  const cb = props.at(-1)

  datas[0].forEach((_, i) => cb(...datas.map((data) => data[i])))
}

export const decimal = (v) => `${v}`.replace(/\D/gi, '')

export const iterate = (num, cb) => [...Array(num).keys()].map((i) => cb(i))

// TODO rewrite to any quantity arrays
export const uniques = (array_1, array_2) => {
  let unique_items_1 = []
  let unique_items_2 = []
  const set_1 = new Set(array_1)
  const set_2 = new Set(array_2)

  set_1.forEach((item_1) =>
    set_2.has(item_1) ? set_2.delete(item_1) : unique_items_1.push(item_1)
  )

  set_2.forEach((item_1) => {
    unique_items_2.push(item_1)
  })

  return [unique_items_1, unique_items_2]
}

export const type_of = (target) =>
  Object.prototype.toString
    .call(target)
    .split(' ')[1]
    .toLowerCase()
    .slice(0, -1)

export const type_is = (target, type) =>
  Object.prototype.toString
    .call(target)
    .split(' ')[1]
    .toLowerCase()
    .includes(type)

export const throttle = (cb, timeout = 100) => {
  let timer
  return (...args) => {
    if (timer) return
    timer = setTimeout(() => {
      cb(...args)
      clearTimeout(timer)
      timer = null
    }, timeout)
  }
}

export const debounce = (cb, timeout = 100) => {
  let timer
  return (...args) => {
    timer && clearTimeout(timer)
    timer = window.setTimeout(() => cb(...args), timeout)
  }
}

// TODO create map_reduce
// TODO create object_reduce
// TODO create set_reduce
// TODO create reduce
