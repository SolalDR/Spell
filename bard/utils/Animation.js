import easing from "./Easing.js"


class Animation {

	constructor(args){

		this.start = false;
		this.end = false;

		this.current = 0 

		this.from = args.from ? args.from : 0;
		this.to = args.to != null ? args.to : 1;
		
		this.speed = args.speed ? args.speed : 0.01;
		this.duration = args.duration ? args.duration : 1000;

		if( args.speed ){
			this.duration = (Math.abs(this.to - this.from) / args.speed) * 16 ; 
		}

		this.timingFunction = args.timingFunction && easing[args.timingFunction] ? easing[args.timingFunction] : easing["linear"]; 
		
		this.onProgress = args.onProgress;
		this.onFinish =  args.onFinish; 
		this.onStart = args.onStart;

	}


	render(delta){
		if( !this.isStart ){
			this.isStart = true; 
			if( this.onStart) this.onStart();
		}

		this.current += delta;
		this.advancement = this.timingFunction(Math.min(1., this.current / this.duration))

		var value = this.from + (this.to - this.from) * this.advancement; 

		if( this.onProgress) this.onProgress(this.advancement, value);
		if( this.advancement >= 1 ) {
			this.end = true;
			if( this.onFinish ){
				this.onFinish(this);		
			}
		}
		
		return this.advancement; 
	}
}

export default Animation