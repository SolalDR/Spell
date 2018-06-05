function whichTransitionEvent(){
  var t;
  var el = document.createElement("fakeelement");
  var transitions = { "transition": "transitionend", "OTransition": "oTransitionEnd", "MozTransition": "transitionend", "WebkitTransition": "webkitTransitionEnd" }
  for(t in transitions){
    if( el.style[t] !== undefined ){
      return transitions[t];
    }
  }
}

export default {
  init: function(){
    this.main = document.querySelector(".main");
    this.links = document.querySelectorAll(".smoothout");
    this.transitionEnd = whichTransitionEvent();
    this.links.forEach((link)=>{
      this.initListener(link);
    })
  },

  hideMain: function(modifier = "main--hidden"){
    this.main.classList.add(modifier);
  },

  showMain: function(modifier = "main--hidden"){
    this.main.classList.remove(modifier);
  },

  initListener: function(link){
    
    var modifier = link.getAttribute("data-smoothout-modifier");
    console.log(modifier);
    if( !modifier ) modifier = "main--hidden";
    if( link.tagName === "A" ){
      link.addEventListener("click", (e) => {
        this.hideMain(modifier);

        setTimeout(()=>{
          window.location.href = link.href;  
        }, 500)
        
        e.preventDefault();
        return false;
      })
    }
  } 
}
