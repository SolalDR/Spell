import Mesh from "./Mesh.js"
import * as THREE from "three"

/**
 * A character with rigs
 */
class Character extends Mesh {
	
	static get MODE_DEBUG(){ return 1; }

	constructor(params){
		super(params);
		this.type = "obj3D";
		window.char = this;
		this.resourceUrl = params.model ? params.model : "/bard/model/marine.json";
		this.action = "idle";
		this.anims = [];
		this.mode = 

		this.config = {
			skeleton: false,
			stepSize: 0.05,
			defaultDuration: 3.5,
			timeScale: 0.0,
			weight: {
				idle: 1.0, 
				walk: 0.0,
				run: 0.0
			}
		}

		this.loader = new THREE.ObjectLoader().load( this.resourceUrl,  ( loadedObject ) => {
			loadedObject.traverse( ( child ) => {
				if ( child instanceof THREE.SkinnedMesh ) {
					this.mesh = child;
				}
			} );
			if ( this.mesh === undefined ) {
				alert( 'Unable to find a SkinnedMesh in this place:\n\n' + url + '\n\n' );
				return;
			}
			
			this.mixer = new THREE.AnimationMixer( this.mesh );
			this.idleAction = this.mixer.clipAction( 'idle' );
			this.walkAction = this.mixer.clipAction( 'walk' );
			this.runAction = this.mixer.clipAction( 'run' );
			this.actions = [ this.idleAction, this.walkAction, this.runAction ];
			
			this.loaded = true;
			this.display();

			this.activateAllActions();
		});

		window.addEventListener("keydown", (e) => {
			if( [38, 40, 37, 39].indexOf(e.keyCode) < 0){ return; }
			this.hasKeyPress = true; 
			
			var targetRotation = this.mesh.rotation.y;
			switch(e.keyCode){
				case 38 : targetRotation = 0; break;// TOP
				case 40 : targetRotation = Math.PI; break; // Bottom
				case 37 : targetRotation = Math.PI/2; break; // Left
				case 39 : targetRotation = -Math.PI/2; break; // Right
			}

			if( this.action !== "walk" ){
				this.rotateYTo(targetRotation);
				this.walk();
			}
			
		})

		window.addEventListener("keyup", (e) => {
			if( [38, 40, 37, 39].indexOf(e.keyCode) < 0){ return; }
			
			this.hasKeyPress = false; 
			if( this.action !== "idle" && !this.hasKeyPress){
				this.idle();
			}
		})
	}



	walk(){
		if( this.mode == Character.MODE_DEBUG ){
			console.log("Walk");	
		}
		if( this.action == "idle" ){
			this.prepareCrossFade( this.idleAction, this.walkAction, 1.0 )	
		} else if( this.action == "run" ){
			this.prepareCrossFade( this.runAction, this.walkAction, 1.0 )	
		}
		this.action = "walk"
	}

	run(){
		if( this.mode == Character.MODE_DEBUG ){
			console.log("Run");	
		}
		if( this.action == "idle" ){
			this.prepareCrossFade( this.idleAction, this.runAction, 1.0 )	
		} else if( this.action == "walk" ){
			this.prepareCrossFade( this.walkAction, this.runAction, 1.0 )	
		}
		this.action = "run"
	}

	idle(){
		if( this.mode == Character.MODE_DEBUG ){
			console.log("Idle");	
		}
		if( this.action == "run" ){
			this.prepareCrossFade( this.runAction, this.idleAction, 1.0 )	
		} else if( this.action == "walk" ){
			this.prepareCrossFade( this.walkAction, this.idleAction, 1.0 )	
		}
		this.action = "idle"
	}


