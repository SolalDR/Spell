export default {

  initListener: function(){
    var self = this;
    this.soundInput.addEventListener("input", function() {
      self.manager.book.soundManager.volume = this.value; 
      self.manager.book.config.sound.gain = this.value; 
    })

    this.soundInput.addEventListener("change", function(){
      self.manager.updateConfig();
    })
  },

  init: function(element, manager){
    this.manager = manager;
    this.element = element;
    this.configInputs = {};
    if( this.element ){
      this.soundInput = this.element.querySelector("#sound-gain")
      this.resolutionInput = this.element.querySelector("#quality");
      this.qualityInput = this.element.querySelector("#speech-recognition");
      this.voiceInput = this.element.querySelector("#speech-recognition");
      this.initListener()
    }
  }

}
