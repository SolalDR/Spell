import * as THREE from 'three'

/** 
 * The threejs scene
 */

class Scene {

	constructor(canvas){

		this.canvas = document.getElementById("canvas");
		this.threeScene = new THREE.Scene();
		
		this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 50 );
		this.camera.position.z = 5;

		this.renderer = new THREE.WebGLRenderer( { 
			canvas: this.canvas, 
			antialias: true 
		} );

		this.renderer.setSize( window.innerWidth, window.innerHeight );

		this.initGroups();
		
	}

	render(){
		this.renderer.render(this.threeScene, this.camera);
	}

	initGroups(){
		this.bgGroup = new THREE.Group();
		this.fgGroup = new THREE.Group();
		this.mainGroup = new THREE.Group();

		this.threeScene.add(this.bgGroup);
		this.threeScene.add(this.fgGroup);
		this.threeScene.add(this.mainGroup);
	}

	addElement(element){
		switch( element.group ){
			case "background" : this.bgGroup.add(element.mesh); break;
			case "foreground" : this.fgGroup.add(element.mesh); break;
			default: this.mainGroup.add(element.mesh);
		}
	}

	removeElement(element){

	}

}

export default Scene;