	prepareCrossFade( startAction, endAction, duration ) {
		// Switch default / custom crossfade duration (according to the user's choice)
		if(!duration) duration = this.config.defaultDuration
		// Make sure that we don't go on in singleStepMode, and that all actions are unpaused
		this.singleStepMode = false;
		this.unPauseAllActions();
		// If the current action is 'idle' (duration 4 sec), execute the crossfade immediately;
		// else wait until the current action has finished its current loop
		if ( startAction === this.idleAction ) {
			this.executeCrossFade( startAction, endAction, duration );
		} else {
			this.synchronizeCrossFade( startAction, endAction, duration );
		}
	}

	synchronizeCrossFade( startAction, endAction, duration ) {
		
		var onLoopFinished = function( event ) {
			if ( event.action === startAction ) {
				//this.mixer.removeEventListener( 'loop', onLoopFinished.bind(this) );				
			}
		}

		this.executeCrossFade( startAction, endAction, duration );
		// this.mixer.addEventListener( 'loop', onLoopFinished.bind(this) );
	}

	setCrossFadeDuration( defaultDuration ) {
		// Switch default crossfade duration <-> custom crossfade duration
		if ( this.settings[ 'use default duration' ] ) {
			return defaultDuration;
		} else {
			return this.settings[ 'set custom duration' ];
		}
	}

	/**
	 * Start action to mix 2 different action
	 * The end action must have a weight 1
	 */
	executeCrossFade( startAction, endAction, duration ) {
		
		this.setWeight( endAction, 1 );
		
		endAction.time = 0; // Reset time 
		
		// Crossfade with warping - you can also try without warping by setting the third parameter to false
		startAction.crossFadeTo( endAction, duration, true );
	}

	/**
	 * Unpause all the action to prepare cross fade 
	 * (all actions must be playing to fade)
	 */
	unPauseAllActions() {
		this.actions.forEach( function ( action ) {
			action.paused = false;
		} );
	}

	/**
	 * Pause all the action 
	 */
	pauseAllActions() {
		this.actions.forEach( function ( action ) {
			action.paused = true;
		} );
	}

	/**
	 * Toggle actions
	 * If actions are paused, start the anims else, stop the anims
	 */
	pauseContinue() {
		if ( this.singleStepMode ) {
			this.singleStepMode = false;
			this.unPauseAllActions();
		} else {
			if ( this.idleAction.paused ) {
				this.unPauseAllActions();
			} else {
				this.pauseAllActions();
			}
		}
	}

	/**
	 * Stop all the action
	 */
	deactivateAllActions() {
		this.actions.forEach( function ( action ) {
			action.stop();
		} );
	}

	/** 
	 * Activate all actions and set based status
	 */
	activateAllActions() {
		this.setWeight( this.idleAction, this.config.weight.idle );
		this.setWeight( this.walkAction, this.config.weight.walk );
		this.setWeight( this.runAction, this.config.weight.run );
		this.actions.forEach( function ( action ) {
			action.play();
		} );
	}

	/**
	 * SingleStepMode
	 */
	toSingleStepMode() {
		this.unPauseAllActions();
		this.singleStepMode = true;
		this.sizeOfNextStep = this.config.stepSize;
	}

	// This function is needed, since animationAction.crossFadeTo() disables its start action and sets
	// the start action's timeScale to ((start animation's duration) / (end animation's duration))
	setWeight( action, weight ) {
		action.enabled = true;
		action.setEffectiveTimeScale( 1 );
		action.setEffectiveWeight( weight );
	}

	display(){
		if( this.mesh ) {
			super.display();
		}
	}

	hide(){

	}

	render(clock){
		if( this.loaded ){
			this.idleWeight = this.idleAction.getEffectiveWeight();
			this.walkWeight = this.walkAction.getEffectiveWeight();
			this.runWeight = this.runAction.getEffectiveWeight();

			this.renderAnims();
			
			this.mixerUpdateDelta = clock.delta / 1000

			// If in single step mode, make one step and then do nothing (until the user clicks again)
			if ( this.singleStepMode ) {
				this.mixerUpdateDelta = this.sizeOfNextStep;
				this.sizeOfNextStep = 0;
			}

			this.mixer.update( this.mixerUpdateDelta);
		}
	
	}

}

export default Character