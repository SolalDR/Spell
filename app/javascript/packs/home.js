import Timeline from "./components/Timeline.js"
import Smoothscroll from "./smoothScroll.js"

export default {

  startAventure: function(){
    var btn = document.querySelector("#aventure-start");
    var spaceship = document.querySelector("#spaceship");
    btn.addEventListener("click", (e) => {
      document.querySelector(".home").classList.add("disapear");
      btn.classList.add("fade");
      spaceship.classList.add("fly");
      e.preventDefault();
      setTimeout(function(){
        window.location.href = btn.href
      }, 3500);
    });
  },

  init: function(){

    var home = document.querySelector(".home")
    if (home) { 
      Smoothscroll.init();
      Timeline.init(document.querySelector(".timeline"));
      this.startAventure();
    }
  }
}
