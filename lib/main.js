'use babel';

import MercuryRepl from './repl.js'
import { CompositeDisposable } from 'atom';

const IP = '127.0.0.1';
const PORT = 4880;

export default {
	repl : null,
	client : null,
	subscriptions: null,

	activate() {
		// start the Mercury REPL sending code to port and ip
		this.repl = new MercuryRepl(IP, PORT);
		this.repl.active = true;

		// add the key commands to the subscription list
		this.subscriptions = new CompositeDisposable();

		this.subscriptions.add(atom.commands.add('atom-text-editor', {
			'mercury:toggle': () => this.toggle(),
			'mercury:eval': () => this.repl.eval(),
			'mercury:silence': () => this.repl.silence(),
			'mercury:randomize' : () => this.repl.randomize()
		}));

		console.log('Activated Mercury REPL');
	},

	deactivate() {
		// delete subscriptions and repl
		this.subscriptions.dispose();
		this.repl.dispose();
		// triggers garbagge collection
		this.repl = null;

		console.log('Deactivated Mercury REPL');
	},

	toggle() {
		// enable or disable the mercury repl
		this.repl.active = !this.repl.active;
		
		if (this.repl.active){
			console.log('Mercury Enabled');
		} else {
			console.log('Mercury Disabled');
		}
	}
}
