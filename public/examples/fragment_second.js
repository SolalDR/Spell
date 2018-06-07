import * as Bard from "./../src/bard.js"

export default class Fragment2 extends Bard.Fragment {
  
  constructor(){
    super();
    this.name = "Second fragment"
  }

  init() {    
    var self = this;

    this.addSpeechRecognition();
    this.addSoundManager();
    this.aspect = window.innerWidth/window.innerHeight
    this.winWidth = window.innerWidth
    /**
     * SOUNDS
     */
    var rocketLaunch = this.soundManager.load("forest", "/examples/sounds/rocket_launch.mp3");

    /**
     * ELEMENTS
     */
    // this.char = this.addElement(new Bard.CharacterElement({}))
  

    var text = this.addElement(
      new Bard.TextElement({
        nodes: [
          " Enfin arrivés ! La fusée à peine posée, les habitants de mars affluent des alentours pour t'acclamer et t’encourager :”Libère-nous ! Tu es notre <span data-speech='next'>seul espoir</span> !”",
          "Tout à coup, un <span data-speech='terryfying-roar'>bruit terrifiant</span> retentit dans les environs." ,
          "Pris de panique les martiens courent se mettre à l’abri ! Le monstre est <span data-speech='unlock-sword'>tout proche</span> !",
          "Notre héros brandit son arme, prêt à combattre. Tout à coup, la créature s’élance d’<span data-speech='dragon-appear'>une falaise</span> et atterrit devant eux.",
           "“Graougrrrr !! je vais vous manger tout crus !!” dit-elle en <span data-speech='next'>rugissant</span>.",
           "Avant même que *Nom du héro* ait eu le temps d’esquisser un geste, elle lui fonce dessus et le projette sur le sol, son arme se brisant avec la <span data-speech='break-sword'>force du choc</span>.<br> “Hahahaha, trop facile !”",
           "Ton héros est désarmé ! Vite, il <span data-speech='run'>faut fuir</span> !"
        ],
        align: "bottom-left",
        position: { x: "40px", y: "-20px" },
        name: "mainText",
        color: '#ffffff'
      })
    );

    var planets = []
    this.planes = []
    
    this.planesLength = 6

    this.addElement(new Bard.PlaneElement({
      name: 'bg',
      group: 'foreground',
      depth: 31,
      transparent: true,
      map: '/examples/scene-mars/bg.png'
    }))

    for (let i = 0; i < 6; i++) {
      let group = "background"
      let id = this.planesLength - i
      if (id==1) {
        group= "foreground"
      }
      this.planes.push(
        this.addElement(new Bard.PlaneElement({
            name: 'plan'+(id),
            group: group,
            depth: -30*id+(60),
            inverse: true,
            transparent: true,
            map: '/examples/scene-mars/scenes-mars-plan'+id+'.png'
          })
        )
      )
      
    }

    this.rocket = this.addElement(
      new Bard.CharacterElement({
        name: "rocket",
        clickable: true,
        morphTargets: true,
        visible: true,
        position: {
          x:(this.winWidth*0.7/this.aspect),
          y: this.winWidth*0.27/this.aspect,
          z: -29
        },
        rotation: {
          x:0,
          y:Math.PI,
          z:0,
        },
        scale: 300,
        model: 'examples/obj/fusee/fusee.gltf'
      })
    )

    this.char = this.addElement(
      new Bard.CharacterElement({
        name: "mainChar",
        clickable: true,
        morphTargets: false,
        visible: true,
        mainChar: true,
        position: {
          x:(this.winWidth*0.6/this.aspect),
          y: this.winWidth*0.27/this.aspect,
          z: -29
        },
        rotation: {
          x:Math.PI/2,
          y:0,
          z:0,
        },
        scale: 0.7,
        hide:true,
        model: 'examples/obj/rig-heros.glb'
      })
    )

    this.caracal = this.addElement(
      new Bard.CharacterElement({
        name: "caracal",
        hide:true,
        clickable: true,
        morphTargets: false,
        visible: true,
        position: {
          x:(this.winWidth*0.15/this.aspect),
          y: this.winWidth*0.27/this.aspect,
          z: -29
        },
        rotation: {
          x:Math.PI/2,
          y:0,
          z:0,
        },
        scale: 0.7,
        model: 'examples/obj/rig-chats2.glb'
      })
    )

    this.ocelot = this.addElement(
      new Bard.CharacterElement({
        name: "ocelot",
        hide:true,
        clickable: true,
        morphTargets: false,
        visible: true,
        position: {
          x:(this.winWidth*0.3/this.aspect),
          y: this.winWidth*0.27/this.aspect,
          z: -29
        },
        rotation: {
          x:Math.PI/2,
          y:0,
          z:0,
        },
        scale: 0.6,
        model: 'examples/obj/rig-chats2.glb'
      })
    )

    this.dragon = this.addElement(
      new Bard.CharacterElement({
        name: "dragon",
        clickable: true,
        morphTargets: false,
        visible: true,
        position: {
          x:(this.winWidth*1.5/this.aspect),
          y: this.winWidth*0.27/this.aspect,
          z: -29
        },
        rotation: {
          x:-Math.PI/2,
          y:Math.PI,
          z:0,
        },
        scale: 2.,
        model: 'examples/obj/rig-boss.glb'
      })
    )

    this.addAction('move-element',(e)=>{
      
      e.args.element.anims.push(new Bard.Animation({
        from: e.args.element.mesh.position.x,
        to: e.args.to+e.args.element.mesh.position.x,
        duration: e.args.duration,
        onProgress:  (advancement, time) => {
          var easeTime = Bard.Easing.easeInOutQuint(advancement)
          e.args.element.mesh.position.x = time
        },
        onFinish: ()=>{
          this.ocelot.actions[5].stop()
          this.dragon.actions[2].stop()
          this.caracal.actions[5].stop()
        }
      }))
    })

    this.addAction('terryfying-roar', (e)=>{
      this.executeAction('next')
      this.ocelot.actions[9].setLoop(THREE.LoopOnce)
      // this.ocelot.actions[9].crossFadeFrom(this.ocelot.actions[0], 0.2)
      this.ocelot.actions[9].play()

      this.caracal.actions[9].setLoop(THREE.LoopOnce)
      // this.caracal.actions[9].crossFadeFrom(this.caracal.actions[0], 0.2)
      this.caracal.actions[9].play()
    })

    this.addAction('unlock-sword', (e)=>{
      this.executeAction('next')
      this.ocelot.actions[5].play()
      this.caracal.actions[5].play()
      this.executeAction('move-element', {element: this.ocelot, to: -this.winWidth*0.15/this.aspect, duration: 2000})
      this.executeAction('move-element', {element: this.caracal, to: -this.winWidth*0.15/this.aspect, duration: 2000})
    })

    this.addAction('dragon-appear', (e)=>{
      this.executeAction('move-element', {element: this.dragon, to: -this.winWidth*0.5/this.aspect, duration: 2000})
      this.dragon.actions[2].play()
      this.dragon.actions[0].play()
      this.executeAction('next')
    })

    this.addAction('break-sword', (e)=>{
      this.executeAction('move-element', {element: this.char, to: -this.winWidth*0.15/this.aspect, duration: 1000})
      this.executeAction('next')
    })

    this.addAction('run', (e)=>{
      this.char.anims.push(new Bard.Animation({
        from: this.char.mesh.position.x,
        to:-this.winWidth,
        duration: 8000,
        onProgress:  (advancement, time) => {
          var easeTime = Bard.Easing.easeInOutQuint(advancement)
          this.char.mesh.position.x = time
          this.book.scene.camera.position.x = advancement*(-this.winWidth)
        },
        onFinish: ()=>{
          this.ocelot.actions[5].stop()
          this.dragon.actions[2].stop()
          this.caracal.actions[5].stop()
        }
      }))
    })
    /**
     * ACTIONS
     */
    this.addAction('transitionIn', (e)=>{

      this.rocket.actions[4].play()
      this.rocket.actions[4].fadeOut( 5)
      this.rocket.actions[2].play()
      this.rocket.actions[2].fadeIn(5)

      this.rocket.anims.push(new Bard.Animation({
        duration: 5000,
        from: this.winWidth*0.5/this.aspect,
        to: this.rocket.mesh.position.y,
        timingFunction:'easeOutQuad',
        onProgress:(advancement, time)=> {
          
          this.rocket.mesh.position.y = time
          
          // this.rocket.actions[4].play()

          // if(advancement > 0.85) {
          //   this.rocket.actions[1].setLoop(THREE.LoopOnce)
          //   this.rocket.actions[1].crossFadeFrom()
          //   // this.rocket.actions[1].setEffectiveWeight((advancement-0.85)*8.)
          //   // this.rocket.actions[2].play((advancement-0.85)*8.)
          // }
          
          
        },
        onFinish:()=> {
          this.ocelot.actions[0].play()
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

          this.caracal.actions[0].play()
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

          this.char.actions[8].play()
          this.char.anims.push(new Bard.Animation({
            duration: 1000,
            onProgress: (advancement, time) => {
              var easeTime = Bard.Easing.easeInOutQuint(advancement)
              this.char.mesh.children[0].traverse((child)=> {
                if(child['material']) {
                  child.material.opacity = easeTime*child.material.realOpacity
                }
              })
            }
          }))
        }
      }))
    })

    this.addAction("next",  e => text.next())


    this.on("start", ()=>{
      
      for(var i=0; i<this.elements.length; i++)
        this.elements[i].display();

      // this.book.scene.camera.position.x = this.winWidth*2.75

      this.initListeners();
      this.executeAction("transitionIn");
      // this.soundManager.stop("forest");
      // this.soundManager.play("rocket");
    })
  }
  resize() {
    this.winWidth = window.innerWidth
    this.winHeight = window.innerHeight
    this.aspect = this.winWidth/this.winHeight
  
    this.fondPerdu = (this.winWidth*0.03)/this.aspect
    
  }

  render() {
    this.beforeRender();
    this.afterRender();
  }

  initListeners() {}
}
