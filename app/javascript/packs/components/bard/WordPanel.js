export default {

  set displayed(isDisplayed) {
    if( isDisplayed )  
      this.element.classList.remove("panel--hidden");
    else
      this.element.classList.add("panel-hidden");
  },

  get displayed(){
    return this.element.classList.contains("panel--hidden") ? false : true;
  },

  displayWord(event){
    console.log("displayed")
    event.element.classList.add("clickable--load");

    var video = document.querySelector("#word-panel-video");
    video.innerHTML = "";
    var source = document.createElement("source")
    source.setAttribute("type", "video/mp4");
    source.setAttribute("src", event.word.url);
    video.appendChild(source);
    video.play();
    
    this.displayed = true;
    event.element.classList.remove("clickable--load");

  },

  init: function(manager, element){
    this.manager = manager; 
    this.book = this.manager.book;
    this.element = element;
    this.img = this.element.querySelector("#word-panel-img");

    this.book.on("word:click", (e)=>{
      this.displayWord(e);
    })
  }
}
