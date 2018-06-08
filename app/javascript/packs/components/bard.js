import WordPanel from "./bard/WordPanel.js";
import SettingsPanel from "./bard/SettingsPanel.js";
import HelpManager from "./bard/HelpManager.js";
import MenuManager from "./bard/MenuManager.js";
import CustomizationManager from "./bard/CustomizationManager.js";

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
      this.book.on("start", ()=>{
        console.log("------------", this.book.config)
        WordPanel.init(document.querySelector("#word-panel"));
        SettingsPanel.init(document.querySelector("#settings-panel"), this);
        MenuManager.init(this);
        HelpManager.init(this);
        CustomizationManager.init(this);
        this.initListener();   
      })  
    }
  }
}
