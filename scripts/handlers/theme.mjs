import {
	Target_Iterator,
	Node_By_Attribute,
	State,
	Handler,
} from '../bunddler.mjs'

const default_vars = {
	/* colors */

	['--color--d']: 'red',
	['--f-color']: 'white',
	['--b-color']: 'black',

	/* distances */

	['--gap--s']: '8px',
	['--gap--d']: '12px',
	['--gap--l']: '16px',
	['--gap--xl']: '20px',

	/* font params */

	['--font-size--s']: '14px',
	['--font-size--d']: '16px',
	['--font-size--l']: '20px',
	['--font-size--xl']: '24px',

	['--line-height--s']: '22px',
	['--line-height--d']: '26px',
	['--line-height--l']: '30px',
	['--line-height--xl']: '48px',

	['--font-weight--s']: '100',
	['--font-weight--d']: '300',
	['--font-weight--l']: '400',
	['--font-weight--xl']: '700',
}

const Theme_Vars = new Target_Iterator(
	{
		alien: {
			...default_vars,
		},

		astronaut: {
			...default_vars,
		},

		atom: {
			...default_vars,
		},

		chemical: {
			...default_vars,
		},

		jupiter: {
			...default_vars,
		},

		meteorite: {
			...default_vars,
		},

		star: {
			...default_vars,
		},

		stars: {
			...default_vars,
		},
	},
	[]
)

// TODO exclude controller
export const Theme_Handler = new Handler((v) => {
	const vars = new Theme_Vars(v).value
	const node = new Node_By_Attribute('vars').value

	new State().theme = vars
	Object.keys(vars).forEach((var_key) => {
		node.style.setProperty(var_key, vars[var_key])
	})
}, 'alien').value
