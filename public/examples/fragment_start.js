import * as Bard from "./../src/bard.js"

export default class Fragment1 extends Bard.Fragment {

  constructor() {
    super()
    this.name = "Start fragment"
  }

  init() {

    this.addSpeechRecognition();
    this.addSoundManager();
    this.winWidth = window.innerWidth
    this.winHeight = window.innerHeight
    this.aspect = window.innerWidth/window.innerHeight
    this.fondPerdu = (this.winWidth/17)/this.aspect
    /**
     * SOUNDS
     */
    var forest = this.soundManager.load("forest", "/examples/sounds/forest_ambiance.mp3", {
      loop: true,
      volume: 0
    });
    var rocketLaunch = this.soundManager.load("rocket", "/examples/sounds/rocket_launch.mp3");

    var recorder = new Bard.Recorder(this.soundManager);
    recorder.init();
    recorder.on("record:stop", (event) => {
      this.soundManager.load("record", event.buffer, { loop: true, effect: "distortionCurve", effectIntensity: 0 }); 
      this.soundManager.sounds.record.start();
    })
    window.recorder = recorder;
    /***
     * Fragment variables
     */
    this.scene1 = true
    this.scene2 = false
    this.scene3 = false
   
    this.scenesAttributes = {
      one: {
        position: {
          x: 0,
        }
      },
      two: {
        position: {
          x: this.winWidth/this.aspect,
        }
      },
      three: {
        position: {
          x: (this.winWidth*2/this.aspect),
        }
      },
    }
    
    this.currentScene = this.scenesAttributes.one
    /**
     * ELEMENTS
     */

    // this.char = this.addElement(new Bard.CharacterElement({}))
    this.screenSize = this.book.scene.camera.right*2

    var text = this.addElement(
      new Bard.TextElement({
        nodes: [
          "Un soir, alors qu’il observe le ciel étoilé d’une belle nuit d’été… Une étrange comète traverse l’atmosphère, pour disparaître dans un bois <span data-speech='next'>non loin de</span> là.",
          " Il faut que j’aille voir cela de plus près ! “ s’exclame notre héros. Mais avant de s’aventurer dehors, il doit d’abord <span data-speech='scene-2'>être équipé</span>.",
          "Le voilà fin prêts ! Guidé par la lumière  de la comète qui s’est écrasée, tu décides d'aller vers la forêt… Soudain, à l’orée d’une clairière, des voix lui parviennent. Qui peut bien se cacher <span data-speech='charInteraction'>dans les arbres</span> ?",
          "Touche ton héros pour qu’il fasse peur aux créatures et qu’elles sortent de leur cachette !",
          "Bien joué, deux créatures viennent d’apparaître dans les feuillages, Trouve-les et Touche-les pour les faire parler. ",
          "Dans un langage codé, l’une des créatures prend la parole. <br> Hélas son message est incompréhensible… La pierre de traduction s’est égarés dans la forêt. Retrouve la pour l’aider à se faire comprendre",
          "Bien joué ! Tu as débloqué la pierre de traduction, voici les <span data-speech='next'>paroles de la créature</span>.",
          "Nous sommes les frères Ocelot et Caracal de la lointaine planète Mars. Là-bas, un cataclysme menace nos jours. Par pitié, <span data-speech='next'>aidez-nous</span> !",
          "Les frères Ocelot et Caracal ont besoin d’aide, un terrible monstre sème la terreur sur <span data-speech='next'>leur planète</span>.",
          " Ceux-ci, ayant entendu parler desderniers exploits de tes exploits ont décidé de traverser l’univers pour te proposer une <span data-speech='scene-3'>nouvelle aventure</span>.",
          "Ayant accepté d’apporter ton aide aux deux créatures, celles-ci te guident jusqu’à leur <span data-speech='next'>fusée</span>.",
          "“Voici le vaisseau qui nous emmènera sur notre planète !” lui dit l’un des frères. “Seul Ocelot peut <span data-speech='next'>le conduire</span>.”",
          "Malheureusement, l'atterrissage a été un peu rude, et nous avons partiellement perdu la mémoire. Nous ne savons plus quel sont nos <span data-speech='next'>noms respectifs</span>… ”",
          "Pour savoir lequel des deux sait conduire la fusée, interroge-la en prononçant la formule magique <button data-speech='next' id='deux est' class='recorder'></button> : “Bel engin de métal, lequel des deux est Ocelot ?”",
          "La fusée est joueuse et ne donne pas d’informations si facilement mais elle accepte tout de même de te révéler comment <span data-speech='next'>le trouver</span>. ",
          "Ocelot à une jambe de moins que son frère, t’indique-t-elle. Pourras-tu <span data-speech='mayClickOcelot'>le trouver</span> ?",
          "Bien joué ! La fusée a de nouveau un conducteur! Mais êtes-vous fin prêts à <span data-speech='next'>partir</span> ?",
          "Touche la fusée pour partir directement ou touche Ocelot si tu veux t’assurer que la fusée est bien en état de décoller"
        ],
        align: "bottom-left",
        position: { x: "40px", y: "-20px" },
        name: "mainText",
        color: '#ffffff'
      })
    );

    this.rocket = this.addElement(new Bard.CharacterElement({
      name: "Rocket",
      clickable: true,
      morphTargets: true,
      position: {
        x:(this.winWidth*0.37/this.aspect)+this.scenesAttributes.three.position.x,
        y: this.winWidth*0.13/this.aspect,
        z: -30
      },
      rotation: {
        x:0,
        y: Math.PI,
        z:0,
      },
      scale: 300,
      visible: false,
      model: '/examples/obj/fusee/fusee.gltf'
    }))
    
    // this.characterCustomizer = this.addElement(new Bard.CharacterCustomizerElement({
    //   char: this.char,
    //   onLoad: () => {
    //     console.log("Hello")
    //   }
    // }));
  

    this.caracal = this.addElement(new Bard.CharacterElement({
      name: "caracal",
      clickable: true,
      morphTargets: false,
      visible: true,
      position: {
        x:(this.winWidth*0.15/this.aspect)+this.scenesAttributes.two.position.x,
        y: this.winWidth*0.30/this.aspect,
        z: -29
      },
      rotation: {
        x:Math.PI/2,
        y:0,
        z:0,
      },
      scale: 0.35,
      hide:true,
      model: '/examples/obj/rig-chats1.glb'
    }))

    this.ocelot = this.addElement(new Bard.CharacterElement({
      name: "ocelot",
      clickable: true,
      morphTargets: false,
      visible: true,
      position: {
        x:(this.winWidth*0.25/this.aspect)+this.scenesAttributes.two.position.x,
        y: this.winWidth*0.33/this.aspect,
        z: -29
      },
      rotation: {
        x:Math.PI/2,
        y:0,
        z:0,
      },
      scale: 0.35,
      hide:true,
      model: '/examples/obj/rig-chats1.glb'
    }))

   
    this.herbes = []
    this.plantes = []
    for(let i = 0; i< 2; i++) {
      let herbe = this.addElement(new Bard.CharacterElement({
        clickable: true,
        morphTargets: true,
        visible: true,
        position: {
          x:(this.winWidth*0.15/this.aspect)+(this.winWidth/this.aspect)+(this.winWidth*0.3*i)/this.aspect,
          y: this.winWidth*0.14/this.aspect,
          z: -29
        },
        rotation: {
          x:0,
          y:Math.PI,
          z:0,
        },
        scale: 1000,
        model: '/examples/obj/herbe-alone/herbe-alone.gltf'
      }))
      this.herbes.push(herbe)

      herbe.on('load', ()=> {
        herbe.actions[0].play()
      })

      let plante = this.addElement(new Bard.CharacterElement({
        clickable: true,
        morphTargets: true,
        visible: true,
        position: {
          x:(this.winWidth*0.15/this.aspect)+(this.winWidth/this.aspect)+(this.winWidth*0.4*i)/this.aspect,
          y: this.winWidth*0.14/this.aspect,
          z: -29
        },
        rotation: {
          x:0,
          y:Math.PI,
          z:0,
        },
        scale: 1000,
        model: '/examples/obj/plante/plante.gltf'
      }))
      this.plantes.push(plante)

      plante.on('load', ()=> {
        plante.actions[0].play()
      })

    }
  
   
    this.planes = [];
    this.clouds = [];

    this.stars = this.addElement(new Bard.StarsElement({map: '/examples/img/etoile-128.png', count: 20, group: "background"}))
    
    this.addAction('bonsoir', ()=>{
      console.log('hello')
    })

    this.planes.push(this.addElement(new Bard.PlaneElement({
      name: "plan3",
      group: "background",
      map: '/examples/scene-1/scene-1-bg.png', 
      transparent: true, 
      depth: -200}
    )))

    this.planes.push(this.addElement(new Bard.PlaneElement({
      name: "plan5", 
      group: "background",
      map: '/examples/scene-1/scene-1-plan5.png', 
      transparent: true, 
      depth: -160
    })))
    this.animatedPlanes = []

    this.animatedPlanes.push(this.addElement(new Bard.PlaneElement({
      name: "plan4",
      group: "background",
      map: '/examples/scene-1/scenes-123-parallaxe-plan4.png', 
      transparent: true, 
      depth: -120}
    )))
    
    this.animatedPlanes.push(this.addElement(new Bard.PlaneElement({
      name: "plan3",
      group: "background",
      map: '/examples/scene-1/scenes-123-parallaxe-plan3.png', 
      transparent: true, 
      depth: -80}
    )))

    this.animatedPlanes.push(this.addElement(new Bard.PlaneElement({
      name: "plan2",
      group: "background",
      map: '/examples/scene-1/scenes-123-parallaxe-plan2.png', 
      transparent: true, 
      depth: 0}
    )))

    this.animatedPlanes.push(this.addElement(new Bard.PlaneElement({
      name: "plan1",
      group: "foreground",
      map: '/examples/scene-1/scenes-123-parallaxe-plan1.png', 
      transparent: true, 
      depth: 20}
    )))

    this.planes.push(this.addElement(new Bard.PlaneElement({
      name: "degradeSol",
      group: "foreground",
      map: '/examples/scene-1/scene-1-degrade-sol.png', 
      transparent: true, 
      depth: 30,    
      displacement: 1.}
    )))
    this.planes.push(this.addElement(new Bard.PlaneElement({
      name: "degradeCiel",
      group: "foreground",
      map: '/examples/scene-1/scene-1-degrade-ciel.png', 
      transparent: true, 
      depth: 31,
    }
    )))

    for (let i = 1; i < 5; i++) {
      let cloud = this.addElement(new Bard.PlaneElement({
        name: "nuage"+i, 
        group: "background",
        map: '/examples/img/clouds/nuage'+i+'.png', 
        transparent: true, 
        depth: -200
      }));
      cloud.x = (Math.random()*60 ) - 30
      this.clouds.push(cloud);
    }

    
    
    this.pierre = this.addElement(new Bard.MeshElement({
      clickable: true,
      name: "pierre",
      position: {
        x:this.winWidth*0.83/this.aspect+this.scenesAttributes.two.position.x,
        y: this.winWidth*0.28/this.aspect,
        z: 20
      },
      mesh: new THREE.Mesh(
        new THREE.BoxGeometry( 50/this.aspect, 50/this.aspect, 1 ), 
        new THREE.MeshBasicMaterial({color: 0xF26000,opacity:0, transparent: true, depthTest: false, depthWrite: false}))
    }))


    this.char = this.addElement(new Bard.CharacterElement({
      name: "mainChar",
      clickable: true,
      morphTargets: false,
      visible: true,
      mainChar: true,
      position: {
        x:(this.winWidth*0.3/this.aspect)+this.scenesAttributes.one.position.x,
        y: this.winWidth*0.1/this.aspect,
        z: -29
      },
      rotation: {
        x:Math.PI/2,
        y:0,
        z:0,
      },
      scale: 0.65,
      model: '/examples/obj/rig-heros.glb'
    }))


    this.characterCustomizer = this.addElement(new Bard.CharacterCustomizerElement({
      character: this.char,
      selector: "#customization-panel",
      onLoad: () => {
        console.log("Hello")
      }
    }));



    this.char.on("click", ()=>{
      console.log(this.char.actions)
      if(!this.roar && this.scene2 && this.char.interactive) {
        rocketLaunch.start()
        this.roar = true

        this.char.actions[11].setLoop(THREE.LoopOnce)
        this.char.actions[11].play()

        this.executeAction('next')
        this.executeAction('displayCatHolo')
      }
    })

   
    this.ocelot.on("click",()=>{
      this.ocelotFound = true
      this.executeAction('fallOcelot')
      if(this.caracalFound  && this.ocelot.interactive) {
       
        this.executeAction('next')
        this.ocelot.interactive = false
      }
      if(this.scene3 && !this.findOcelot && this.ocelot.interactive) {
        this.findOcelot = true
        this.executeAction('next')
      }
    })

    this.caracal.on("click",()=>{
      this.caracalFound = true
      this.executeAction('fallCaracal')
      if(this.ocelotFound && this.caracal.interactive) {
       
        this.executeAction('next')
        this.caracal.interactive = false
      } 
      
    })

    this.pierre.on("click",()=>{
      if(this.caracalFound && this.ocelotFound ) {
        this.parcheminFound = true
        this.pierre.anims.push(new Bard.Animation({
          duration: 300,
          onProgress: (advancement, time) => {
            var easeTime = Bard.Easing.easeInOutQuint(advancement)
            // this.planes[i].mesh.position.x = ((advancement*(i+1))*80)+(this.book.scene.camera.top/2.)
           
            this.pierre.mesh.material.opacity = Math.max(1.-easeTime,0)
            
        }}))
        this.executeAction('next')
      }
    })

    this.rocket.on('click', ()=>{
      this.rocket.actions[3].play()
    })
    /**
     * ACTIONS
     */

    this.addAction('displayCatHolo', (e)=> {
      this.ocelot.interactive = true
      this.ocelot.anims.push(new Bard.Animation({
        duration: 1000,
        onProgress: (advancement, time) => {
          var easeTime = Bard.Easing.easeInOutQuint(advancement)
          this.ocelot.mesh.children[0].traverse((child)=> {
            if(child['material']) {
              child.material.opacity = easeTime*child.material.realOpacity
            }
          })
      }
    }))

    this.caracal.interactive = true
    this.caracal.anims.push(new Bard.Animation({
      duration: 1000,
      onProgress: (advancement, time) => {
        var easeTime = Bard.Easing.easeInOutQuint(advancement)
        // this.planes[i].mesh.position.x = ((advancement*(i+1))*80)+(this.book.scene.camera.top/2.)
      
        this.caracal.mesh.children[0].traverse((child)=> {
          if(child['material']) {
            child.material.opacity = easeTime*child.material.realOpacity
          }        
        })
      }
    }))
    })

    this.addAction('fallOcelot', (e)=> {
      this.ocelot.anims.push(new Bard.Animation({
        duration: 500,
        from: this.ocelot.mesh.position.y,
        to: this.winWidth*0.13/this.aspect,
        timingFunction: 'easeInOutQuint',
        onProgress: (advancement, time) => {
          var easeTime = Bard.Easing.easeInOutQuint(time)
          // this.planes[i].mesh.position.x = ((advancement*(i+1))*80)+(this.book.scene.camera.top/2.)
          this.ocelot.mesh.position.y = time 
        },
      })) 
    })

    this.addAction('fallCaracal', (e)=> {
      this.ocelot.anims.push(new Bard.Animation({
        duration: 500,
        from: this.caracal.mesh.position.y,
        to: this.winWidth*0.13/this.aspect,
        timingFunction: 'easeInOutQuint',
        onProgress: (advancement, time) => {
          
          var easeTime = Bard.Easing.easeInOutQuint(time)
          // this.planes[i].mesh.position.x = ((advancement*(i+1))*80)+(this.book.scene.camera.top/2.)
          this.caracal.mesh.position.y = time 
        },
      })) 
    })

    this.addAction('charWalk', (e)=> {
      this.char.anims.push(new Bard.Animation({
        duration: 6000,
        from: (-this.winWidth*0.1/this.aspect)+this.currentScene.position.x,
        to: e.args+this.currentScene.position.x,
        timingFunction: "easeOutQuad",
        onProgress: (advancement, time) => {
          var easeTime = Bard.Easing.easeOutQuad(advancement)
          // this.planes[i].mesh.position.x = ((advancement*(i+1))*80)+(this.book.scene.camera.top/2.)
          this.char.actions[5].play()
          this.char.actions[5].setEffectiveWeight(1.2-advancement)
          this.char.mesh.position.x = time
          this.char.mesh.position.y = this.winWidth*0.13/this.aspect
        },
        onFinish: ()=>{
          this.char.actions[5].stop()
          this.char.actions[8].play()
        }
      })) 
    })

    this.addAction('catsWalk', (e) => {
      e.args.element.anims.push(new Bard.Animation({
        duration: 6000,
        from: -this.winWidth*0.3/this.aspect+this.currentScene.position.x,
        to: e.args.to + this.currentScene.position.x,
        timingFunction: "easeOutQuad",
        onProgress: (advancement, time) => {
          var easeTime = Bard.Easing.easeOutQuad(advancement)
          // this.planes[i].mesh.position.x = ((advancement*(i+1))*80)+(this.book.scene.camera.top/2.)
          e.args.element.actions[1].play()
          e.args.element.actions[1].setEffectiveWeight(1.2-advancement)
          e.args.element.mesh.position.x = time
          e.args.element.mesh.position.y = this.winWidth*0.13/this.aspect
        },
        onFinish: ()=>{
          e.args.element.actions[1].stop()
        }
      }))
    })

    this.addAction('charInteraction', (e)=>{
      this.char.interactive = true
      this.executeAction('next')
    })

    this.addAction('moveMeshOnTrav', (e)=>{
      e.args.element.anims.push(new Bard.Animation({
        duration: 3500,
        from: e.args.element.mesh.position.x,
        to:  -(this.winWidth+(this.fondPerdu))/this.aspect,
        timingFunction: "easeInOutQuint",
        onProgress: (advancement, time, anim) => {
          // this.planes[i].mesh.position.x = ((advancement*(i+1))*80)+(this.book.scene.camera.top/2.)
          e.args.element.mesh.position.x = time
        },
        onFinish:()=>{
          if(e.args.walk) {
            this.executeAction('walk', {element: e.args.element, to: this.winWidth*0.43/this.aspect})
          }
        }
      }))
    })

    this.addAction('mayClickOcelot', (e)=>{
      this.ocelot.interactive = true
    })

    this.addAction("scene-2", (e)=>{
      this.scene2 = true
      this.currentScene = this.scenesAttributes.two

      this.char.anims.push(new Bard.Animation({
        duration: 3500,
        from: this.book.scene.camera.position.x,
        to:  this.currentScene.position.x,
        timingFunction: "easeInOutQuint",
        onProgress: (advancement, time, anim) => {
          // this.planes[i].mesh.position.x = ((advancement*(i+1))*80)+(this.book.scene.camera.top/2.)
          // this.char.mesh.position.x = time
          this.book.scene.cameraAnimate =true
          this.book.scene.camera.position.x = time
          // this.book.scene.camera.lookAt(time)
        },
        onFinish: () => {
          this.book.scene.cameraAnimate =false
          this.book.scene.scenePosition.x = this.currentScene.position.x

          this.executeAction('charWalk', this.winWidth*0.43/this.aspect)
          this.executeAction('next')
          this.pierre.anims.push(
            new Bard.Animation({
              duration: 3500,
              from: 0,
              to:  1,
              onProgress: (advancement, time, anim) => {
                // this.planes[i].mesh.position.x = ((advancement*(i+1))*80)+(this.book.scene.camera.top/2.)
                this.pierre.mesh.material.opacity = time
              }
            })
          )
        }
      })) 
      
      for (let i = 0; i < this.animatedPlanes.length; i++) {
        this.animatedPlanes[i].anims.push(new Bard.Animation({
          duration: 3500,
          onProgress: (advancement, time) => {
            var easeTime = Bard.Easing.easeInOutQuint(advancement)
            // this.planes[i].mesh.position.x = ((advancement*(i+1))*80)+(this.book.scene.camera.top/2.)
        
            let offset = ((this.fondPerdu*(i)))/this.aspect
            this.animatedPlanes[i].mesh.position.x = this.animatedPlanes[i].position.x - (offset*easeTime)
           
          },
          onFinish:() => {
            this.animatedPlanes[i].position.x = this.animatedPlanes[i].mesh.position.x
          }
        }))
      }
    })

    this.addAction("scene-3", (e)=>{
      this.scene3 = true
      this.rocket.mesh.visible = true
      this.currentScene = this.scenesAttributes.three

     
      this.char.anims.push(new Bard.Animation({
        duration: 3500,
        from: this.book.scene.camera.position.x,
        to:  this.currentScene.position.x,
        timingFunction: "easeInOutQuint",
        onProgress: (advancement, time, anim) => {
          // this.planes[i].mesh.position.x = ((advancement*(i+1))*80)+(this.book.scene.camera.top/2.)
          // this.char.mesh.position.x = time
          this.book.scene.cameraAnimate =true
          this.book.scene.camera.position.x = time
        },
        onFinish: () => {

          this.executeAction('charWalk', this.winWidth*0.32/this.aspect)
          this.executeAction('catsWalk', {element: this.caracal, to: this.winWidth*0.03/this.aspect})
           this.executeAction('catsWalk', {element: this.ocelot, to: this.winWidth*0.12/this.aspect})

          this.executeAction('next')
         
        }
      })) 
      
      for (let i = 0; i < this.animatedPlanes.length; i++) {
      
        this.animatedPlanes[i].anims.push(new Bard.Animation({
          duration: 3500,
          onProgress: (advancement, time) => {
            var easeTime = Bard.Easing.easeInOutQuint(advancement)
            // this.planes[i].mesh.position.x = ((advancement*(i+1))*80)+(this.book.scene.camera.top/2.)
        
            let offset = ((this.fondPerdu*(i)))/this.aspect
            this.animatedPlanes[i].mesh.position.x = this.animatedPlanes[i].position.x - (offset*easeTime)
           
          },
          onFinish:() => {
            this.animatedPlanes[i].position.x = this.animatedPlanes[i].mesh.position.x
          }
        }))
       }

      
    })

    this.addAction("transitionOut", (e) => {
     for (let i = 0; i < this.planes.length; i++) {
     
      this.planes[i].anims.push(new Bard.Animation({
        duration: 2000,
        onProgress: (advancement, time) => {
          var easeTime = Bard.Easing.easeInQeight(advancement)
          // this.planes[i].mesh.position.x = ((advancement*(i+1))*80)+(this.book.scene.camera.top/2.)
          this.planes[i].mesh.scale.x = ((easeTime*(i+1))*(100+(20*i)))+this.planes[i].width
          this.planes[i].mesh.scale.y = ((easeTime*(i+1))*(100+(20*i)))+this.planes[i].height
          
          if(advancement > 0.5) {
            this.planes[i].mesh.material.uniforms.opacity.value = 1-((advancement-0.5)*2.)
          }
        },
        onFinish:() => {
          this.runChild(0);
        }
      }))
      }
    })

    this.addAction("next",  e => text.next())

    this.on("start", ()=>{
      
      for(var i=0; i<this.elements.length; i++){
        console.log("----- Fragment: Try to add element "+this.elements[i].name)
        if( this.elements[i].autoDisplay ){
          this.elements[i].display();
        }
      }
    
      forest.on("load", ()=>{forest.start()})
      this.initListeners();

      this.waitAndAlert("chrome_exception", "next")
      this.book.on("alert", (e)=>{
      })
    })
  }
  resize() {
    this.winWidth = window.innerWidth
    this.winHeight = window.innerHeight
    this.aspect = this.winWidth/this.winHeight
  
    this.fondPerdu = (this.winWidth/17)/this.aspect
  }
  render() {
    this.beforeRender();
    
    for(var i=0; i<this.elements.length; i++){
      if(this.elements[i].type == "Mesh"){
        this.elements[i].render(this.clock);
      }
    }

    if(this.clouds.length ) {
      for (let i = 0; i < this.clouds.length; i++) {
        if(this.clouds[i].mesh) {
          this.clouds[i].mesh.position.x = (Math.sin(this.clock.elapsed/(2000.*((i*0.5)+1)))*40)+this.clouds[i].x
        }
      }
    }
    this.afterRender();
  }

  initListeners() {

  }
}
