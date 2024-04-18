import {
  Nodes_By_Attribute,
  Node_Data,
  Theme_Handler,
  Config_Handler,
  Target_Iterator,
  Live_Handler,
  Field_Handler,
  Field_Scroll_Handler,
} from '../bunddler.mjs'

export const events = {
  click: 'click',
  input: 'input',
  scroll: 'scroll',
}

const Event_Names = new Target_Iterator(
  {
    click: [events.click],
    input: [events.input],
    scroll: [events.scroll],
  },
  []
)

const Event_Handler = new Target_Iterator(
  {
    theme: Theme_Handler,
    config: Config_Handler,
    live: Live_Handler,
    field: Field_Handler,
    field_scroll: Field_Scroll_Handler,
  },
  () => {}
)

class Listener_Config {
  constructor(node, type) {
    const event_handler = new Event_Handler(new Node_Data(node, type).value)
      .value

    // TODO fix error if dont correct handler type
    this.handler = new event_handler().handler
    this.value = new Node_Data(node, 'value').value
    this.events = new Event_Names(type).value
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

  #set_nodes = () => (this.#nodes = new Nodes_By_Attribute(this.#type).value)

  #add_listeners = () => {
    if (this.#not_nodes) return

    this.#nodes.forEach(this.#add_listener)
  }

  #add_listener = (node) => {
    const { events, handler, value } = new Listener_Config(node, this.#type)

    events.forEach((event) => {
      node.addEventListener(event, (e) => handler(value, e), { passive: true })
    })
  }
}

export class Events {
  constructor(types) {
    Object.keys(types).forEach((event_key) => new Handlers(types[event_key]))
  }
}
