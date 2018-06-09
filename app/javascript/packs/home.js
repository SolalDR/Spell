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
        window.location.href = btn.href; 
      }, 3500);
    });
  },

  manageLandingTop: function(){
    this.landingPlayed = false;
    var title = document.querySelector(".landing__title");

    window.addEventListener("scroll", ()=>{
      this.landingElement.className = "landing landing--trailer-hover"
      setTimeout(()=>{
        this.landingElement.className = "landing"
      }, 1500)
      
      this.landingPlayed = false;
    })

    setTimeout(()=>{
      title.classList.remove("landing__title--half-hidden");
    }, 1500)

    title.addEventListener("mouseenter", ()=>{
      this.landingElement.className = "landing landing--trailer-hover"
    })

    title.addEventListener("mouseleave", ()=>{
      if(!this.landingPlayed)
        this.landingElement.className = "landing"
    })

    title.addEventListener("click", ()=>{
      this.landingStatus = "show"
      this.landingPlayed = true;
    })
    
  },

  set landingStatus(status) {
    if(status == null) {
      this.landingElement.className = "landing"
    } else if(!this.landingPlayed){
      this.landingElement.className = "landing landing--trailer-"+status;  
    }
  },

  init: function(){

    var home = document.querySelector(".home")
    if (home) { 
      Smoothscroll.init();
      Timeline.init(document.querySelector(".timeline"));
      this.landingElement = document.querySelector(".landing");
      this.startAventure();
      this.manageLandingTop();
    }
  }
}
