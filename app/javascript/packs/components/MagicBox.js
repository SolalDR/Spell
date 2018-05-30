import Alphabet from "./box/Alphabet.js";
import SandBox from "./box/SandBox.js";
import MenuManager from "./bard/MenuManager.js";

export default {

  init: function(){

    if(!document.querySelector("#sandbox")) return;


    var canvas = document.querySelector("#sandbox .sandbox__canvas");
    SandBox.init(canvas);
    MenuManager.init();
    Alphabet.init({
      onEnter: function(value){
        SandBox.execute(value);
      }
    });
  }

}
