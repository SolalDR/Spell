import * as Matter from "matter-js";
import {SpeechRecognition} from "js-bard"; 

export default {

  init: function(canvas) {
    this.canvas = canvas;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.speechRecognition = new SpeechRecognition();

    // create engine
    this.engine = Matter.Engine.create({});
    this.world = this.engine.world;

       // create renderer
    this.renderer = Matter.Render.create({
        canvas: this.canvas,
        engine: this.engine,
        options: {
            width: window.innerWidth,
            height: window.innerHeight - 70,
            showAngleIndicator: false,
            wireframes: false,
            backround: "#FFFFFF"
        }
    });

    this.canvas.style.backround = "#FFF";
    Matter.Render.run(this.renderer);

    // create runner
    this.runner = Matter.Runner.create();
    Matter.Runner.run(this.runner, this.engine);

    this.registerCommands();
    this.initMouseConstraint();
    this.genBoundaries();
    this.initListener();
    this.genStack();
  },

  registerCommands: function(){
    var self = this;

    this.commands = {};
    var words = JSON.parse(document.querySelector("#dictionnary-storage").innerHTML);
    words.forEach(word => {
      this.commands[word.name.toLowerCase()] = {
        path: word.path,
        synonymous: word.config.synonymous,
        options: word.config.options
      }
    })

    for(var command in this.commands){
      (function(speech, command, name){
        speech.addCommand(name, () => {
          self.addComposite(command.path, command.options);  
        }, true)

        command.synonymous.forEach(word => {        
          speech.addCommand(word, () => {
            self.addComposite(command.path, command.options);  
          }, true)
        })
      })(this.speechRecognition, this.commands[command], command);
    }
    

    this.commands.gros = function(){
      if( this.currentEl ) {
        this.currentEl.render.sprite.xScale *= 1.5;
        this.currentEl.render.sprite.yScale *= 1.5;
        Matter.Body.scale(this.currentEl, 1.5, 1.5)
      }
    }

    this.commands.petit = function(){
      if( this.currentEl ) {
        this.currentEl.render.sprite.xScale *= 0.7;
        this.currentEl.render.sprite.yScale *= 0.7;
        Matter.Body.scale(this.currentEl, 0.7, 0.7)
      }
    }

    this.speechRecognition.addCommand("gros", ()=>{ this.commands.gros.call(this);})
    this.speechRecognition.addCommand("petit", ()=>{ this.commands.petit.call(this);})
  },

  executeAction: function(word) {
    this.commands[word].call(this);
  },


  initMouseConstraint: function(){
    // add mouse control
    this.mouse = Matter.Mouse.create(this.renderer.canvas)
    var mouseConstraint = Matter.MouseConstraint.create(this.engine, {
        mouse: this.mouse,
        constraint: {
            stiffness: 0.2,
            render: {
                visible: false
            }
        }
    });
    Matter.World.add(this.world, mouseConstraint);
    this.renderer.mouse = this.mouse;
  },

  genBoundaries: function() {
    var options = {
      isStatic: true
    }
    this.world.bodies = [];

    this.boundaries = [
        Matter.Bodies.rectangle(window.innerWidth/2, window.innerHeight-70, window.innerWidth, 5, options),
        Matter.Bodies.rectangle(-5, 0, 5, 2*window.innerHeight, options),
        Matter.Bodies.rectangle(window.innerWidth, 0, 5, 2*window.innerWidth, options),
        Matter.Bodies.rectangle(window.innerWidth/2, window.innerHeight-20, window.innerWidth, 50, options)
    ];

    // these static walls will not be rendered in this sprites example, see options
    Matter.World.add(this.world, this.boundaries);
  },


  execute: function(string){
    var words = string.split(/\s+?/);
    for(var i in words){
      if(this.commands[words[i]]) {
        if( this.commands[words[i]].path ){
          this.addComposite(this.commands[words[i]].path, this.commands[words[i]].options);  
        } else {
          this.executeAction(words[i]);  
        }
      }
    }
  },

  initListener: function(){
    window.addEventListener("resize", ()=>{
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;

      Matter.Body.setPosition(this.boundaries[0], Matter.Vector.create(window.innerWidth/2, window.innerHeight-70))
      Matter.Body.setPosition(this.boundaries[2], Matter.Vector.create(window.innerWidth, 0))
      Matter.Body.setPosition(this.boundaries[3], Matter.Vector.create(window.innerWidth/2, window.innerHeight-70))
      
      this.renderer.options.width;
    })
  },


  genStack: function(){
    this.mainStack = Matter.Composites.stack(20, 20, 0, 0, 0, 0, function(x, y) {});
    Matter.World.add(this.world, this.mainStack);
  },

  addComposite(file = "boss.png", options = {}) {
    options.width = options.width ? options.width : 100;
    options.height = options.height ? options.height : 200;
    options.x = options.x ? options.x : 20;
    options.y = options.y ? options.y : 20;
    options.xScale = options.xScale ? options.xScale : 1;
    options.yScale = options.yScale ? options.yScale : 1;

    var render = {
      sprite: {
        texture: file,
        xScale: options.xScale,
        yScale: options.yScale
      }
    }

    if( options.path ){
      var vertices =  Matter.Vertices.fromPath(options.path, 30);
      var composite = Matter.Bodies.fromVertices(options.x, options.y, vertices, { render: render });
    } else {
      var composite = Matter.Bodies.rectangle(options.x, options.y, options.width, options.height, { render: render });
    }
    this.currentEl = composite;

    Matter.World.add(this.world, composite)
    // Matter.Composite.add(this.mainStack, composite);

    if(options.constraint){
      var x, y; 
      if( options.constraint.x && options.constraint.y ){
        x = options.constraint.x[0] ? (Math.random()*(options.constraint.x[1] - options.constraint.x[0]) + options.constraint.x[0])*window.innerWidth : options.constraint.x
        y = options.constraint.x[0] ? (Math.random()*(options.constraint.y[1] - options.constraint.y[0]) + options.constraint.y[0])*window.innerWidth : options.constraint.y
      }

      console.log(x, y);

      var constraint = Matter.Constraint.create({
          pointA: { x: x, y: y },
          bodyB: composite,
          pointB: { x: -10, y: -7 },
          stiffness: 0.001,
          damping: 0.05,
          length: 1,
          render: {
            visible: false
          }
      });

      Matter.World.add(this.world, constraint)

    }

  }
}
