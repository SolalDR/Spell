import annyang from 'annyang'


/**
 * Allow to recognize speech and execute actions
 */
class SpeechRecognition {
	
	constructor(args) {
		if( !args ) var args = {}
		this.commands = args.commands ? args.commands : [];
		this.api = annyang;
			
  		if (this.api) {
			// Let's define a command. 
			this.api.setLanguage('fr-FR')


			this.api.addCallback('result', function(phrases){
				console.log(phrases)
				console.log('ok')
			})

			// Add our commands to annyang 
			this.api.addCommands(this.commands);

			// Start listening. 
			this.api.start();
		}
	}

	get loaded() {
		return this.api ? true : false;
	}

	removeAllCommands() {

	}

	addCommand() {

	}

	addCommands() {

	}

}

export default SpeechRecognition;