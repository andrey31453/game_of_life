import { Templates } from './template.mjs'
import { Handlers } from './handlers.mjs'

const init = async () => {
	await new Templates('template', (name) => `./templates/${name}.html`).load()
	await new Templates('template').load()

	new Handlers('click')
	new Handlers('input')
}
init()
