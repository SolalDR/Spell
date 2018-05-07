import Header from "./components/header.js"
import Tree from "./components/tree.js"
import loadAsyncScript  from "./components/loadAsyncScript.js"
// import * as Bard from "./vendor/Bard/src/Bard.js"
import * as Bard from "js-bard"
import CodeMirror from "./components/codemirror.js"
import TogglerManager from "./components/toggler.js"
import RessourceForm from "./components/ressources.js"

window.Bard = Bard;
window.loadAsyncScript = loadAsyncScript;


window.addEventListener("load", ()=>{

  Header.init();
  CodeMirror.init();
  TogglerManager.init();
  RessourceForm.init();

  if( document.querySelector("#tree") ) var tree = new Tree(document.querySelector(".tree"));

  if( document.querySelector("canvas") ){
    window.book = new Bard.Book();
  }


})
