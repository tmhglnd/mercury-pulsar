'use babel';

const dgram = require('dgram');
const OSC = require('osc-min');

export default class MercuryRepl {
	constructor(ip, port){
		// initialize the client to send the Mercury Code
		this.ip = ip;
		this.port = port;
		this.client = dgram.createSocket('udp4');
		this.active = false;

		console.log('Class MercuryRepl Initialized');
	}

	eval(){
		if (!this.activated()){ return; }
		// evaluate all of the code
		try {
			// check if there is any code in the editor and get the text
			let editor = atom.workspace.getActiveTextEditor();
			if (editor){
				let code = editor.getText();
				console.log('Evaluating:', code);
				// send the code over udp to port and ip
				this.send('/mercury-code', code);
				this.flash();
			}
		} catch(e) {
			console.log('Error sending code', e);
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
		console.log('Class MercuryRepl Disposed');
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
			console.log('Warning: Mercury is not enabled!');
		}
		return this.active;
	}
}