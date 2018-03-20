
/** 
 * An action is the result of any interaction with user. 
 * It's fired in the context of a fragment.
 * @TODO : Implement a Event system to get callback
 */
class Action {

	
	/**
	 * @constructor
	 * @param callback Function : callback which will be executed to perform the action
	 * @param context Object : Context to execute the callback
	 * @param args Object : A config object
	 * @param args.once Boolean : If true, the action will be able to execute once
	 * @param args.id String : Unique id to represente the action in the fragment. 
	 */

	constructor(name, ctx, procedure, args){
	
		if(!args) var args = {};

		this.once = args.once ? args.once : false; 
		this.context = ctx;
		this.procedure = procedure;
		this.name = name ? name : this.getRandomName();
		
		// Increment when "execute" is call
		this.count = 0;
	
	}


	/**
	 * return a random name to serve as id
	 * Used when name is not defined 
	 */
	getRandomName(){
	
		return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
	
	}


	/**
	 * Run action
	 */
	execute(){
	
		if( this.once && this.count < 0 || this.once == false) {
			this.count++; 
			this.procedure.call(this.context, {
				action: this, 
				context: this.context 
			})
		}
	}

}

export default Action