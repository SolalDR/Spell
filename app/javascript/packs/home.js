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
    this.landingVideo = document.querySelector(".landing__video");
    
    this.landingVideo.onended = () => {
      if(this.landingPlayed) this.hideVideo();
    }

    window.addEventListener("scroll", ()=>{
      this.hideVideo();
    })

    setTimeout(()=>{
      title.classList.remove("landing__title--hidden");
    }, 500)

    title.addEventListener("mouseover", ()=>{
      this.landingElement.className = "landing landing--trailer-hover"
    })

    title.addEventListener("mouseleave", ()=>{
      if( !this.landingPlayed ){
        this.landingElement.className = "landing"
      }
    })

    title.addEventListener("click", ()=>{
      this.displayVideo();
    })
  },

  displayVideo: function(){
    if( this.landingPlayed ) return;

    this.landingElement.className = "landing landing--trailer-show";
    this.landingPlayed = true;
    // Header
    document.querySelector(".header").classList.add("header--slided-top");

    // Restart, unmuted, play
    this.landingVideo.currentTime = 0;
    this.landingVideo.muted = false;
    this.landingVideo.play();
  },

  hideVideo: function(){
    this.landingElement.className = "landing"
    this.landingPlayed = false;
    this.landingVideo.muted = true;
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
