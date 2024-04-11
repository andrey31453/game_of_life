export const delay = (ms = 50) => new Promise((res) => setTimeout(res, ms))

export const maps = (...props) => {
  const datas = props.slice(0, -1)
  const cb = props.at(-1)

  datas[0].forEach((_, i) => cb(...datas.map((data) => data[i])))
}
