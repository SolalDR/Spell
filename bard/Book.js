
import Scene from "./Scene.js"
import Navigator from "./Navigator.js";

/**
 * Represents the all book
 * @param title : String
 * @param author : String
 * @param fragments : [Fragment]
 */

class Book {

	constructor(params){
		this.fragments = [];
		this.author = null;
		this.title = null;

		this.navigator = new Navigator(this);
	}

	addFragment(fragment){
		fragment.book = this;
		this.fragments.push(fragment); 
	}

	start(){
		this.scene = new Scene();
		this.fragments[0].start();
	}

}


export default Book;