import Header from "./components/header.js"
import Tree from "./components/tree.js"
import loadAsyncScript  from "./components/loadAsyncScript.js"
// import * as Bard from "./vendor/Bard/src/Bard.js"
import * as Bard from "js-bard"
import CodeMirror from "./components/codemirror.js"
import TogglerManager from "./components/toggler.js"
import RessourceForm from "./components/ressources.js"
import deleteRecord from "./components/delete.js"
import BardManager from "./components/bard.js"

window.Bard = Bard;
window.loadAsyncScript = loadAsyncScript;


window.addEventListener("load", ()=>{

  Header.init();
  CodeMirror.init();
  TogglerManager.init();
  RessourceForm.init();

  if( document.querySelector("#tree") ) var tree = new Tree(document.querySelector(".tree"));

  var canvas = document.querySelector("canvas"); 
  if( canvas ){
    window.book = new Bard.Book({
      id: parseInt(canvas.getAttribute("data-book")),
      debug: false
    });

    BardManager.init(window.book);
  }

  deleteRecord();

})




