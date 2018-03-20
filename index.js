import * as THREE from "three"; 
import * as Bard from "./bard/bard.js"


// Custom Fragment

class StartFragment extends Bard.Fragment {

	constructor(){ super(); }

	start(){
		var geometry = new THREE.BoxGeometry( 1, 1, 1 );
		var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
		this.cube = new THREE.Mesh( geometry, material );
		
		this.addSpeechRecognition();
		this.addElement( new Bard.MeshElement({ mesh: this.cube, group: "scene" }));
		var text = this.addElement( new Bard.TextElement({ 
			nodes: [
				"Un soir alors qu'ils <span data-speech='test_recognition'>observent le ciel étoilé</span> d'une belle nuit d'été", 
				"une étrange comète traverse l'atmosphère ... pour disparaître non loin de là.", 
				"\"Allons voir cela de plus prêt !\" s'exclament en coeur nos deux héros...", 
				"Soundain des bruits étranges parviennent de la forêt."
			],
			align: "bottom-left",
			position: {x: "40px", y:"-20px"},
			name: "mainText"
		}));

		text.on("update", (args)=>{
			console.log(args)
		})
		setTimeout(function(){
			text.next();
			setTimeout(function(){
				text.previous();
			}, 5000)
		}, 5000)
		
		this.addElement( new Bard.CharacterElement( {group: "scene", name: "guy"} ) );

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


class TestFragment extends Bard.Fragment {
	constructor() {
		super();
	}

	start() {
		var myElement = this.addElement(new Bard.SvgElement({name:"svg"}))

		for(var i=0; i<this.elements.length; i++){
			
			this.elements[i].display();
		}

		this.addAction()
		super.start()
	}
	
	render() {
		super.render()

		super.postRender()
	}
}

window.addEventListener("load", function(){

    var book = new Bard.Book();
    var frag = new StartFragment();
	var testFrag = new TestFragment()
	
	book.addFragment(testFrag);
	book.addFragment(frag);
    book.start();
})

