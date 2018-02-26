/*
*
*	Based on THREE.Clock
* 	https://github.com/mrdoob/three.js/blob/master/src/core/Clock.js
*
*/

class Clock {
	
	constructor ( autoStart ) {

		this.autoStart = ( autoStart !== undefined ) ? autoStart : true;
		this._start = 0; 
		
		this.old = 0; 
		this.running = false; 
		this.elapsed = 0; 

		if ( this.autoStart ) {
			this.start();
		}

	}

	start () {
		
		this._start = Date.now();
		this.old = this._start;
		this.elapsed = 0;
		this.running = true; 

	} 

	stop () {

		this.running = false;

	}

	update () {

		if( this.running ){

			var now = Date.now();
			this.delta = now - this.old; 
			this.elapsed += this.delta; 
			this.old = now;

		}
		
	}

}

export default Clock