
/**
 * Represent a fragment of history
 */

class Fragment {
	
	constructor(){
		this.book = null;
	}

	/**
	 * Overrided method. Create the first render and add element to Scene
	 */
	start(){
		this.render();
	}

	/**
	 * @override 
	 * Raf 
	 */
	render(){
		this.raf = requestAnimationFrame( this.render.bind(this) );
	}

	/**
	 * @override 
	 * Post raf 
	 */
	postRender(){
		this.book.scene.render();
	}


	/**
	 * If possible, add a new element to Fragment
	 */
	addElement(element){
		if( this.book && this.book.scene ) {
			this.book.scene.addElement(element); 
			return;
		}
		console.warn("Book not started. Cannot add elements to fragment");
	}

}


export default Fragment;