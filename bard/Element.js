
/**
 * Represent a part of a Fragment.
 * Element is abstract
 * @param actions [Action]
 * @param loaded boolean
 * @abstract
 */

class Element {

	constructor(params){
		this.fragment; // Lateinit accessible after initialisation with Fragment.addElement()
		this.actions = {};
		this.loaded = false;
		this._type = null;

		if( params.name ){
			this.name = params.name ? params.name : null;
		}
	}

	static get AVAILABLES_TYPES(){
		return ["text", "image", "sound", "obj3D", "obj2D", "svg"];
	}

	set type(type) {
		if( Element.AVAILABLES_TYPES.indexOf(type) >= 0 ){
			this._type = type;
		} else {
			console.warn(`This type "${type}" is not available for Element`);
		}
	}

	get type(){
		return this._type;
	}

	registerAction(name, action, force){
		if( this.actions[name] && !force ){
			console.warn("Cannot override this action, use force=true to override");
			return; 
		}

		this.actions[name] = action.bind(this)
	}

	deleteAction(name){
		this.actions[name] = null;
	}

	execute(name, params){
		if( this.actions[name] ){
			this.actions[name].call(this, params);
		}
	}


	/************* Callbacks *************/

	onAttachToFragment() {}

}

export default Element;