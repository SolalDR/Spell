
import Scene from "./Scene.js"
import BookNavigator from "./BookNavigator.js";

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

		this.navigator = new BookNavigator(this);
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