
import Element from "./../Element.js"

class Mesh extends Element {
	constructor(params){
		super();

		this.fragment = null; // Lateinit

		this.mesh = params.mesh;
		this.group = params.group;
	}

	display(){
		if( this.fragment && this.fragment.book && this.fragment.book.scene ) {
			this.fragment.book.scene.addElement(this); 
			return;
		}
		console.warn("Book not started. Cannot add elements to fragment");
	}

	hide(){

	}
}

export default Mesh;