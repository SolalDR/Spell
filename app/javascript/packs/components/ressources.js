var RessourcesForm = {
  proto: `<div class="ressources__field ressources__field--added" data-index="{index}">
      <input name="book[ressources_attributes][{index}][file]" id="book_ressources_attributes_{index}_file" type="file">
      <label for="book_ressources_attributes_{index}_name">Name</label>
      <input value="" name="book[ressources_attributes][{index}][name]" id="book_ressources_attributes_{index}_name" type="text">
      <button class="ressources__field-remove">Remove Child</button>
    </div>`,

  initItem: function(element) {
    var index = element.getAttribute("data-index");
    var destroyInput = element.querySelector("#" + this.namespace + "_ressources_attributes_" + index + "__destroy");
    var removeBtn = element.querySelector(".ressources__field-remove");

    removeBtn.addEventListener("click", (e) => {
      if( !destroyInput ){
        this.elementsAdded.splice(this.elementsAdded.indexOf(element), 1);
        this.fieldsContainer.removeChild(element);
        this.reindex();
      } else {
        destroyInput.value = element.classList.contains("ressources__field--destroy") ? false : true
        element.classList.toggle("ressources__field--destroy")
      }    
      e.preventDefault();
    })
  },

  reindexSingle: function(element, rank){
    element.setAttribute("data-index", rank);
    var reg = new RegExp(this.namespace+"\[ressources_attributes\]\[(\d+?)\]");
    var inputs = element.querySelectorAll("input");
    inputs.forEach(input => {
      console.log(input, input.name);
      input.name = input.name.replace(reg, this.namespace + "[ressources_attributes]["+rank+"]")
    });
  },

  reindex: function() {
    for(var i=0; i<this.elementsAdded.length; i++){
      this.reindexSingle(this.elementsAdded[i], i);
    }
  },
 
  addRessource: function() {
    var index = this.count;

    var html = this.proto.replace(/{index}/g, index);
    var fragment = document.createElement("fragment");
    fragment.innerHTML = html;
    var element = fragment.firstChild;

    this.elementsAdded.push(element);
    this.fieldsContainer.appendChild(element);

    this.initItem(element);

    this.count++;
  },

  init: function() {
    this.element = document.querySelector(".ressources");

    if( this.element ){
      this.namespace = this.element.getAttribute("data-namespace");
      this.fields = this.element.querySelectorAll(".ressources__field");
      this.fieldsContainer = this.element.querySelector(".ressources__fields");
      this.addBtn = this.element.querySelector(".ressources__add");
      this.count = this.fields.length; 
      this.elementsAdded = [];

      for(var i=0; i<this.fields.length; i++)
        this.initItem(this.fields[i]);

      this.addBtn.addEventListener("click", (e) => {
        this.addRessource();
        e.preventDefault();
      })
    }
  }
}


export default RessourcesForm; 
