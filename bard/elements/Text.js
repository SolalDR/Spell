
import Element from "./../Element.js"


/**
 * A text element
 * @param group (String) : Define where this element need to appear (foreground for text)
 * @param text [String] : Array Text content in raw html
 * @param el (String) : HTML Element with text in it
 * @param positionMofifier enum(String) : top-left, top-right, bottom-left, bottom-right, center-top, center-bottom, center-right, center-left 
 * @param animDisplay (String) : a enter anim in the collection of bard
 * @param animHide (String) : a leaving anim in the collection of bard
 * @param position : Object{x, y} : Offset translation in x & y 
 * @param dimension : Object {x, y} : Width and height
 * @param theme (String) : The text style in bard's collection
 * @param speechRecognition (SpeechRecognition)
 */

import TextNode from "./TextNode.js"

class Text extends Element {
	
	constructor(params){

		super(params);
		this.eventsList = ["update", "end"]
		this.currentNode = null;
		this.speechRecognition = params.speechRecognition ? params.speechRecognition : null
		this.type = "text";
		this.group = "foreground"; 	// Text is always front
		this.theme = params.theme ? params.theme : "default"

		this.align = params.align ? params.align : "top-left";
		this.position = params.position ? params.position : {x: 0, y: 0};
		this.dimension = params.dimension ? params.dimension : {x: "100%", y: "auto"};

		this.nodes = [];
		for(var i=0; i<params.nodes.length; i++) {
			this.nodes.push(new TextNode({
				text: params.nodes[i],
				rank: i
			}));
		}

	}

	/**
	 * Return the content of the style attribute
	 */
	get style(){
		return `transform: translate3d(${this.position.x},${this.position.y},0); width: ${this.dimension.x}; height: ${this.dimension.y}`;
	}

	/**
	 * Catpure commands
	 */
	 captureCommands(el){
	 	var commandsEl = el.querySelectorAll("*[data-speech]");
	 	var commands = [];
	 	for( var i = 0; i < commandsEl.length; i++){
	 		commands.push({
	 			command: commandsEl[i].innerHTML,
	 			id: commandsEl[i].getAttribute("data-speech")
	 		});
	 	}

	 	return commands;
	 }

	/**
	 *	Create the html text element
	 */
	initTextElement(){
		this.el = document.createElement("div");
		this.el.classList.add("text");
		
		this.nodes.forEach((node) => {
			this.el.appendChild(node.el);
		});

		this.el.classList.add("text--"+this.align);
		this.el.classList.add("text--"+this.theme);
		this.el.setAttribute("style", this.style);

		this.loaded = true;

		this.next();
	}

	/**
	 * Restart Text to first TextNode 
	 */
	start(){
		if( this.currentNode !== null ) this.nodes[this.currentNode].hide();
		this.currentNode = 0;
		this.nodes[this.currentNode].display();

		// Launch start event
		this.dispatch("start", {
			rank: this.currentNode,
			node: this.nodes[this.currentNode]
		});
	}


	/**
	 * Manage toggle current nodes
	 */
	update(next){
		this.nodes[this.currentNode].hide();
		this.nodes[next].display();
		
		this.dispatch("update", {
			rank: next,
			node: this.nodes[next]
		});

		this.currentNode = next;
	}

	/**
	 * Move forward 
	 */
	next(){
		
		if( this.currentNode == null ) {
			this.start(); 
			return;
		} 

		var next = this.currentNode+1;
		if( this.nodes[next] )
			this.update(next);
		else
			this.dispatch("end", { node: this.nodes[this.currentNode] });
	}

	/**
	 * Move backward 
	 */
	previous(){
		if( this.currentNode == null || this.currentNode == 0) return; 
		var next = this.currentNode-1;
		if( this.nodes[next] )
			this.update(next);
	}

	/** 
	 * Add text element in DOM and display it 
	 */
	display(){
		var fg = document.querySelector(".fragment__foreground");
		fg.appendChild(this.el);
		this.el.classList.remove("text--hide");
	}

	
	hide(){
		this.el.classList.add("text--hide");
	}



	/**
	 * Callbacks
	 */
	 onAttachToFragment() {
	 	if(this.fragment && this.fragment.speechRecognition) {
	 		this.speechRecognition = this.fragment.speechRecognition;
	 		this.initTextElement();
	 	}
	 }
}

export default Text