import {
  Nodes_By_Attribute,
  Node_Data,
  Theme_Handler,
  Config_Handler,
  Target_Iterator,
  Life_Handler,
  Field_Handler,
} from '../bunddler.mjs'

const Event_Names = new Target_Iterator(
  {
    click: ['click'],
    input: ['input'],
  },
  []
)

const Event_Handler = new Target_Iterator(
  {
    theme: Theme_Handler,
    config: Config_Handler,
    life: Life_Handler,
    field: Field_Handler,
  },
  () => {}
)

class Listener_Config {
  constructor(node, type) {
    const event_handler = new Event_Handler(new Node_Data(node, type).value)
      .value

    // TODO fix error if dont correct handler type
    const handler = new event_handler().handler
    const value = new Node_Data(node, 'value').value
    const events = new Event_Names(type).value

    this.value = { events, handler, value }
  }
}

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
    const { events, handler, value } = new Listener_Config(node, this.#type)
      .value

    events.forEach((event) => {
      node.addEventListener(event, (e) => {
        handler(value, e)
      })
    })
  }
}
