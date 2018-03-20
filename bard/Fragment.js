import Clock from "./utils/Clock.js"
import Action from "./Action.js"
import SpeechRecognition from "./components/SpeechRecognition.js"
import AlertManager from "./components/AlertManager.js";

/**
 * Represent a fragment of history
 */

class Fragment {
	
	constructor(){
		this.book = null;
		this.clock = new Clock();
		this.elements = [];
		this.actions = {};
		this.speechRecognition = null;
	}

	/**
	 * Overrided method. Create the first render and add element to Scene
	 */
	start(){
		this.render();
		this.time = 0;
	}

	/**
	 * @override 
	 * Raf 
	 */
	render(){
		this.raf = requestAnimationFrame( this.render.bind(this) );
		this.clock.update();
	}

	/**
	 * @override 
	 * Post raf 
	 */
	postRender(preventDefault){

		this.book.scene.render();
		if( preventDefault !== true ){

			for(var i=0; i<this.elements.length; i++){
				if( this.elements[i].render) {
					this.elements[i].render(this.clock);
				}
			}
		}
		
	}

	/**
	 * Add a speech recognition, the speechRecognition will be automatically passed to Text 
	 */
	addSpeechRecognition() {
		this.speechRecognition = new SpeechRecognition();
		if(!this.speechRecognition.loaded) {
			AlertManager.error("La reconnaissance vocale ne fonctionne pas sur ce navigateur. Privilégiez un navigateur comme Google Chrome.")
		}
	}

	/**
	 * Add action to the fragment context
	 * @param name Function: The function to be executed when action is fired
	 * @param args Object : The config object of the action
	 * @return boolean : Return true if action has been add
	 */
	addAction(callback, args){
		var action = new Action(this, callback, args); 
		if( !this.actions[action.name] ){
			this.actions[action.name] = action; 
		}
		console.warn(`Action cannot be add. You need to remove action with name \"${action.name}\" first.`);
		return this.actions[action.name]; 
	}

	/**
	 * Remove action from name
	 * @param name string : The action's name
	 * @return boolean : Return true if action has been deleted
	 */
	removeAction(name){
		if( this.actions[name] ){
			this.actions[name] = null; 
			return true; 
		}
		return false; 
	}

	/**
	 * If possible, add a new element to Fragment
	 */
	addElement(element){
		element.fragment = this;
		this.elements.push(element);

	
		element.onAttachToFragment();

		return element;
	}

	/**
	 * if possible hide and remove an element
	 */
	removeElement(element){
		if( this.elements.indexOf(element) >= 0) {
			
			element.hide();

			for(var i=0; i<this.elements.length; i++){
				this.elements.splice(i, 1);
			}
		}
	}

}


export default Fragment;