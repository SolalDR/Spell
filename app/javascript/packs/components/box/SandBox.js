
import * as Matter from "matter-js";


export default {

  init: function(canvas) {
    this.canvas = canvas;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

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
    this.commands = {
      dragon: { path: "boss.png", options: { width: 926, height: 486, path: "22.9768814 211.077592 155.222018 199.168168 380.914645 161.942641 599.351819 32.4986206 795.760614 0.900280312 882.482929 32.4986206 924.162793 179.70384 908.110961 226.293456 648.648973 261.890718 613.844009 394.734757 554.396707 484.894522 259.443513 484.894522 174.418088 373.430051 1.09198946 350.297446 1.09198946 252.395619" }},
      boite: { path: "boite.png", options: { width: 100, height: 100, xScale: .5, yScale: .5 }},
      fusee: { path: "fusee.png", options: { width: 100, height: 200 }},
      etoile: { path: "etoile.png", options: { width: 100, height: 100, constraint: {
        x: [0.1, 0.9],
        y: [0.05, 0.0]
      }}}
    };
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
        Matter.Bodies.rectangle(window.innerWidth/2, window.innerHeight-70, window.innerWidth, 50, options)
    ];

    // these static walls will not be rendered in this sprites example, see options
    Matter.World.add(this.world, this.boundaries);
  },

  execute: function(name){
    var words = name.split(/\s+?/);
    console.log(words);
    for(var i in words){
      if(this.commands[words[i]]) {
        this.addComposite(this.commands[words[i]].path, this.commands[words[i]].options);
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
        texture: '/images/'+file,
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
