import WordPanel from "./bard/WordPanel.js";


export default {


  set dictionnary(dictionnary) {
    this._dictionnary = dictionnary; 
  },

  get dictionnary(){
    return this._dictionnary;
  },

  manageDictionnary: function(textElement){
    textElement.on("word:click", function(e){
      WordPanel.displayWord(e.word);
    })
  },

  initListener: function(){
    var self = this;
    this.book.on("fragment:start", function(fragment){
      for(var i=0; i<fragment.elements.length; i++){
        if( fragment.elements[i].type == "text" && self.book.dictionnary ){
          self.manageDictionnary(fragment.elements[i]);
        }
      }
    })
  },
  
  init: function(book){
    this.book = book;
    if( this.book ){
      WordPanel.init(document.querySelector("#word-panel"));
      this.initListener();    
    }
  }
}
