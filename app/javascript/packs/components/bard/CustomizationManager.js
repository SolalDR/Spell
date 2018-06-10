import * as Bard from "js-bard";

export default {

  manageColors: function(){
    this.colorsElement = document.querySelectorAll(".customization__color");
    this.colorsElement.forEach(element => {
      element.addEventListener("click", ()=>{
        this.book.config.character.color_hex = element.getAttribute("data-color");
        console.log(this.book.config.character);
      })
    })
  },

  manageRecording: function(){
    if( !this.book.soundManager ) return;

    var playContainer = document.querySelector(".customization__play-container");
    var isRecording = false;
    var isPlaying = false;
    this.recorder = new Bard.Recorder(this.book.soundManager);
    this.recorder.init();

    this.recorderButton.addEventListener("click", ()=>{
      if( isRecording ){
        this.recorder.stop();
        this.recorderButton.classList.remove("customization__recorder--active");
        playContainer.classList.remove("customization__play-container--hidden");
        this.playButton.classList.remove("customization__play--active");
        isRecording = false;
      } else {
        this.recorder.record();
        this.recorderButton.classList.add("customization__recorder--active");
        playContainer.classList.add("customization__play-container--hidden");
        isRecording = true;
      }
    });

    this.recorder.on("record:stop", (e)=>{
      this.sound = new Bard.Sound(this.book.soundManager, "heros-call", e.buffer, {
        gain: 1
      });

      this.book.soundManager.sounds["heros-call"] = this.sound;
    });

    this.playButton.addEventListener("click", ()=>{
      this.sound.start(); 
      this.playButton.classList.add("customization__play--active");
    })
  },

  manageListItem: function(){
    var items = document.querySelectorAll(".customization__list-item");
    var bodyPart = document.querySelector("#body-part-choices-container");

    items.forEach(item=>{
      item.addEventListener("click", ()=>{
        bodyPart.classList.add("customization__list--hidden");

        setTimeout(()=>{
          bodyPart.classList.remove("customization__list--hidden");
          var choiceItems = bodyPart.querySelectorAll(".customization__list-item");
          choiceItems.forEach( item => {
            item.setAttribute("style", `background-image: url("/images/personnalisation/${item.getAttribute("data-partcode")}.png");`)
          });
        }, 500)
      })
    })

    
  },

  save: function(){
    // var 
  },

  init: function(manager){
    this.manager = manager;
    this.book = this.manager.book;


    this.saveButton = document.querySelector("#customization-save");
    this.selectTitle = document.querySelector("#title-input")
    this.title = document.querySelector("#name-input");

    this.recorderButton = document.querySelector(".customization__recorder");
    this.playButton = document.querySelector(".customization__play");

    this.manageColors();
    this.manageListItem();
   
    this.book.on("customize:display", (event)=>{
      this.element = event.element;
      this.manageRecording();
      this.saveButton.addEventListener("click", ()=>{
        if( !this.sound ){
          this.book.dispatch("alert", { name: "interaction_vocal_text" })
        } else {
          this.save();
          this.book.currentFragment.executeAction("customize-hide");
        }
      })
    })

    this.book.on("customize:hide", ()=>{

    }) 
  }

}
