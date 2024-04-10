export class Node_Data {
	constructor(node, attribute, { remove }) {
		this.value = node.getAttribute(`data-${attribute}`)
		this.#remove_attribute(node, attribute, remove)
	}

	#remove_attribute = (node, attribute, remove) => {
		if (!remove) return
		node.removeAttribute(`data-${attribute}`)
	}
}

export class Nodes_Data {
	constructor(nodes, attribute, options) {
		this.value = nodes.map(
			(node) => new Node_Data(node, attribute, options).value
		)
	}
}
