
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

  init: function() {
    this.header = document.querySelector(".header");
    if( this.header ){
      this.manageDropBtns();  
    }
  }
  
}
