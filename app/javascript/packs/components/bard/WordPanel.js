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

  displayWord(word){
    this.displayed = true;
    var img = new Image();
    img.src = word.url;
    img.addEventListener("load", ()=>{
      this.img.src = img.src; 
    })
  },

  init: function(element){
    this.element = element;
    this.img = this.element.querySelector("#word-panel-img");
  }
}
