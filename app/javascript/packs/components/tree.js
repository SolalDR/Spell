var config = {
  step: {
    x: 250,
    y: 250
  },
  offset: {
    x: 400,
    y: 200
  },
  random: {
    x: 40,
    y: 10
  }
}


class TreeItem {

  constructor(element, tree) {
    this.element = element;
    this.id = element.id;
    this.rank = parseInt(element.id.match(/fragment-(\d+)/)[1])
    this.children = [];
    this.ramifications = [];
    this.parents = [];
    this.tree = tree;
  }

  generateLinks(items) {
    var childrenIndex = this.element.getAttribute("data-children").split(",");
    for(var i=0; i<items.length; i++) {
      for(var j=0; j<childrenIndex.length; j++){
         if( items[i].id == "fragment-"+childrenIndex[j] ) {
          this.children.push(items[i])
          items[i].parents.push(this)
          items[i].element.setAttribute("data-parents", items[i].parentString)
        }
      }
    }
  }

  generateRamification(children) {
    var diff = {
      x: children.coord.x - this.coord.x,
      y: children.coord.y - this.coord.y
    }
    var width = Math.sqrt(diff.x**2 + diff.y**2);
    var dot = diff.x / width;
    var angle = Math.acos(dot)/Math.PI*180; 
    if( diff.y < 0 ) angle *= -1;
    angle = Math.round(angle * 100) / 100;


    var element = document.createElement("span");
    element.className = "tree__item-ramification";

    element.style.left = this.coord.x + this.element.offsetWidth/2 + "px";
    element.style.top = this.coord.y + "px";
    element.style.width = width + "px";
    element.style.transform = `rotate(${angle}deg)`;

    this.tree.ramificationContainer.appendChild(element)

  }

  generateRamifications() {
    for(var i=0; i<this.children.length; i++){
      this.generateRamification(this.children[i]);
    }
  }

  set position(position) {
    this._position = position;
    this.updateStyle();
  }

  get position() {
    return this._position;
  }


  get depth() {
    var tmpChildren = this;
    var count = 0;
    while(tmpChildren.parents[0]) {
      tmpChildren = tmpChildren.parents[0]; 
      count++;
    }
    return count;
  }

  get parentString() {
    var str = '';
    this.parents.forEach(parent => str += parent.rank + ",")
    str = str.replace(/(.+),$/, "$1")
    return str;
  }

  updateStyle() {
    var yLength = this.tree.grid[this.position[0]].length; 
    var yHeight = (yLength - 1)*config.step.y;

    this.element.style.left = config.offset.x + this.position[0]*config.step.x + Math.random()*config.random.x + "px";
    this.element.style.top = `calc(45% - ${yHeight/2 - this.position[1]*config.step.y + Math.random()*config.random.y}px)`;

    this.coord = {
      x: this.element.offsetLeft,
      y: this.element.offsetTop
    }
  }

}

class Tree {
  
  constructor(element) {
    this.element = element;
    this.items = [];
    this.container = this.element.querySelector(".tree__container");
    this.ramificationContainer = document.querySelector(".tree__ramifications");
    this.generateItems();
    this.generateGrid();
    this.setPositions();
  }

  setPositions() {
    for(var i=0; i<this.grid.length; i++){
      for(var j=0; j<this.grid[i].length; j++){
        this.grid[i][j].position = [i, j];
      }
    }

    var maxLeft = 0; 

    this.items.forEach((item)=>{
      item.generateRamifications()
      if( item.coord.x > maxLeft ){
        maxLeft = item.coord.x
      }
    });
    this.container.style.width = maxLeft + config.offset.x*2 + "px";

  }

  generateGrid() {
    this.grid = []; 
    for(var i=0; i<this.items.length; i++){
      if( !this.grid[this.items[i].depth] )
        this.grid[this.items[i].depth] = [];
      this.grid[this.items[i].depth].push(this.items[i]);
    }
  }

  generateItems() {
    var elements = document.querySelectorAll(".tree__item");
    elements.forEach(element => this.items.push(new TreeItem(element, this)))
    this.items.forEach(item => item.generateLinks(this.items))
  }
}

export default Tree;
