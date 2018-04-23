class TreeItem {

  constructor(element) {
    this.element = element;
    this.id = element.id;
    this.children = [];

  }

  generateLinks(items) {
    var childrenIndex = this.element.getAttribute("data-children").split(",");
    
    for(var i=0; i<items.length; i++)
    for(var j=0; j<childrenIndex; j++)
      if( items[i].id == "fragment-"+childrenIndex[j] )
        this.children.push(items[i])

    console.log(this.children)
  }

}

class Tree {
  
  constructor(element) {
    this.element = element;
    this.items = [];

    console.log("Hello")
    this.generateItems();
  }

  generateItems() {
    var elements = document.querySelectorAll(".tree__item");
    elements.forEach(element => this.items.push(new TreeItem(element)))

    this.items.forEach(item => item.generateLinks(this.items))


  }

}

export default Tree;
