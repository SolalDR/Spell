
/**
 * Provide an interface control
 */

class Control {

	constructor() {

		this.menu = document.querySelector("#controller");
		this.items = this.menu.querySelectorAll(".control__menu-item");
		this.btn = this.menu.querySelector("#control-menu-btn"); 
		this._display = false;

		this.initEvents();

	}


	initEvents() {

		this.btn.addEventListener("click", () => {
			this.toggle();
		})

	}


	toggle() {
		this.display = this.display ? false : true
	}


	get display() {
		return this._display;
	}


	set display(value) {
		if (value) {
			this._display = true; 
			this.menu.classList.replace("control--hide", "control--display")
		} else {
			this._display = false;
			this.menu.classList.replace("control--display", "control--hide") 
		}
	}

}


export default Control