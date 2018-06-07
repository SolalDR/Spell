
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

  save: function(){
    // var 
  },

  init: function(manager){
    this.manager = manager;
    this.book = this.manager.book;


    this.saveButton = document.querySelector("#customization-save");
    this.selectTitle = document.querySelector("#title-input")
    this.title = document.querySelector("#name-input");

    this.manageColors();
   
    this.book.on("customize:display", (event)=>{
      this.element = event.element;
      this.saveButton.addEventListener("click", ()=>{
        this.save();
        this.book.currentFragment.executeAction("customize-hide");
      })
    })

    this.book.on("customize:hide", ()=>{

    }) 
  }

}
