export class Nodes_By_Attribute {
	constructor(tag) {
		this.value = [...game.querySelectorAll(`[data-${tag}]`)]
	}
}
