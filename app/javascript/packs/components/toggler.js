function Toggler(element) {
  this.element = element;
  this.getTargets();
  this.initEvents();
}

Toggler.prototype = {

  getTargets: function() {
    this.selectors = this.element.getAttribute("data-toggle-target").split(/,\s?/);
    this.modifiers = this.element.getAttribute("data-toggle-modifier").split(/,\s?/);
    this.targets = [];
    for(var i=0; i<this.selectors.length; i++) {
      this.targets.push(document.querySelector(this.selectors[i]));
      if( !this.modifiers[i] ) {
        this.modifiers[i] = "hidden";
      }
    }
  },

  toggle: function(){
    for(var i=0; i<this.targets.length; i++) {
      this.targets[i].classList.toggle(this.modifiers[i])
    }
  },

  initEvents: function() {
    var self = this;
    this.element.addEventListener("click", function(e){
      self.toggle();
      e.preventDefault();
    })
  }
}

var TogglerManager = {

  togglers: [],

  findByElement: function(element) {
    for(var i=0; i<this.togglers.length; i++) {
      if(this.togglers[i].element === element) {
        return this.togglers[i]
      }
    }
  },
  
  init: function() {
    var elements = document.querySelectorAll("*[data-toggle-target]");
    for(var i=0; i<elements.length; i++) {
      this.togglers.push(new Toggler(elements[i]));
    }
  }
}

export {Toggler};

export default TogglerManager;
