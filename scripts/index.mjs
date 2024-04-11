import { Templates, Handlers } from './bunddler.mjs'

const init = async () => {
	// TODO add recurse calling
	await new Templates('template', (name) => `./templates/${name}.html`).load()
	await new Templates('template').load()

	console.log('end load')

	new Handlers('click')
	new Handlers('input')
}
init()
