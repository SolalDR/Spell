class CarouselItem {
  constructor(element, rank){
    this.element = element;
    this.config = {};
    if( this.element.getAttribute("data-carousel")){
      this.config = JSON.parse(this.element.getAttribute("data-carousel"));  
    }
    this.rank = rank;
  }

  get visible(){
    return this.element.classList.contains("carousel__item--visible");
  }

  hide(){
    if( this.isHiding ) return false; 
    this.element.classList.replace("carousel__item--visible", "carousel__item--hidding");
    this.isHiding = true;
    setTimeout(()=>{
      this.isHiding = false;
      this.element.classList.replace("carousel__item--hidding", "carousel__item--hidden")
    }, 500)

    return true;
  }

  show(){
    if(this.isHiding) return false;
    var timeout = this.config.timeout ? this.config.timeout : 0
    this.element.classList.replace("carousel__item--hidden", "carousel__item--before-visible");
    setTimeout(()=>{
      this.element.classList.replace("carousel__item--before-visible", "carousel__item--visible");
    }, 200)

    return true;
  }
}


class Carousel {  
  
  constructor(element, args = {}){
    this.element = element;
    this.items = [];
    this.interval = null;
    this.durationLoop = 6000;
    this.args = args;

    var items = this.element.querySelectorAll(".carousel__item");
    items.forEach((item, rank) => {
      var item = new CarouselItem(item, rank);
      if( rank == 0 ){
        item.show();
      } else {
        item.hide();
      }
      this.items.push(item)
    })

    this.current = this.items[0] ? 0 : null;

    this.initLoop();
  }

  get nextItem() {
    return this.items[this.current + 1] ? this.items[this.current + 1] : this.items[0]
  }

  get currentItem(){
    return this.items[this.current];
  } 

  initLoop(){
    this.interval = setInterval(()=>{
      this.next();
    }, this.durationLoop)
  }

  next(){
    var success = this.currentItem.hide();
    if( this.args.onChange ) this.args.onChange.call(this);
    if( success ){
      this.nextItem.show();  
      this.current = this.nextItem.rank;
    } else {
      console.warn("Cannot hide");
    }
  }
} 

export default {
  init: function(){
    var carousels = document.querySelectorAll(".carousel");

    var titleCarousel = document.querySelector("#carousel-title");
    var photoCarousel = document.querySelector("#carousel-photo");

    if( titleCarousel && photoCarousel ){
      new Carousel(titleCarousel, {
      })
      new Carousel(photoCarousel, {
        onChange: ()=>{
          console.log("helllo")
        }
      })
    }

  }
}
