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
    this.colors = ["red", "pink", "blue", "pink"];
    
    this.letters.forEach( letter => {
      console.log(this.letters)
      letter.setAttribute("data-color", this.colors[Math.floor(Math.random()*this.colors.length)]);
      letter.style.color = letter.getAttribute("data-color");
      letter.addEventListener("mouseenter", ()=>{
        letter.style.transitionDuration = ".4s";
        letter.style.color = "black";
        setTimeout(()=>{
          letter.style.color = letter.getAttribute("data-color");
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
