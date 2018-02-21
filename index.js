import Book from "./bard/Book.js";
import Fragment from "./bard/Fragment.js";
import * as THREE from "three"; 


// Custom Fragment

class StartFragment extends Fragment {

	constructor(params){
		super();
	}

	start(){
		super.start();
		
		var geometry = new THREE.BoxGeometry( 1, 1, 1 );
		var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
		this.cube = new THREE.Mesh( geometry, material );
		

		this.addElement( {  mesh: this.cube, group: "scene" });

		this.render();	
	}

	render(){
		super.render();
	
		this.cube.rotation.x += 0.01;
		this.cube.rotation.y += 0.01;

		super.postRender();
	}
}


window.addEventListener("load", function(){
    var book = new Book();
    var frag = new StartFragment();
    book.addFragment(frag);
    
    book.start();
})

