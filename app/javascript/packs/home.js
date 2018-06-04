import Scrollable from "./components/Scrollable.js";
import Timeline from "./components/Timeline.js"
import Smoothscroll from "./smoothScroll.js"

export default {
  init: function(){

    var home = document.querySelector(".home")
    if (home) { 
      Smoothscroll.init();
      console.log(Smoothscroll)
      Scrollable.initialize();
      Timeline.init(document.querySelector(".timeline"));
    }
  }
}
