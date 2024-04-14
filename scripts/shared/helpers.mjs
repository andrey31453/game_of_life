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
