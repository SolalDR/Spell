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
    event.element.classList.add("clickable--load");
    var img = new Image();
    img.src = event.word.url;
    img.addEventListener("load", ()=>{
      this.displayed = true;
      this.img.src = img.src; 
      event.element.classList.remove("clickable--load");
    })
  },

  init: function(element){
    this.element = element;
    this.img = this.element.querySelector("#word-panel-img");
  }
}
