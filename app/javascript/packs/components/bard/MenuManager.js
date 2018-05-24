export default {
  init: function(){
    this.menu = document.querySelector("#controller");
    this.items = this.menu.querySelectorAll(".control__menu-item");
    this.btn = this.menu.querySelector("#control-menu-btn"); 
    this._display = false;

    this.btns = {
      fullscreen: this.menu.querySelector("button[data-target='fullscreen']")
    }

    this.initEvents();
  },

  initEvents: function(){
    this.btns.fullscreen.addEventListener("click", function(){
      console.log("Fullscreen")
    })
  }
}
