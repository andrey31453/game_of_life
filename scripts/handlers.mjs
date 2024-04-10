import { Nodes_By_Attribute, Node_Data } from './node.mjs'
import { Theme } from './theme.mjs'
import { Target_Iterator } from './utils.mjs'

const Event_Names = new Target_Iterator(
	{
		click: ['click'],
		input: ['input'],
	},
	[]
)

const Event_Handler = new Target_Iterator(
	{
		theme: new Theme().instance.handler,
	},
	() => {}
)

export class Handlers {
	#type
	#nodes

	constructor(type) {
		this.#type = type

		this.#set_nodes()
		this.#add_listeners()
	}

	get #not_nodes() {
		return !this.#nodes?.length
	}

	#set_nodes = () => {
		this.#nodes = new Nodes_By_Attribute(this.#type).value
	}

	#add_listeners = () => {
		if (this.#not_nodes) return

		this.#nodes.forEach(this.#add_listener)
	}

	#add_listener = (node) => {
		const handler = new Event_Handler(new Node_Data(node, this.#type).value)
			.value
		const value = new Node_Data(node, 'value').value
		const events = new Event_Names(this.#type).value

		events.forEach((event) => {
			node.addEventListener(event, (e) => {
				handler(value)
			})
		})
	}
}
