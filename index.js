import Book from "./bard/Book.js";
import Fragment from "./bard/Fragment.js";
import TextElement from "./bard/elements/Text.js";
import MeshElement from "./bard/elements/Mesh.js";
import * as THREE from "three"; 


// Custom Fragment

class StartFragment extends Fragment {

	constructor(){ super(); }

	start(){
		var geometry = new THREE.BoxGeometry( 1, 1, 1 );
		var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
		this.cube = new THREE.Mesh( geometry, material );
		
		
		this.addElement( new MeshElement({ mesh: this.cube, group: "scene" 	}));
		this.addElement( new TextElement({ 
			text: "Un soir alors qu'ils observent le ciel étoilé d'une belle nuit d'été... une étrange comète traverse l'atmosphère ... pour disparaître non loin de là. \"Allons voir cela de plus prêt !\" s'exclament en coeur nos deux héros... Soundain des bruits étranges parviennent de la forêt." ,
			align: "bottom-left",
			position: {x: "100px", y:"-100px"}
		}));
		


		for(var i=0; i<this.elements.length; i++){
			this.elements[i].display();
		}

		super.start();	
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

