
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

	constructor(ctx, callback, args){
	
		if(!args) var args = {};
		this.once = args.once ? args.once : false; 
		this.context = ctx; 
		this.callback = callback; 
		this.name = args.name ? args.name : this.getRandomName();
		
		// Increment when "execute" is call
		this.count = 0;
	
	}


	getRandomName(){
	
		return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
	
	}


	execute(args){
	
		if( this.once && this.count > 0) {
			this.count++; 
			this.context.call(this.callback, args)
		}
	
	}
}

export default Action