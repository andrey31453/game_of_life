// TODO add hash in options
export class Node_By_Attribute {
	constructor(tag) {
		this.value =
			game.querySelector(`[a-${tag}]`) || document.querySelector(`[a-${tag}]`)
	}
}

export class Nodes_By_Attribute {
	constructor(tag) {
		this.value = [...game.querySelectorAll(`[a-${tag}]`)]
	}
}

export class Node_Data {
	constructor(node, attribute, options) {
		this.value = node.getAttribute(`a-${attribute}`)
		this.#remove_attribute(node, attribute, options)
	}

	#remove_attribute = (node, attribute, options) => {
		if (!options?.remove) return
		node.removeAttribute(`a-${attribute}`)
	}
}

export class Nodes_Data {
	constructor(nodes, attribute, options) {
		this.value = nodes.map(
			(node) => new Node_Data(node, attribute, options).value
		)
	}
}
