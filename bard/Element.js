
class Element {

	static get AVAILABLES_TYPES(){
		return ["text", "image", "obj3D", "obj2D"];
	}

	constructor(params){
		this.actions = {};
		this._type = null;
		this.content = null;
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

	display(){}

	hide(){}

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

}

export default Element