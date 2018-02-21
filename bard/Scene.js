import * as THREE from 'three'

/** 
 * The threejs scene. It persist during the all livecycle of Book
 */

class Scene {

	/**
	 * Create the THREE.js Scene, camera, renderer and create layer groups
	 */
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

	/**
	 * Call the renderer
	 */
	render(){
		this.renderer.render(this.threeScene, this.camera);
	}

	/**	
	 * Init layer group
	 * - Background
	 * - Scene
	 * - Foreground
	 */
	initGroups(){
		this.bgGroup = new THREE.Group();
		this.fgGroup = new THREE.Group();
		this.mainGroup = new THREE.Group();

		this.bgGroup.position.y = -5
		this.mainGroup.position.y = 0
		this.fgGroup.position.y = 1

		this.threeScene.add(this.bgGroup);
		this.threeScene.add(this.fgGroup);
		this.threeScene.add(this.mainGroup);
	}

	/**
	 * Add a new element to specific group according to it's position
	 * @param element : Element
	 */
	addElement(element){
		switch( element.group ){
			case "background" : this.bgGroup.add(element.mesh); break;
			case "foreground" : this.fgGroup.add(element.mesh); break;
			default: this.mainGroup.add(element.mesh);
		}
	}


	/**
	 * Remove an element in its group
	 * @param element : Element
	 */
	removeElement(element){
		switch( element.group ){
			case "background" : this.bgGroup.remove(element.name); break;
			case "foreground" : this.fgGroup.remove(element.name); break;
			default: this.mainGroup.remove(element.name);
		}
	}

}

export default Scene;