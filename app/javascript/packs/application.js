import Header from "./components/header.js"
import Tree from "./components/tree.js"
import loadAsyncScript  from "./components/loadAsyncScript.js"
import * as Bard from "js-bard"
import CodeMirror from "./components/codemirror.js"
import TogglerManager from "./components/toggler.js"
import RessourceForm from "./components/ressources.js"
import deleteRecord from "./components/delete.js"
import BardManager from "./components/bard.js"
import Http from "./components/http.js"
import MagicBox from "./components/MagicBox.js"

window.Http = Http;
window.Bard = Bard;



window.addEventListener("load", ()=>{

  Header.init();
  CodeMirror.init();
  TogglerManager.init();
  RessourceForm.init();
  MagicBox.init();

  document.querySelectorAll(".field input").forEach(input => {
    input.setAttribute("data-value", input.value);
    input.addEventListener("keyup", function(){
      this.setAttribute("data-value", this.value);
    })
  })

  if( document.querySelector("#tree") ) var tree = new Tree(document.querySelector(".tree"));



  var canvas = document.querySelector("#bard-canvas"); 
  if( canvas ){
    window.loadAsyncScript = loadAsyncScript;
    window.book = new Bard.Book({
      id: parseInt(canvas.getAttribute("data-book")),
      debug: false,
      canvas: canvas
    });
    BardManager.init(window.book);
  }


  deleteRecord();
})




