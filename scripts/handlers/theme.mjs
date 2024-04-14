import { Theme_Vars, Handler, State, Node_By_Attribute } from '../bunddler.mjs'

class Node_Vars {
  constructor(vars) {
    const node = new Node_By_Attribute('vars').value

    Object.keys(vars).forEach((var_key) => {
      node.style.setProperty(var_key, vars[var_key])
    })
  }
}

export const Theme_Handler = new Handler((v) => {
  const vars = new Theme_Vars(v).value

  new State().vars = vars
  new Node_Vars(vars)
}, 'alien').value
