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
      var horizon = this.horizon;
      scrollables.forEach(item => item.scroll(horizon));
    })
    scrollables.forEach(item => item.scroll(window.horizon));

    return scrollables;
  }

  constructor(element) {
    this.element = element;
    this.from = 0;
    this.to = 0;
    var attr = element.getAttribute("data-scrollable");
    var values = attr.split(/,\s?/);

    this.from = values[1] && values[0] ? values[0] : "0"

    if ( values[1] )
      this.to = values[1]
    else if( values[0])
      this.to = values[0]
    else
      this.to = "1";


    this.modifier = element.getAttribute("data-scrollable-modifier");
    this.offset = element.getAttribute("data-scrollable-offset");
    this.screenRatio = element.getAttribute("data-scrollable-screenRatio");
    
    this.init();

  }

  init() {
    this.offset = this.offset ? parseInt(this.offset): 0;
    this.screenRatio = this.screenRatio ? this.screenRatio : 1;
    this.modifier = this.modifier ? this.modifier : null;

    var extract = this.from.match(/([\-+]?\d+)?([a-z%]*)?/);
    this.from = extract[1] ? parseInt(extract[1]) : 0;
    this.unit = extract[2] ? extract[2] : "";

  
    var extract = this.to.match(/([\-+]?\d+)?([a-z%]*)?/);
    this.to = extract[1] ? parseInt(extract[1]) : 1;
    if( this.unit == "" ){
      this.unit = extract[2] ? extract[2] : "";
    }

    this.diff = this.to - this.from;

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
      intensity = this.from;
    else if( diff > limit )
      intensity = this.to;
    else 
      intensity = diff/limit*this.diff + this.from;

    if (intensity > this.from && this.modifier)
      this.element.classList.add(this.modifier)
    else if (intensity <= this.from && this.modifier)
      this.element.classList.remove(this.modifier)

    if( this.element.hasAttribute("data-scrollable-debug")){
     console.log(this.diff, intensity, this.unit)
    }
    

    this.element.style.setProperty("--scrollable", intensity+this.unit);
  }
}

export default Scrollable;
