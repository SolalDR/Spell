

/**
 * Represent a fragment of history
 */

class Fragment {
	
	constructor(){
		this.book = null;
		this.elements = [];
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
		element.fragment = this;
		this.elements.push(element);
	}

	removeElement(element){
		if( this.elements.indexOf(element) >= 0) {
			
			element.hide();

			for(var i=0; i<this.elements.length; i++){
				this.elements.splice(i, 1);
			}
		}
	}

}


export default Fragment;