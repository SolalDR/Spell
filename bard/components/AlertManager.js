

class Dialog {

	static get AVAILABLES_TYPES() {
		return ["info", "warn", "error", "confirm"]
	} 

	constructor(args) {		
		console.log(args)
		this.type = args.type ? args.type : "info";
		this.title = args.title ? args.title : null;
		this.content = args.content ? args.content : null;
		this.onAgree = args.onAgree ? args.onAgree : null;
		this.onDisagree = args.onDisagree ? args.onDisagree : null;

		this.genManager();
		this.genNode();
		this.genActions();
		this.display();
	}


	display() {
		this.manager.appendChild(this.el);
		this.el.classList.add("display--hidding");
		this.el.classList.replace("display--hidding", "dialog--display");
	}

	close(){
		this.el.classList.replace("dialog--display", "display--hidding");
		setTimeout(() => {
			this.el.classList.remove("display--hidding");
			this.manager.removeChild(this.el)
		})
	}

	genManager(){
		this.manager = document.querySelector("#alert-manager");
		if(!this.manager) {
			this.manager = document.createElement("div");
			this.manager.id = "alert-manager";
			document.body.appendChild(this.manager)
		}
	}

	genNode(){
		this.el = document.createElement("div");
		this.el.className = "dialog";
		this.el.innerHTML = `
		<div class="dialog__container">
			<div class="dialog__header">
				<p class="dialog__title"></p>
				<button class="dialog__close"><i class="material-icons">close</i></button>
			</div>
			<div class="dialog__body"></div>
			<div class="dialog__actions"></div>
		</div>`;

		this.container = this.el.querySelector(".dialog__container");
		this.el.className += " dialog--"+this.type;

		this.els = {
			title: this.el.querySelector(".dialog__title"),
			close: this.el.querySelector(".dialog__close"),
			body: this.el.querySelector(".dialog__body"),
			actions: this.el.querySelector(".dialog__actions")
		}

		this.els.body.innerHTML = this.content;
	}


	genActions() {
		this.els.agree = document.createElement("button");
		this.els.agree.className = "dialog__action dialog__agree"
		this.els.agree.innerHTML = "Ok"
		this.els.actions.appendChild(this.els.agree);


		this.els.close.addEventListener("click", ()=>{
			this.close();
			if(this.onDisagree) this.onDisagree()
		})

		this.els.agree.addEventListener("click", ()=>{
			this.close();
			if(this.onAgree) this.onAgree()
		})
		
		if( this.type == "confirm") {
			this.els.agree.innerHTML = "Oui"
			this.els.disagree = document.createElement("button");
			this.els.disagree.className = "dialog__action dialog__agree"
			this.els.disagree.innerHTML = "Non"
			this.els.actions.appendChild(this.els.disagree);
			this.els.disagree.addEventListener("click", ()=>{
				this.close();
				if(this.onDisagree) this.onDisagree()
			})
		}
	}
}

/**
 * Allow to send message to user with custom light box
 */
var AlertManager = {


	error: function(message, callback) {
		new Dialog({
			type: "error",
			content: message,
			onAgree: callback
		});
	},


	warn: function(message, callback) {
		new Dialog({
			type: "warn",
			content: message,
			onAgree: callback
		});
	},

	info: function(message, callback){
		new Dialog({
			type: "info",
			content: message,
			onAgree: callback
		});
	},

	confirm: function(message, callback, callback2) {
		new Dialog({
			type: "confirm",
			content: message,
			onAgree: callback,
			onDisagree: callback2
		});
	}
}

export default AlertManager;