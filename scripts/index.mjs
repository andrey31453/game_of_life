import { Templates } from './template.mjs'

const init = async () => {
	await new Templates('template', (name) => `./templates/${name}.html`).load()
	await new Templates('template').load()
}
init()
