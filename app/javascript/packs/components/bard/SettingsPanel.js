export default {

  initListener: function(){
    var self = this;

    /************** Participation input ***************/
    this.participationInput.value = this.manager.book.config.variables.participation; 
    this.participationInput.addEventListener("change", function(){
      self.manager.book.config.variables.participation = this.checked; 
      self.manager.updateConfig();
    })

    /************** Voice recognition ***************/
    this.voiceInput.value = this.manager.book.config.variables.voice_recognition;
    this.voiceInput.addEventListener("change", function(){
      self.manager.book.config.variables.voice_recognition = this.checked; 
      self.manager.updateConfig();
    })

    /************** Quality input ***************/
    this.resolutionInput.value = this.manager.book.config.variables.display_quality; 
    this.resolutionInput.addEventListener("change", function(){
      self.manager.book.config.variables.display_quality = this.checked; 
      self.manager.updateConfig();
    })

    /************** Gain ***************/

    this.soundInput.value = this.manager.book.config.variables.sound_gain;
    self.manager.book.soundManager.volume = this.soundInput.value;
    this.soundInput.addEventListener("input", function() {
      self.manager.book.soundManager.volume = this.value; 
      self.manager.book.config.variables.sound_gain = this.value; 
    });

    this.soundInput.addEventListener("change", function(){
      self.manager.updateConfig();
    });

  },

  init: function(element, manager){
    this.manager = manager;
    this.element = element;
    this.configInputs = {};
    if( this.element ){
      this.soundInput = this.element.querySelector("#sound-gain")
      this.resolutionInput = this.element.querySelector("#quality");
      this.participationInput = this.element.querySelector("#child-participation");
      this.voiceInput = this.element.querySelector("#speech-recognition");
      this.initListener()
    }
  }

}
