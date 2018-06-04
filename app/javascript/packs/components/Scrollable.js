Object.defineProperties(window, {
  scrollTop: {
    get: function() { return (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop; }
  },
  horizon: {
    get: function() {
      return this.scrollTop + this.innerHeight
    }
  }
});

class Scrollable {

  static initialize() {
    var elements = document.querySelectorAll("*[data-scrollable]");
    var scrollables = [];
    elements.forEach(element => scrollables.push(new Scrollable(element)));

    window.addEventListener("scroll", function() {
      scrollables.forEach(item => item.scroll(this.horizon));
    })

    return scrollables;
  }

  constructor(element) {
    this.element = element;
    this.value = element.getAttribute("data-scrollable");
    this.modifier = element.getAttribute("data-scrollable-modifier");
    this.offset = element.getAttribute("data-scrollable-offset");
    this.screenRatio = element.getAttribute("data-scrollable-screenRatio");
    
    this.init();

  }

  init() {
    this.value = this.value ? this.value : "1";
    this.offset = this.offset ? parseInt(this.offset) : 0;
    this.screenRatio = this.screenRatio ? this.screenRatio : 1;
    this.modifier = this.modifier ? this.modifier : null;

    var extract = this.value.match(/([\-+]?\d+)?([a-z%]*)?/);
    this.value = extract[1] ? parseInt(extract[1]) : 50;
    this.unit = extract[2] ? extract[2] : "";

    this.setTop();
  }

  setTop() {
    var element = this.element;
    var top = element.offsetTop;
    while (element = element.offsetParent)
      top += element.offsetTop;

    this.top = top;
    return this.top;
  }


  scroll(scrollTop) {
    var computeTop = this.top + this.offset;
    var diff = scrollTop - computeTop;
    var limit = window.innerHeight + this.element.offsetHeight; 
    var intensity;
    if( diff < 0 )
      intensity = 0;
    else if( diff > limit )
      intensity = this.value;
    else 
      intensity = diff/limit*this.value;

    if (intensity > 0 && this.modifier)
      this.element.classList.add(this.modifier)
    else if (intensity <= 0 && this.modifier)
      this.element.classList.remove(this.modifier)

    if( this.element.hasAttribute("data-scrollable-debug")){
      // console.log(this.offset, intensity)
    }
    

    this.element.style.setProperty("--scrollable", intensity+this.unit);
  }
}

export default Scrollable;
