class Letter {
  
  constructor (element, letter) {
    this.letter = letter;
    this.element = element;

    if( this.element ){
      this.group = this.element.querySelector(".letter-svg__group");
      this.width = this.element.viewBox.baseVal.width;  
      this.height = this.element.viewBox.baseVal.height;  
    }
  }
}


class Playground {
  
  constructor(element) {
    this.element = element;
    this.width = 0;
    this.letters = [];
    this.config = {
      gutter: 10,
      duration: 1.2,
      size: 50,
      padding: 30,
      top: 120
    }
    this.rat = 120/this.config.size;

    this.initEvents();
    this.setViewBox();
  }

  setViewBox() {
    this.element.viewBox.baseVal.width = window.innerWidth*this.rat;
    this.element.viewBox.baseVal.height = window.innerHeight*this.rat;
  }

  initEvents() {
    window.addEventListener("resize", ()=>{
      this.setViewBox();
       this.refresh();
    });
  }

  static getRandomTransform() {
    var angle = Math.random()*Math.PI;
    var distance = Math.random()*300 + 600

    return {
      rotate: Math.round((30 + Math.random()*330)*((Math.floor(Math.random()*2))*2 - 1)),
      translate: {
        x: Math.round(Math.cos(angle)*distance),
        y: Math.round(Math.sin(angle)*distance)
      }
    } 
  }

  get currentString() {
    return this.letters.map(l => { return l.reference.letter } ).join("");
  }

  transitionIn(letter) {
    letter.components.forEach((item, rank) => {
      var random = Playground.getRandomTransform();
      item.style.transform = `translateX(${random.translate.x}px) translateY(${random.translate.y}px) rotate(${random.rotate}deg)`
      
      var bbox = item.getBBox();
      item.style.transformOrigin = `${bbox.x + bbox.width/2}px ${bbox.y + bbox.height/2}px`;
      item.style.opacity = 0
      item.style.transition = "all "+this.config.duration+"s ease-in-out";
    }) 

    setTimeout(() => {
      letter.components.forEach(item => {
        item.style.transform = ""
        item.style.opacity = 0.5
      })
    }, 20)
  }

  transitionOut(letter){
    letter.components.forEach((c, rank) => {
      var random = Playground.getRandomTransform();
      c.style.transform = `translateX(${random.translate.x}px) translateY(${random.translate.y}px) rotate(${random.rotate}deg)`;
      c.style.opacity = 0;
    })
  }


  addLetter(letter) {
    var letterAdd = { reference: letter, element: null, components: [] }

    if( letter.element ) {
      letterAdd.element = letter.group.cloneNode(true)
      letterAdd.components = letterAdd.element.querySelectorAll(".letter-svg__element");
      letterAdd.element.setAttribute("transform", `translate(${this.config.padding*this.rat + this.width}, ${this.config.top*this.rat})`);
      this.element.appendChild(letterAdd.element);
      this.transitionIn(letterAdd);
    }

    this.letters.push(letterAdd);
    this.width += letter.width + this.config.gutter; 
  }

  removeLetter() {
    var letter = this.letters[this.letters.length - 1];
    this.letters.splice(this.letters.length - 1, 1);
    this.width -= (letter.reference.width + this.config.gutter);

    if( letter.element ){
      this.transitionOut(letter);
      setTimeout(()=>{
        this.element.removeChild(letter.element);
      }, this.config.duration * 1000 + 300)
    }
    
  }

  refresh(){
    this.letters.forEach(letter => this.transitionOut(letter) )
    setTimeout(()=>{
      this.letters.forEach( letter => {
        if(letter.element) this.element.removeChild(letter.element) 
      });
      this.letters = [];
      this.width = 0;
      console.log(this);
    }, this.config.duration * 1000 + 300)
  }
}


export default {  

  alphabet: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"],
  
  letters: {},

  storeLetters: function(){
    this.alphabet.forEach(letter => {
      this.letters[letter] = new Letter(document.querySelector("#letter-"+letter.toUpperCase()), letter); 
    })

    var space = new Letter();
    space.width = 80;
    space.height = 120;
    space.letter = " ";
    this.letters[" "] = space;
  },

  initEvents: function() {
    window.addEventListener("keydown", (e) => {

      var letter = e.key;
      switch(letter){
        case "é" : letter = "e"; break;
        case "è" : letter = "e"; break;
        case "ê" : letter = "e"; break;
        case "à" : letter = "a"; break;
        case "î" : letter = "i"; break;
        case "ï" : letter = "i"; break;
      }

      if( this.letters[letter] ) this.playground.addLetter(this.letters[letter]);
      
      if( e.keyCode == 13 ){
        this.playground.refresh();
        this.onEnter.call(this, this.playground.currentString);
        e.preventDefault();
        return false;
      }

      if (e.keyCode == 8) {
        this.playground.removeLetter();
        e.preventDefault();
        return false;
      }
    })

  },

  init: function(args = {}){
    this.playground = new Playground(document.querySelector("#alphabet__sandbox"));
    this.alphabetStorage = document.querySelector("#sandbox .alphabet__storage");

    if( this.playground && this.alphabetStorage ){
      this.storeLetters();
      this.initEvents();
    }

    if( args.onEnter ) this.onEnter = args.onEnter;
  }

}
