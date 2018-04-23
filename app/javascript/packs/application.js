// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.
//
// To reference this file, add <%= javascript_pack_tag 'application' %> to the appropriate
// layout file, like app/views/layouts/application.html.erb

import 'babel-polyfill'
import Header from "./components/header.js"
import * as THREE from "three"; 
import * as Bard from "./vendor/Bard/src/Bard.js"

window.Bard = Bard;

window.loadScriptAsync = function(uri){
  return new Promise((resolve, reject) => {
  
    var tag = document.createElement('script');
    tag.src = uri;
    tag.async = true;
    tag.onload = () => {
      resolve();
    };
  
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  
  });
}


window.addEventListener("load", ()=>{
  Header.init();

  console.log("Load application.js");

  if( document.querySelector("canvas") ){
    window.book = new Bard.Book();

    console.log("Start book application.js");
    book.start();
  }
})
