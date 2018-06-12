class ColoredElement {
  constructor(element){
    var splitedText = element.innerHTML.split("");
    
    var str = "";
    splitedText.forEach(letter => {
      str += "<span class='colored__letter'>" + letter + "</span>";
    })

    element.innerHTML = str

    this.letters = element.querySelectorAll(".colored__letter");
    this.initEvents();
  }

  initEvents(){
    this.colors = ["#143adb", "#cae6fc", "#fcca9", "#6be8c2", "#f5b57", "#fe600", "#031347"];
    
    this.letters.forEach( letter => {
      letter.setAttribute("data-color", this.colors[Math.floor(Math.random()*this.colors.length)]);
      letter.style.color = "#000"
      letter.addEventListener("mouseenter", ()=>{
        letter.style.transitionDuration = ".4s";
        letter.style.color = letter.getAttribute("data-color");
        setTimeout(()=>{
          letter.style.color = "#000";
        }, 2500)
      })
    })
  }
}

export default {
  init: function(){
    var elements = document.querySelectorAll(".colored");
    this.coloredElement = [];
    elements.forEach(element => {
      this.coloredElement.push(new ColoredElement(element));
    })
  }
}
