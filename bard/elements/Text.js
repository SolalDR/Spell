
import Element from "./../Element.js"



/**
 * A text element
 * @param group (String) : Define where this element need to appear (foreground for text)
 * @param text (String) : Text content in raw html
 * @param el (String) : HTML Element with text in it
 * @param positionMofifier enum(String) : top-left, top-right, bottom-left, bottom-right, center-top, center-bottom, center-right, center-left 
 * @param animDisplay (String) : a enter anim in the collection of bard
 * @param animHide (String) : a leaving anim in the collection of bard
 * @param position : Object{x, y} : Offset translation in x & y 
 * @param dimension : Object {x, y} : Width and height
 * @param theme (String) : The text style in bard's collection
 */

class Text extends Element {
	
	constructor(params){
		super();

		this.type = "text";
		this.group = "foreground";
		this.text = params.text;
		this.theme = params.theme ? params.theme : "default"

		this.align = params.align ? params.align : "top-left";
		this.position = params.position ? params.position : {x: 0, y: 0};
		this.dimension = params.dimension ? params.dimension : {x: "100%", y: "auto"};
		
		this.initTextElement();
	}

	get style(){
		return `transform: translate3d(${this.position.x},${this.position.y},0); width: ${this.dimension.x}; height: ${this.dimension.y}`;
	}

	initTextElement(){
		this.el = document.createElement("p");
		this.el.innerHTML = this.text;
		this.el.classList.add("text");
		this.hide();
		this.el.classList.add("text--"+this.align);
		this.el.classList.add("text--"+this.theme);

		this.el.setAttribute("style", this.style);
	}

	display(){
		var fg = document.querySelector(".fragment__foreground");
		fg.appendChild(this.el);
		this.el.classList.remove("text--hide");

	}


	hide(){
		this.el.classList.add("text--hide");
	}

}

export default Text