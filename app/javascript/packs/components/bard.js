import WordPanel from "./bard/WordPanel.js";
import SettingsPanel from "./bard/SettingsPanel.js";


export default {


  set dictionnary(dictionnary) {
    this._dictionnary = dictionnary; 
  },

  get dictionnary(){
    return this._dictionnary;
  },

  manageDictionnary: function(textElement){
    textElement.on("word:click", function(e){
      WordPanel.displayWord(e);
    })
  },

  updateConfig: function() {
    new Http({
      url: `/book_marks/${this.book.bookMark}/edit_config`, 
      auto: true,
      params: {
        config: JSON.stringify(this.book.config),
        authenticity_token: window._token
      },
      method: "post"
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
      SettingsPanel.init(document.querySelector("#settings-panel"), this);
      this.initListener();    
    }
  }
}