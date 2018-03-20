import Control from "./components/Control.js"

/**
 * Allow to navigate inside the book and between fragments
 */
class Navigator {
	
	constructor(book){
		this.book = book;
		this.control = new Control();
	}

	start(){
		
	}

	stop(){
		
	}

	get current(){
		return this._currentFragment
	}

	set current(fragment){
		this._currentFragment = fragment;
	}


}

export default Navigator