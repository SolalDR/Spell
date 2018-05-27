import Alphabet from "./alphabet/Alphabet.js"

export default {

  init: function(){
    if(!document.querySelector("#sandbox")) return;
    
    Alphabet.init();
  }

}
