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

	randomize() {
		let editor = atom.workspace.getActiveTextEditor();
		if (!editor){ return; }

		// regex to find variable numbers/divisions
		// first check for comments, tempo, keywords, then filter the numbers/divisions
		let tokens = /(\/\/.+)|(tempo.+)|([A-Za-z_-]+[A-Za-z0-9]*)|([0-9]+[0-9:/.]*)/g;
		// updated with latest find
		let find;
		// code from the editor
		let code = editor.getText();
		// percentage of change for the numbers (+/-)
		let deviation = 0.2;

		// check the code for all instances of the variables
		while ((find = tokens.exec(code)) !== null) {
			let v = find[0];
			let rnd = Math.random();
			let sign = (Math.random() > 0.5) * 2 - 1;
			// check type of found value (Integer, Float, Division)
			if (isNaN(v)){
				if (v.match(/^[0-9]+\/[0-9]+/)){
					v = v.split('/').map(x => Number(x));

					// choose either numerator or denominator to change
					if (Math.random() < 0.75){
						let dQ = Math.log2(v[1]);
						let dT = Math.log2(v[1]/3);
						if (Number.isInteger(dQ)){
							v[1] = 2 ** Math.min(5, Math.max(0, Math.round(dQ + rnd * sign)));
						} else if (Number.isInteger(dT)){
							v[1] = 2 ** Math.min(3, Math.max(0, Math.round(dT + rnd * sign))) * 3;
						} else {
							v[1] = Math.max(1, Math.round(v[1] + rnd));
						}
					} else {
						v[0] = Math.max(1, v[0] + (rnd < 0.5) * sign);
					}
					// v = find[0];
					v = `${v[0]}/${v[1]}`;
				}
				// if not a number check for division
			} else {
				v = Number(v);
				let _v = v + v * deviation * rnd * sign;
				v = Number.isInteger(v) ? _v.toFixed(0) :_v.toFixed(3);
			}
			// add the random value on the location of the found number
			code = code.substring(0, find.index) + v + code.substring(tokens.lastIndex);
			// update the lastIndex to account for length change in code string
			tokens.lastIndex = find.index + v.length;
		}
		// get cursors position to replace at location after resetting code
		let crs = editor.getCursorScreenPosition();
		// update the code in the editor
		editor.setText(code);
		editor.setCursorScreenPosition(crs);
		// evaluate the new code
		// this.eval();
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