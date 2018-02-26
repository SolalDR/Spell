
import Element from "./../Element.js"
import Animation from "./../utils/Animation.js"

/**
 * An element in a THREE.js scene.
 * Can be animated and hooked thanks to event
 */
 
class Mesh extends Element {
	constructor(params){
		super(params);

		this.fragment = null; // Lateinit
		this.group = params.group;

		if( params.mesh ){
			this.mesh = params.mesh;
			this.mesh.name = this.name;
			this.loaded = true; 
		} else {
			this.mesh = null;	
		}
	}

	/*************************
	*
	*	Animation & Control
	*
	**************************/
	
	/** 
	 * Create a rotation animation from the current rotation Y value
	 * @param angle (Float)
	 */
	rotateY(angle) {
		var anim = new Animation({
			from: this.mesh.rotation.y,
			to: this.mesh.rotation.y + angle,
			speed: 0.05,
			onProgress: (advancement, value) =>{ this.mesh.rotation.y = value; },
			onFinish: (anim) => {
				var i = this.anims.indexOf(anim)
				this.anims.splice(i, 1);
			}
		})

		this.anims.push(anim);
	}


	/**
	 * Create a rotation animation to the angle specified
	 * @param angle (Float) [0..2*Pi]
	 */
	rotateYTo(angle) {
		var anim = new Animation({
			from: this.mesh.rotation.y,
			to: angle,
			onProgress: (advancement, value) => {
				this.mesh.rotation.y = value;
			},
			onFinish: (anim) => {
				var i = this.anims.indexOf(anim)
				this.anims.splice(i, 1);
			}
		})

		this.anims.push(anim);
	}

	/*************************
	*
	*		Attachement
	*
	**************************/

	/** 
	 * Minimum required to attach an element to the scene
	 */ 
	display(){
		if( this.fragment && this.fragment.book && this.fragment.book.scene ) {
			this.fragment.book.scene.addElement(this); 
			return;
		}
		console.warn("Book not started. Cannot add elements to fragment");
	}

	/** 
	 * @TODO
	 * Minimum required to detach an element to the scene
	 */ 
	hide(){

	}


	/*************************
	*
	*		Rendering
	*
	**************************/


	// renderAnims(){
	// 	var diff;
	// 	var anims = [];
	// 	var finished;
	// 	for(var i=0; i<this.anims.length; i++){
	// 		diff = this.anims[i].to - this.anims[i].from;
	// 		finished = false

	// 		// If from < to 
	// 		if (diff > this.anims[i].step) {
	// 			this.anims[i].from += this.anims[i].step
	// 		// If from > to
	// 		} else if (diff < -this.anims[i].step ){
	// 			this.anims[i].from -= this.anims[i].step
	// 		// If diff < step
	// 		} else {
	// 			finished = true; 
	// 		}


	// 		this.anims[i].frame(this.anims[i].from)
	// 		if( !finished ) anims.push(this.anims[i]);
	// 	}

	// 	this.anims = anims;
	// }
	/**
	 * Render the list of all animations
	 */
	renderAnims(){
		var diff;
		var anims = [];
		var finished;
		for(var i=0; i<this.anims.length; i++){
			this.anims[i].render(16);
		}
	}

	/** 
	 * Raf function. Can be override in all elements extending Mesh.
	 * @param clock (Clock) : The general clock of fragment   
	 */
	render(clock){}
}

export default Mesh;