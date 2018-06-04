class TimelineItem {
  constructor(element, parent) {
    this.href = element.href.match(/(#.+)/)[1];
    this.element = element;

    this.target = document.querySelector(this.href);

    element.addEventListener("click", () => {
      parent.current = this;
    })

    var tmpEl = this.target;
    var top = tmpEl.offsetTop;
    while (tmpEl = tmpEl.offsetParent)
      top += tmpEl.offsetTop;

    this.top = top;
  }

  hide() {
    this.element.classList.remove("timeline__item--active");
  }

  display() {
    this.element.classList.add("timeline__item--active");
  }
}

export default {

  init: function(element){
    this.element = element;
    this.items = [];

    var items = this.element.querySelectorAll(".timeline__item");
    items.forEach(item => this.items.push(new TimelineItem(item, this)));
    this.current = this.items[0];
    this.initListener();
  },

  initListener: function(){
    window.addEventListener("scroll", ()=>{
      
      var top = window.scrollTop;
      this.visible = ( top < window.innerHeight * 0.75) ? false : true
      
      if (this.moving) return; 
      var nearest = null;
      for(var i=0; i<this.items.length; i++){
        if(Math.abs(top - this.items[i].top) < 100) {
          nearest = this.items[i];
        }
      }

      

      if( this.current !== nearest && nearest ) this.current = nearest;
    })
  },

  get current() {
    return this._current;
  },

  set current(item) {
    if( this._current ) this.current.hide();  
    this._current = item;
    this.moving = true;
    setTimeout(()=> this.moving = false, 500)
    item.display();
  },

  get visible() {
    return this.element.classList.contains("timeline--visible"); 
  },

  set visible(visible){
    if( visible != this.visible ) this.element.classList.toggle("timeline--visible");
  }

}
