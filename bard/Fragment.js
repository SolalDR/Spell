
/**
 * Represent a fragment of history 
 */

class Fragment {
	
	constructor(){
		this.book = null;
	}

	start(){

	}

	render(){
		this.raf = requestAnimationFrame( this.render.bind(this) );
	}

	postRender(){
		this.book.scene.render();
	}

	addElement(element){
		// If book defined and has scene 
		if( this.book && this.book.scene ) {
			this.book.scene.addElement(element); 
			return;
		}
		console.warn("Book not started. Cannot add elements to fragment");
	}

}


export default Fragment;