const INFO = 1;
const ERROR = 2;
const WARNING = 3;
const CONFIRM = 4;

export default {

  config: {
    duration: 15000
  },

  registerHelpMessages: function(){
    this.messages = {
      network_exception: {
        message: "Problème de réseau",
        image: "network",
        type: "error"
      },

      interaction_touch_object: {
        message: "Vous devez toucher {{ content }} pour avancer.",
        image: "aide",
        type: "info"
      },

      interaction_vocal_text: {
        message: "Maintenez le bouton rouge dans le texte pour enregistrer.",
        type: "info"
      },

      chrome_exception: {
        message: "Vous n'utilisez pas Google Chrome, certaines fonctionnalités risque de ne pas fonctionner correctement.",
        type: "warning",
        image: "aide"
      }
    }
  },

  genMessage: function(message, content = ""){

    var el = document.createElement("div");
    var messageEl = document.createElement("p");
    var image = document.createElement("img");
    var deleted = false;

    el.className = "help__item help__item--hidden help__item--"+message.type;
    messageEl.className = "help__item-message";
    image.className = "help__item-image";

    messageEl.innerHTML = message.message.replace(/\{\{\s*content\s*?\}\}/g, content);; 
    if( !message.image ) message.image = message.type;
    image.src = `/assets/picto/picto-${message.image}.svg`

    el.appendChild(messageEl);
    el.appendChild(image);

    el.addEventListener("click", ()=>{
      el.classList.add("help__item--hidden");
      setTimeout(()=>{
        this.element.removeChild(el);
      }, 600)
      deleted = true; 
    })

    this.element.appendChild(el);

    setTimeout(()=>{
      el.classList.remove("help__item--hidden");
    }, 20)

    setTimeout(()=>{
      if( !deleted ){
        el.classList.add("help__item--hidden");
        setTimeout(()=>{
          this.element.removeChild(el);
        }, 600)
      }
    }, this.config.duration)
  },

  launch(name, args = {}){
    var content = args.content ? args.content : "";
    if( !this.messages[name] ){
      this.genMessage({
        message: name, 
        type: args.type ? args.type : "info"
      }, content);
    } else {
      this.genMessage(this.messages[name], content)
    }
  },

  init: function(manager){
    this.manager = manager;
    this.registerHelpMessages();
    this.element = document.querySelector("#help-manager");
    this.manager.book.on("alert", (event)=>{
      this.launch(event.name);
    })
  }
}
