
export default  {

  dropEvent: function(btn) {
    btn.addEventListener("click", function(e){
      var drop = this.parentNode.querySelector(".header__drop"); 
      if( drop.className.match("header__drop--close") ){
        drop.classList.replace("header__drop--close", "header__drop--open")
      } else {
        drop.classList.replace("header__drop--open", "header__drop--close")
      }

      e.preventDefault();
    }, false)
  },

  manageDropBtns: function() {
    this.dropBtn = this.header.querySelectorAll(".header__drop-btn");
    for(var i=0; i<this.dropBtn.length; i++){
      this.dropEvent(this.dropBtn[i]);
    }
  },

  display(){
    this.header.classList.remove("header--slided-top");
  },

  hide(){
    this.header.classList.add("header--slided-top");
  },

  initListener: function(){
    window.addEventListener("wheel", (e)=>{
      if( e.deltaY > 0 )
        this.hide()
      else if(e.deltaY < 0)
        this.display()
    })
  },

  init: function() {
    this.header = document.querySelector(".header");

    
    if( this.header ){
      this.isWheelSensitive = this.header.classList.contains("header--wheel-sensitive");
      this.manageDropBtns();
      if( this.isWheelSensitive ) this.initListener();
    }
  }
  
}
