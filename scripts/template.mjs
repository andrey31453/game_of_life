import { Nodes_By_Attribute, Nodes_Data } from './node.mjs'
import { maps } from './utils.mjs'

class Template_Config {
	#nodes
	#template_promises

	constructor(data_name, uri_cb) {
		this.#set_nodes(data_name)
		this.#set_template_promises(data_name, uri_cb)

		this.value = [this.#nodes, this.#template_promises]
	}

	#set_nodes = (data_name) => {
		this.#nodes = new Nodes_By_Attribute(data_name).value
	}

	#set_template_promises = (data_name, uri_cb = (name) => name) => {
		const template_uris = new Nodes_Data(this.#nodes, data_name, {
			remove: true,
		}).value.map(uri_cb)

		this.#template_promises = template_uris.map(this.#get_template_promise)
	}

	#get_template_promise = (uri) =>
		new Promise(async (res) => res(await fetch(uri).then((r) => r.text())))
}

export class Templates {
	#nodes
	#template_promises
	#templates

	constructor(data_name, uri_cb) {
		;[this.#nodes, this.#template_promises] = new Template_Config(
			data_name,
			uri_cb
		).value
	}

	load = async () => {
		await this.#load_templates()
		this.#inject_templates()
	}

	#load_templates = async () => {
		this.#templates = await Promise.all(this.#template_promises)
	}

	#inject_templates = () =>
		maps(
			this.#nodes,
			this.#templates,
			(node, template) => (node.innerHTML = template)
		)
}
