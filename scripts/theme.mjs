import { Singleton, Target_Iterator } from './utils.mjs'
import { Node_By_Attribute } from './node.mjs'

const default_vars = {
	/* colors */

	['--color--d']: 'red',

	['--f-color']: 'white',

	['--b-color']: 'black',

	/* distances */

	['--gap']: '12px',

	/* font params */

	['--font-size--sm']: '14px',
	['--font-size--d']: '16px',
	['--font-size--l']: '20px',
	['--font-size--xl']: '24px',

	['--line-height--sm']: '22px',
	['--line-height--d']: '26px',
	['--line-height--l']: '30px',
	['--line-height--xl']: '48px',

	['--font-weight--sm']: '100',
	['--font-weight--d']: '300',
	['--font-weight--l']: '400',
	['--font-weight--xl']: '700',
}

const Theme_Vars = new Target_Iterator(
	{
		alien: {
			...default_vars,
			['--color--d']: 'green',
			['--b-color']: 'green',
		},
		astronaut: { ...default_vars },
		atom: { ...default_vars },
		chemical: { ...default_vars },
		jupiter: { ...default_vars },
		meteorite: { ...default_vars },
		star: { ...default_vars },
		stars: { ...default_vars },
	},
	[]
)

export const Theme = new Singleton(
	class {
		constructor() {
			this.handler('alien')
		}

		handler = (v) => {
			const vars = new Theme_Vars(v).value
			const node = new Node_By_Attribute('vars').value

			Object.keys(vars).forEach((var_key) => {
				node.style.setProperty(var_key, vars[var_key])
			})
		}
	}
)
