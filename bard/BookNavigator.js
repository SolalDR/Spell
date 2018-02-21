/**
 * Allow to navigate inside the book and between fragments
 */
class BookNavigator {
	
	constructor(book){

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