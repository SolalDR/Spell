export default {

  toggle: function() {
    this.display = this.display ? false : true
  },


  get display() {
    return this.menu.classList.contains("control--hide") ? false : true;
  },


  set display(value) {
    if (value) {
      this._display = true; 
      this.menu.classList.replace("control--hide", "control--display")
    } else {
      this._display = false;
      this.menu.classList.replace("control--display", "control--hide") 
    }
  },

  initEvents: function(){

    this.items.forEach(item => {
      item.addEventListener("click", ()=>{
        this.toggle();
      })
    })

    this.btns.fullscreen.addEventListener("click", function(){
      // Manage fullScreen toggle
      if ((document.fullScreenElement && document.fullScreenElement !== null) ||    
       (!document.mozFullScreen && !document.webkitIsFullScreen)) {
        if (document.documentElement.requestFullScreen) {  
          document.documentElement.requestFullScreen();  
        } else if (document.documentElement.mozRequestFullScreen) {  
          document.documentElement.mozRequestFullScreen();  
        } else if (document.documentElement.webkitRequestFullScreen) {  
          document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);  
        }  
      } else {  
        if (document.cancelFullScreen) {  
          document.cancelFullScreen();  
        } else if (document.mozCancelFullScreen) {  
          document.mozCancelFullScreen();  
        } else if (document.webkitCancelFullScreen) {  
          document.webkitCancelFullScreen();  
        }  
      }
    })
  },
  
  init: function(manager = null){
    this.manager = manager;
    this.menu = document.querySelector("#controller");
    this.items = this.menu.querySelectorAll(".control__menu-item");
    this.btn = this.menu.querySelector("#control-menu-btn"); 
    this._display = false;
    window.menu = this;

    this.btns = {
      fullscreen: this.menu.querySelector("button[data-target='fullscreen']")
    }

    this.initEvents();
  }
}
