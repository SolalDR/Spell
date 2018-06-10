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

    this.soundManager.load("terreAmbiance", "/examples/sounds/scene-1/terre-ambiance.mp3", {
      loop: true,
    })

    this.soundManager.load("comete", "/examples/sounds/scene-1/cometeSound.mp3", {
      
    })

    this.soundManager.load("foret", "/examples/sounds/scene-1/foret.mp3", {
      loop: true
    })

    this.soundManager.load("marche", "/examples/sounds/scene-1/marche.mp3", {
      
    })

    this.soundManager.load("voix", "/examples/sounds/scene-1/des-voix-lui-parviennent.mp3", {
      
    })

    this.soundManager.load("chatTombe", "/examples/sounds/scene-1/chat-qui-tombent.mp3", {
      
    })

    this.soundManager.load("feuillage", "/examples/sounds/scene-1/feuillage.mp3", {
      
    })

    this.soundManager.load("langageCode", "/examples/sounds/scene-1/langage-codes.mp3", {
      
    })

    this.soundManager.load("success", "/examples/sounds/scene-1/validation.mp3", {
      
    })

    this.soundManager.load("projection", "/examples/sounds/scene-1/projection-message.mp3", {
      
    })

    this.soundManager.load("clickRocket", "/examples/sounds/scene-1/interroge-fusee.mp3", {
      
    })  
    
    this.soundManager.load("clickRocket", "/examples/sounds/scene-1/interroge-fusee.mp3", {
      
    }) 
    
    this.soundManager.load("rocketLaunch", "/examples/sounds/scene-1/decollage-fusee.mp3", {
      
    })

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
          y: this.winWidth*0.13/this.aspect
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

    this.customPipeline = [
      "comete-fall",            // Speak: Etrange comète
      "next",                   // Speak: Non loin de là
      "customPersonalization",  // Speak: Open custom personnalisation
      "customize-hide",         // Click: 
      "scene-2",                // Speak: Dans la forêt
      "charInteraction",    
      "displayCatHolo",
      "ocelot-click",           // Refacto: Ocelot click
      "caracal-click",   
      "caracalTalk",    
      "click-pierre",   
      "removeHelp",
      "scene-3",
      "ocelotTalk",
      "next",                   // Speak : Le conduire
      "ocelotStopTalking",
      "next",                   // Speak : deux est
      "mayClickOcelot",
      "ocelot-click", // Click ocelot
      "rocketIsClickable",
      "next", // Touch rocket
      "rocket-launch"                    // Speak : Démarer la fusée
    ]

    var text = this.addElement(
      new Bard.TextElement({
        nodes: [
          "Un soir, alors qu’il observe <span data-speech='comete-fall'>le ciel</span> étoilé d’une belle nuit d’été… Une étrange comète traverse l’atmosphère, pour disparaître dans un bois <span data-speech='next'>non loin de</span> là.",
          " Il faut que j’aille voir cela de plus près ! “ s’exclame notre héros. Mais avant de s’aventurer dehors, il doit d’abord <span data-speech='customPersonalization'>être équipé</span>.",
          ".",
          "Le voilà fin prêt ! Guidé par la lumière de la comète qui s’est écrasée, Chevalier Justine décide d'aller <span data-speech='scene-2'>vers la forêt</span>…", 
          "Soudain, à l’orée d’une clairière, des voix lui parviennent. Qui peut bien se <span data-speech='charInteraction'>cacher ici</span> ?",
          "Touche ton héros pour qu’il fasse peur aux créatures et qu’elles sortent de leur cachette !",
          "Bien joué, deux créatures viennent d’apparaître dans les feuillages. Touche-les pour les faire descendre et les faire parler. ",
          "Dans un <span data-speech='caracalTalk'>langage codé</span>, l’une des créatures prend la parole. <br> Hélas son message est incompréhensible… Elle a égaré la pierre de traduction dans la forêt. Retrouve-la pour l’aider à se faire comprendre",
          "Bien joué ! Ses paroles sont maintenant compréhensibles : “ Nous sommes les frères Ocelot et Caracal de la lointaine planète Mars. Là-bas, un cataclysme menace nos jours. Par pitié, <span data-speech='removeHelp'>aidez-nous</span> ! “",
          "Les frères Ocelot et Caracal ont besoin d’aide, ils ont traversé la moitié l’univers pour te proposer une <span data-speech='scene-3'>nouvelle aventure</span>.",
          "Ayant accepté d’apporter ton aide aux deux créatures, celles-ci te guident jusqu’à leur <span data-speech='ocelotTalk'>fusée</span>.",
          "“ Voici le vaisseau qui nous emmènera sur notre planète ! ” lui dit l’un des frères. “ Seul Ocelot peut <span data-speech='next'>le piloter</span>. ”",
          "Malheureusement, l'atterrissage a été un peu rude, et nous avons partiellement perdu la mémoire. Nous ne savons plus quel sont nos <span data-speech='ocelotStopTalking'>noms respectifs</span>… ”",
          "Pour savoir lequel des deux sait conduire la fusée, interroge-la en prononçant la formule magique <button data-speech='next' id='deux est' class='recorder'></button> : “ Fusée, lequel des deux est Ocelot ? ”",
          // "La fusée est joueuse et ne donne pas d’informations si facilement mais elle accepte tout de même de te révéler comment <span data-speech='next'>le trouver</span>. ",
          "Ocelot est plus grand que son frère, t’indique-t-elle. Pourras-tu <span data-speech='mayClickOcelot'>le trouver</span> ?",
          "Bien joué ! La fusée a de nouveau un pilote! Mais êtes-vous fin prêts à <span data-speech='rocketIsClickable'>partir</span> ?",
          "Touche la fusée pour partir directement ou touche Ocelot si tu veux t’assurer que la fusée est bien en état de décoller",
          // "Tout le monde a mis sa ceinture de sécurité et est bien installé dans le cockpit. Il ne reste plus qu’à <span data-speech='next'>démarrer la fusée</span>.",
          "Tout le monde à bord, vers l'infini et <span data-speech='rocket-launch'>au-delà</span> !",
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
   
    this.herbes = []
    this.plantes = []
    for(let i = 0; i< 4; i++) {
      let herbe = this.addElement(new Bard.CharacterElement({
        clickable: true,
        morphTargets: true,
        visible: true,
        position: {
          x:(this.winWidth*0.15/this.aspect)+(this.winWidth/this.aspect)+(this.winWidth*0.4*i)/this.aspect,
          y: this.winWidth*0.135/this.aspect,
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
        herbe.mesh.children[0].traverse((child)=> {
          if( child['material']) {
            child.material.opacity = 0.6
            child.material.color = new THREE.Color(0x143adb)
            // child.material.realOpacity = 0
            
          }
        })
      })

      let plante = this.addElement(new Bard.CharacterElement({
        clickable: true,
        morphTargets: true,
        visible: true,
        position: {
          x:(this.winWidth*0.15/this.aspect)+(this.winWidth/this.aspect)+(this.winWidth*0.45*i)/this.aspect,
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
        plante.mesh.children[0].traverse((child)=> {
          if( child['material']) {
            child.material.color = new THREE.Color(0x031347)
            // child.material.realOpacity = 0
            
          }
        })
      })

    }
    

    this.comete = this.addElement(new Bard.CharacterElement({
      clickable: true,
      morphTargets: true,
      visible: true,
      hide: true,
      group: 'background',
      position: {
        x:0,
        y: this.winWidth*0.6/this.aspect,
        z: -29
      },
      rotation: {
        x:0,
        y:0,
        z:0,
      },
      scale: 100,
      model: '/examples/obj/comete.glb'
    }))

    this.comete.on('load', ()=> {
      this.comete.actions[0].play()
    })

    this.addAction('comete-fall', (e)=>{
      this.soundManager.play('comete')
      
      this.comete.anims.push(new Bard.Animation({
        duration: 200,
        onProgress: (advancement, time) => {
          var easeTime = Bard.Easing.easeInOutQuint(advancement)
          this.comete.mesh.children[0].traverse((child)=> {
            if(child['material']) {
              child.material.opacity = Math.min(Math.max((easeTime)*child.material.realOpacity,0),1)
            }
          })
        }
      }))

      this.comete.anims.push(new Bard.Animation({
        duration: 6000,
        from: this.comete.mesh.position.y, 
        to: this.winWidth*0.1/this.aspect,
        onProgress:(advancement, time)=>{
          this.comete.mesh.position.y = time
          this.comete.mesh.position.x = this.winWidth/this.aspect*advancement
          this.comete.mesh.scale.set(40,40,40)
        }
      }))
    })
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

    
    
    // this.pierre = this.addElement(new Bard.MeshElement({
    //   clickable: true,
    //   name: "pierre",
    //   position: {
    //     x:this.winWidth*0.83/this.aspect+this.scenesAttributes.two.position.x,
    //     y: this.winWidth*0.28/this.aspect,
    //     z: 20
    //   },
    //   mesh: new THREE.Mesh(
    //     new THREE.BoxGeometry( 50/this.aspect, 50/this.aspect, 1 ), 
    //     new THREE.MeshBasicMaterial({color: 0xF26000,opacity:1, transparent: true, depthTest: false, depthWrite: false}))
    // }))

    this.pierre = this.addElement(new Bard.PlaneElement({
      name: "piere",
      clickable: true,
      isPlane: true,
      map: '/examples/img/pierre-de-traduction.png', 
      transparent: true, 
      fit: 'yes',
      depth: 0,
      rotation: {
        x: 0,
        y: 0,
        z: 0,
      },
      scale: 30,
      position : {
        x:this.winWidth*0.83/this.aspect+this.scenesAttributes.two.position.x,
        y:this.winWidth*0.28/this.aspect,
        z: 30
      }
    }
    ))

    this.pierre.on('load', ()=>{
      this.pierre.mesh.children[0].material.uniforms.opacity.value = 0.6
    })


    this.char = this.addElement(new Bard.CharacterElement({
      name: "mainChar",
      clickable: true,
      morphTargets: false,
      visible: true,
      mainChar: true,
      position: {
        x:(this.winWidth*0.38/this.aspect)+this.scenesAttributes.one.position.x,
        y: this.winWidth*0.1/this.aspect,
        z: -29
      },
      rotation: {
        x:Math.PI/2,
        y:0,
        z:0,
      },
      scale: 0.65,
      model: '/examples/obj/rig-heros (2).glb'
    }))

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
      model: '/examples/obj/rig-chats3.glb'
    }))

    this.ocelot = this.addElement(new Bard.CharacterElement({
      name: "ocelot",
      clickable: true,
      morphTargets: false,
      visible: true,
      position: {
        x:(this.winWidth*0.29/this.aspect)+this.scenesAttributes.two.position.x,
        y: this.winWidth*0.35/this.aspect,
        z: -29
      },
      rotation: {
        x:Math.PI/2,
        y:0,
        z:0,
      },
      scale: 0.45,
      hide:true,
      model: '/examples/obj/rig-chats3.glb'
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
        this.executeAction('displayCatHolo')
      }
    })

    this.ocelot.on("click",()=>{
      this.executeAction("ocelot-click"); 
    })

    this.caracal.on("click",()=>{
      this.executeAction("caracal-click");
    })

    this.pierre.on("click",()=>{
      this.executeAction("click-pierre");      
    })



    this.addAction("click-pierre", ()=>{
      this.caracal.actions[9].crossFadeFrom(this.caracal.actions[5], 0.5)
      this.caracal.actions[9].play()
      
      if(this.caracalFound && this.ocelotFound ) {
        this.soundManager.play('success')
        this.soundManager.play('projection')
        
        this.caracal.anims.push(new Bard.Animation({
          duration: 500,
          onProgress: (advancement, time)=>{
            this.caracal.mesh.children[0].traverse((child)=> {
              if( child['name'] ==="projection" && child['material']) {
                child.material.opacity =0.35*advancement
                child.visible =true
              }
            })
          }
        }))

        this.parcheminFound = true
        this.pierre.anims.push(new Bard.Animation({
          duration: 300,
          onProgress: (advancement, time) => {
            var easeTime = Bard.Easing.easeInOutQuint(advancement)      
            this.pierre.mesh.children[0].material.uniforms.opacity.value = Math.max(1.-easeTime,0)
        }}))
        text.next();
      }
    })


    this.addAction("ocelot-click", ()=>{
      this.ocelotFound = true
      this.executeAction('fallOcelot')
      if(this.caracalFound  && this.ocelot.interactive) {
        text.next();
        this.ocelot.interactive = false
      }
      this.ocelot.actions[6].setLoop(THREE.LoopOnce)
      this.ocelot.actions[6].setDuration(0.6)
      this.ocelot.actions[6].play()
      setTimeout(()=>{
        this.ocelot.actions[0].play()
      },600)
      if(this.scene3 && !this.findOcelot && this.ocelot.interactive) {
        this.findOcelot = true
        text.next();
      }
    })

    this.addAction("caracal-click", ()=>{
      this.caracalFound = true
      this.executeAction('fallCaracal')
      this.caracal.actions[6].setLoop(THREE.LoopOnce)
      this.caracal.actions[6].setDuration(0.6)
      this.caracal.actions[6].play()
      setTimeout(()=>{
        this.caracal.actions[0].play()
      },600)
      if(this.ocelotFound && this.caracal.interactive) {
        text.next();
        this.caracal.interactive = false
      } 
    })
   

    this.addAction('removeHelp', ()=>{
      text.next();
      this.caracal.actions[9].crossFadeTo(this.caracal.actions[0], 0.3)
      this.caracal.actions[0].play()
      this.caracal.actions[0].enabled = true

      this.caracal.anims.push(new Bard.Animation({
        duration: 500,
        onProgress: (advancement, time)=>{
          this.caracal.mesh.children[0].traverse((child)=> {
            if( child['name'] ==="projection" && child['material']) {
              child.material.opacity = Math.max(child.material.realOpacity*(1-advancement),0)
              // child.visible =true
            }
          })
        }
      }))
    })

    this.rocket.on('click', ()=>{

      this.soundManager.play('clickRocket')
      if(this.scene3 && this.rocketIsClickable) {
        text.next();
        this.rocketIsClickable = false

        this.ocelot.anims.push(new Bard.Animation({
          duration: 1000,
          onProgress: (advancement, time) => {
            var easeTime = Bard.Easing.easeInOutQuint(advancement)
            this.ocelot.mesh.children[0].traverse((child)=> {
              if(child['material'] && child['name'] !== "projection") {
                child.material.opacity = (1-easeTime)*child.material.realOpacity
              }
            })
          }
        }))

        this.char.anims.push(new Bard.Animation({
          duration: 1000,
          onProgress: (advancement, time) => {
            var easeTime = Bard.Easing.easeInOutQuint(advancement)
            this.char.mesh.children[0].traverse((child)=> {
              if(child['material']) {
                child.material.opacity = (1-easeTime)*child.material.realOpacity
              }
            })
          }
        }))
  
        this.caracal.interactive = true
        this.caracal.anims.push(new Bard.Animation({
          duration: 1000,
          onProgress: (advancement, time) => {
            var easeTime = Bard.Easing.easeInOutQuint(advancement)
            this.caracal.mesh.children[0].traverse((child)=> {
              if(child['material'] && child['name'] !== "projection") {
                child.material.opacity = (1-easeTime)*child.material.realOpacity
              }        
            })
          }
        }))
      }
      
    })

    /**
     * ACTIONS
     */
    
    this.addAction('caracalTalk', ()=>{
      this.caracal.actions[5].crossFadeFrom(this.caracal.actions[0], 0.3)
      this.caracal.actions[5].play()
      this.soundManager.play('langageCode')
    })

    this.addAction('ocelotTalk', ()=>{
      text.next();
      this.ocelot.actions[5].crossFadeFrom(this.ocelot.actions[0], 0.3)
      this.ocelot.actions[5].play()
    })

    
    this.addAction('ocelotStopTalking', ()=>{
      text.next();
      this.ocelot.actions[0].crossFadeFrom(this.ocelot.actions[5], 0.3)
      this.ocelot.actions[0].enabled = true
      this.ocelot.actions[0].play()
    })
    
    this.addAction("customPersonalization", ()=>{
      this.char.anims.push(new Bard.Animation({
        duration: 2500,
        from: 1,
        to: 3,
        timingFunction: "easeInOutQuad",
        onProgress: (advancement, time, anim) => {
          var middle = this.book.scene.middle;
          var center = new THREE.Vector2(
            (this.char.mesh.position.x - middle.x)*advancement + middle.x,
            (this.char.mesh.position.y + 50 - middle.y)*advancement + middle.y
          );
          this.book.scene.zoomTo(center, time);
        },
        onFinish: () => {
          this.characterCustomizer.display();
          text.next();
        }
      }));
    }, {
      once: true
    });

    this.addAction("customize-hide", ()=>{
      this.characterCustomizer.hide();
      this.char.anims.push(new Bard.Animation({
        duration: 2500,
        from: 3,
        to: 1,
        timingFunction: "easeInOutQuad",
        onProgress: (advancement, time, anim) => {
          var middle = this.book.scene.middle;
          var center = new THREE.Vector2(
            (middle.x - this.char.mesh.position.x)*advancement + this.char.mesh.position.x,
            (middle.y - (this.char.mesh.position.y + 50) )*advancement + this.char.mesh.position.y + 50
          );
          this.book.scene.zoomTo(center, time);
        },
        onFinish: () => {
          text.next();
        }
      }));
    }, {
      once: true
    });
    
    

    this.addAction('displayCatHolo', (e)=> {
      // this.soundManager.play("heros-call")
      this.soundManager.play('feuillage')

      this.roar = true
      this.char.actions[0].setLoop(THREE.LoopOnce)
      this.char.actions[0].play()

      text.next();
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
          this.caracal.mesh.children[0].traverse((child)=> {
            if(child['material']) {
              child.material.opacity = easeTime*child.material.realOpacity
            }        
          })
        }
      }))
    }, { once: true })

    this.addAction('fallOcelot', (e)=> {
      this.ocelot.anims.push(new Bard.Animation({
        duration: 800,
        from: this.ocelot.mesh.position.y,
        to: this.scenesAttributes.two.position.y,
        timingFunction: 'easeInOutQuint',
        onProgress: (advancement, time) => {
          var easeTime = Bard.Easing.easeInOutQuint(time)
          // this.planes[i].mesh.position.x = ((advancement*(i+1))*80)+(this.book.scene.camera.top/2.)
          this.ocelot.mesh.position.y = time 
        },
        onFinish: ()=>{
          this.soundManager.play('chatTombe')
        }
      })) 
    }, { once: true })

    this.addAction('fallCaracal', (e)=> {
      this.ocelot.anims.push(new Bard.Animation({
        duration: 800,
        from: this.caracal.mesh.position.y,
        to: this.scenesAttributes.two.position.y,
        timingFunction: 'easeInOutQuint',
        onProgress: (advancement, time) => {
          
          var easeTime = Bard.Easing.easeInOutQuint(time)
          // this.planes[i].mesh.position.x = ((advancement*(i+1))*80)+(this.book.scene.camera.top/2.)
          this.caracal.mesh.position.y = time 
        },
        onFinish: ()=>{
          this.soundManager.play('chatTombe')
        }
      })) 
    }, { once: true })

    this.addAction('charWalk', (e)=> {
      this.charIdle.stop()
      this.charWalk.play()

      this.char.mesh.position.y = this.scenesAttributes.two.position.y
      
      setTimeout(()=>{
        this.charIdle.enabled = true
        this.charIdle.crossFadeFrom(this.charWalk, 0.3)
        this.charIdle.play()
      },5700)
     
      this.char.anims.push(new Bard.Animation({
        duration: 6000,
        from: (-this.winWidth*0.1/this.aspect)+this.currentScene.position.x,
        to: e.args+this.currentScene.position.x,
        onProgress: (advancement, time) => {
          var easeTime = Bard.Easing.easeOutQuad(advancement)
          // this.planes[i].mesh.position.x = ((advancement*(i+1))*80)+(this.book.scene.camera.top/2.)
         
          this.char.mesh.position.x = time
        },
        onFinish: ()=>{
          this.charWalk.stop()
        }
      })) 
    })

    this.addAction('catsWalk', (e) => {
      e.args.element.actions[8].play()
      setTimeout(()=>{
        e.args.element.actions[0].crossFadeFrom(e.args.element.actions[8], 0.5)
      },5500)
      e.args.element.anims.push(new Bard.Animation({
        duration: 6000,
        from: -this.winWidth*0.3/this.aspect+this.currentScene.position.x,
        to: e.args.to + this.currentScene.position.x,
        onProgress: (advancement, time) => {
          var easeTime = Bard.Easing.easeOutQuad(advancement)
          // this.planes[i].mesh.position.x = ((advancement*(i+1))*80)+(this.book.scene.camera.top/2.)
      
          e.args.element.mesh.position.x = time
          e.args.element.mesh.position.y = this.scenesAttributes.two.position.y
        },
        onFinish: ()=>{
        }
      }))
    })

    this.addAction('charInteraction', (e)=>{
      this.char.interactive = true
      text.next();
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

      // Character enter in view box
      this.char.anims.push(new Bard.Animation({
        duration: 3500,
        from: this.book.scene.camera.position.x,
        to:  this.currentScene.position.x,
        timingFunction: "easeInOutQuint",
        onProgress: (advancement, time, anim) => {
          this.book.scene.cameraAnimate =true
          this.book.scene.camera.position.x = time
        },
        onFinish: () => {
          this.book.scene.cameraAnimate =false
          this.book.scene.scenePosition.x = this.currentScene.position.x

          this.executeAction('charWalk', this.winWidth*0.43/this.aspect)
          text.next();
          this.soundManager.play('foret')
          this.soundManager.play('marche')
          setTimeout(()=>{
            this.soundManager.play('voix')
          }, 1000)
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
    }, {
      once: true
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

          text.next();         
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

      
    }, { once: true })

    this.addAction('rocketIsClickable', (e)=>{
      this.rocketIsClickable = true
      text.next()
    })

    this.addAction('rocket-launch', (e)=>{
      this.soundManager.play('rocketLaunch')

      this.rocket.actions[2].fadeOut(1)
      this.rocket.actions[2].play()
      this.rocket.actions[4].fadeIn(1)
      this.rocket.actions[4].play()

      this.rocket.anims.push(new Bard.Animation({
        duration: 6000,
        from: this.rocket.mesh.position.y,
        to: this.rocket.mesh.position.y+this.winWidth*0.8/this.aspect,
        timingFunction: 'easeInQuad',
        onProgress: (advancement, time)=>{
          this.rocket.mesh.position.y = time
          this.book.scene.woobleIntensity = Math.sin(advancement*Math.PI)/4
        }
      }))
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
    }, { once: true })

    this.addAction("next",  e => {
      console.log("Next");
      text.next()
    })

    this.on("start", ()=>{
      
      for(var i=0; i<this.elements.length; i++){
        console.log("----- Fragment: Try to add element "+this.elements[i].name)
        if( this.elements[i].autoDisplay ){
          this.elements[i].display();
        }
      }
      
      this.charIdle = this.char.getAnimationByName('faux-fixe')
      this.charIdle.play()
      this.charWalk = this.char.getAnimationByName('marche')
      
      this.ocelot.mesh.children[0].traverse((child)=> {
        if( child['name'] ==="projection" && child['material']) {
          child.material.opacity = 0
          child.material.realOpacity = 0
          child.visible = false
        }
      })

      this.caracal.mesh.children[0].traverse((child)=> {
        if( child['name'] ==="projection" && child['material']) {
          child.material.opacity = 0
          // child.material.realOpacity = 0
          child.visible = false
        }
      })
      
      this.rocket.actions[2].play()

      this.soundManager.play('terreAmbiance')
      

      this.initListeners();
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

    if(this.pierre.mesh) {
      this.pierre.mesh.position.y += Math.cos(this.clock.elapsed/1000 )/10.
    }
    this.afterRender();
  }

  initListeners() {

  }
}
