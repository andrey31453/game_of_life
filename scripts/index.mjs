import { Templates, Handlers } from './bunddler.mjs'

const init = async () => {
  await new Templates('template', (name) => `./templates/${name}.html`).load()
  await new Templates('template').load()

  // TODO add validate values
  new Handlers('click')
  new Handlers('input')
}
init()
