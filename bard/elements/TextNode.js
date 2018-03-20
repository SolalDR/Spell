/**
 * A simple textnode
 */
class TextNode {

	/**
	 * @param text (string)
	 * @param rank (int)
	 */
	constructor(args){
		this.el;
		this.text = args.text; 
		this.speechs = [];
		this.genHtml();

	}


	/** 
	 * Helper to strip html tag
	 */
	static strip(html){
	
		var tmp = document.createElement("DIV");
		tmp.innerHTML = html;
		return tmp.textContent || tmp.innerText || "";
	
	}


	genHtml() {

		this.el = document.createElement("div");
		this.el.classList.add("text-node");	
		this.el.classList.add("text-node--hide");	
		this.el.innerHTML = this.text;

		var speechEls = this.el.querySelectorAll("*[data-speech]");
		speechEls.forEach(el => this.speechs.push({
			command: TextNode.strip(el.innerHTML),
			count: 0
		}));

	}

	display() {

		this.el.classList.remove("text-node--hide")
		this.el.classList.add("text-node--before-display")
		this.el.classList.add("text-node--display")
		setTimeout(() => {
			this.el.classList.remove("text-node--before-display")
		}, 500)

	}

	hide() {

		this.el.classList.add("text-node--before-hide")
		this.el.classList.remove("text-node--display")
		setTimeout(() => {
			this.el.classList.remove("text-node--before-hide")
			this.el.classList.add("text-node--hide")
		}, 500)

	}

}


export default TextNode;