const INFO = 1;
const ERROR = 2;
const WARNING = 3;
const CONFIRM = 4;

export default {
  
  registerHelpMessages: function(){
    this.messages = {
    
      network_exception: {
        message: "Problème de réseau",
        image: "",
        type: ERROR
      },

      interaction_touch_object: {
        message: "Vous devez toucher {{ content }} pour avancer.",
        image: "tactile"
        type: INFO
      },

      interaction_vocal_text: {
        message: "Maintenez le bouton rouge dans le texte pour enregistrer."
      }

    }
  },

  launch(name){
    if( !this.messages[name] ){

    }
  }

  init: function(manager){
    this.registerHelpMessages();
    this.manager.book.on("help", (name)=>{
      this.launch(name);
    })
  }
}
