// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.
//
// To reference this file, add <%= javascript_pack_tag 'application' %> to the appropriate
// layout file, like app/views/layouts/application.html.erb

// import 'babel-polyfill'
import Header from "./components/header.js"
import Tree from "./components/tree.js"
import * as THREE from "three";
import * as Bard from "./vendor/Bard/src/Bard.js"

// window.Bard = Bard;
window.loadScriptAsync = function(uri) {
  return new Promise((resolve, reject) => {

    var tag = document.createElement('script');
    tag.src = uri;
    tag.async = true;
    tag.onload = () => {
      resolve();
    };

    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  });
}



// Custom Fragment
class StartFragment extends Bard.Fragment {

  constructor() { 
    super();
  }

  start() {
    
    this.addSpeechRecognition();
    this.addSoundManager();
    
    /**
     * SOUNDS
     */
    var forest = this.soundManager.load("forest", "./examples/sounds/forest_ambiance.mp3");
    var rocketLaunch = this.soundManager.load("forest", "./examples/sounds/rocket_launch_start.mp3");
    forest.on("load", () => {
      console.log("Load")
      forest.start();
    })

    /**
     * ELEMENTS
     */
    this.rocket = this.addElement(
      Bard.MeshElement.fromObj({path:"./src/assets/obj/rocket.obj"})
    );
    
    var text = this.addElement(
      new Bard.TextElement({
        nodes: [
          "Tout le monde a mis sa <span>ceinture de sécurité</span> et est bien installé <span data-speech='next'>dans le cockpit</span>",
          "Il ne reste plus qu’à <span>démarrer la fusée</span>. <span data-speech='rocket-fly'>vers l'infini et l'au-delà</span>.",
        ],
        align: "bottom-left",
        position: { x: "40px", y: "-20px" },
        name: "mainText"
      })
    );

    for (let i = 0; i < 5; i++) {
      this.addElement(
        Bard.MeshElement.fromObj({ 
          path: "./src/assets/obj/tree.obj", 
          scale: 0.04, 
          position: { 
            x: Math.random() * 10 + (i * 20) - 40, 
            y: 0, 
            z: Math.random() * -30 - 3 } 
        })
      );
    }
    
    this.floor = this.addElement(new Bard.FloorElement({}))
    this.stars = this.addElement(new Bard.StarsElement({}));
    
    /**
     * ACTIONS
     */
    this.addAction("rocket-fly", (e) => {
      this.rocket.anims.push(new Bard.Animation({
        duration: 9000,
        onProgress: (advancement, time) => {
          var easeTime = Bard.Easing.easeInQeight(advancement)
          this.rocket.mesh.position.x = Math.sin(easeTime) * 100.
          this.rocket.mesh.position.y = easeTime * 200
          this.rocket.mesh.rotation.x = Math.cos(time*200)/2
          
          this.rocket.mesh.scale.x = 1 - easeTime
          this.rocket.mesh.scale.y = 1 - easeTime
          this.rocket.mesh.scale.z = 1 - easeTime
          this.book.scene.camera.lookAt(this.rocket.mesh.position)
        }
      }))
      rocketLaunch.start();
    })

    this.addAction("next",  e => text.next())

    for(var i=0; i<this.elements.length; i++)
      this.elements[i].display();

    this.initListeners()
    this.afterStart();  
  }

  initListeners() {     
  }

  render(){
    this.beforeRender();
    
    for(var i=0; i<this.elements.length; i++){
      if(this.elements[i].type == "Mesh"){
        this.elements[i].render(this.clock);
      }
    }

    this.afterRender();
  }  
}



window.addEventListener("load", ()=>{

  Header.init();
  if( document.querySelector(".tree") )
    var tree = new Tree(document.querySelector(".tree"));

  console.log("Load application.js");

  if( document.querySelector("canvas") ){
    window.book = new Bard.Book();
    console.log("Start book application.js");

    book.addFragment(new StartFragment());
    book.start();
  }

})
