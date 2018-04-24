import Header from "./components/header.js"
import Tree from "./components/tree.js"
import loadAsyncScript  from "./components/loadAsyncScript.js"
import * as Bard from "./vendor/Bard/src/Bard.js"

window.Bard = Bard;
window.loadAsyncScript = loadAsyncScript;
window.addEventListener("load", ()=>{

  Header.init();
  if( document.querySelector(".tree") ) var tree = new Tree(document.querySelector(".tree"));

  if( document.querySelector("canvas") ){
    window.book = new Bard.Book();
  }

})
