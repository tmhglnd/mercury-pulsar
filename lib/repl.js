'use babel';

const dgram = require('dgram');
const OSC = require('osc-min');
const Mercury = require('mercury-lang');

import { MessagePanelView, PlainMessageView } from 'atom-message-panel'

export default class MercuryRepl {
	constructor(ip, port){
		// initialize the client to send the Mercury Code
		this.ip = ip;
		this.port = port;
		this.client = dgram.createSocket('udp4');
		this.active = false;
		
		this.messages = new MessagePanelView({ title: 'Mercury Console' })
		this.messages.attach();

		// console.log('Class MercuryRepl Initialized');
	}

	eval(){
		if (!this.activated()){ return; }
		// evaluate all of the code
		try {
			// clear all the previous messages and close window
			this.messages.attach();
			this.messages.clear();

			// check if there is any code in the editor and get the text
			let editor = atom.workspace.getActiveTextEditor();
			if (editor){
				// flash the code in the editor to indicate evaluation
				this.flash();

				let code = editor.getText();

				// Run the code through the parser to check for errors
				let parse = Mercury(code);

				// if there are any errors, unfold the window 
				// print them and exit without sending code over osc
				if (parse.errors.length > 0){
					parse.errors.forEach((e) => {
						this.log(e);
					});
					this.log(`Could not run because of syntax error`);
					return;
				}
				
				// print any results from code that needs printing
				// parse.parseTree.print.forEach((p) => {
				// 	this.log(p);
				// });

				// console.log('Evaluating:', code);
				// send the code over udp to port and ip
				this.send('/mercury-code', code);
			}
		} catch(e) {
			this.log('Error sending code', e);
		}
	}

	flash() {
		// console.log('Flash editor');
		let editor = atom.workspace.getActiveTextEditor();
		let range = { 
			start: { row: 0, column: 0 },
			end: { row: editor.getLastScreenRow() + 1, column: 0 }
		}
		
		if (editor){
			var marker = editor.markBufferRange(range, {
				invalidate: 'touch'
			});

			var decoration = editor.decorateMarker(
				marker, {
					type: 'line',
					class: 'mercury-flash'
				});

			setTimeout(() => {
				marker.destroy();
			}, 150)
		}
	}

	silence(){
		if (!this.activated()){ return; }
		console.log('Silence');
		// silence the sound in Mercury
		this.send('/mercury-code', 'silence');
	}

	dispose(){
		// dispose of the client
		this.client.close();
		// console.log('Class MercuryRepl Disposed');
	}

	send(addr, msg){
		// send the message to the correct address
		let buf = OSC.toBuffer({
			address: addr,
			args : msg
		});
		this.client.send(buf, this.port, this.ip);
	}

	activated(){
		if (!this.active){
			this.log('Warning: Mercury is not enabled!');
		}
		return this.active;
	}

	log(...m){
		this.messages.add(new PlainMessageView({
			message: m.join(" "),
		}));
	}
}