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
    this.fondPerdu = this.winWidth*0.5/this.aspect
    /**
     * SOUNDS
     */
    var rocketLaunch = this.soundManager.load("forest", "/examples/sounds/rocket_launch.mp3");

    /**
     * ELEMENTS
     */
    // this.char = this.addElement(new Bard.CharacterElement({}))
    
    this.customPipeline = [
      "terryfying-roar", 
      "unlock-sword",
      "dragon-appear",
      "dragonStopTalking",
      "break-sword",
      "charUp",
      "run",
      "next",
      "ocelot-talk",
      "next",
      "dragon-talk",
      "ocelot-respond",
      "dragon-respond",
      "robot-click",
      "dragon-roar",
      "dragon-death",
      "dragon-fade"
    ]

    var text = this.addElement(
      new Bard.TextElement({
        nodes: [
          // " Enfin arrivés ! La fusée à peine posée, les habitants de mars affluent des alentours pour t'acclamer et t’encourager :”Libère-nous ! Tu es notre <span data-speech='next'>seul espoir</span> !”",
          "Enfin arrivés ! La fusée à peine posée, un <span data-speech='terryfying-roar'>bruit terrifiant</span> retentit dans les environs. L'heure du combat a sonné ! Le monstre est <span data-speech='unlock-sword'>tout proche</span> !" ,
          "Notre héros brandit son arme, prêt à combattre. Tout à coup, la créature s’élance d’<span data-speech='dragon-appear'>une falaise</span> et atterrit devant eux.",
           "“ Graougrrrr !! je vais vous manger tout crus !! ” dit-elle en <span data-speech='dragonStopTalking'>grognant</span>.",
           "Avant même que Chevalier Justine ait eu le temps d’esquisser un geste, elle lui <span data-speech='break-sword'>fonce dessus</span> et le projette sur le sol, son arme se brisant avec la force du choc.<br> “ Hahahaha, <span data-speech='charUp'>trop facile</span> ! ”",
           "Ton héros est désarmé ! Vite, nous <span data-speech='run'>devons fuir</span> !",
           "Chevalier Justine et ses compagnons déguerpissent sans attendre. Le monstre les prend en chasse ! Ils sont rapides, mais le monstre <span data-speech='next'>plus encore</span>…  ",
           "Il gagne de la distance sur eux ! <span data-speech='ocelot-talk'>Tout</span> à coup, Ocelot s’écrie : “ Nous voilà bloqués ! ” Un grand rocher se cachait au détour d’un virage : pas moyen de <span data-speech='next'>continuer à fuir</span> !",
           "En appui sur ses pattes arrières, <span data-speech='dragon-talk'>le monstre</span> s’apprête à bondir. “ Quelle pitoyable tentative ! lance le méchant. Vous ne pourrez pas m’empêcher de terroriser la planète mars ! Et je vais vous faire si peur que <span data-speech='ocelot-respond'>vous en</span> mourrez ! ”",
           "” Moi je n’ai pas peur, lui répond Ocelot, et je connais même quelqu’un que tu ne pourras jamais effrayer, il est d’ailleurs <span data-speech='dragon-respond'>avec nous</span> ! ”",
           "” Impossible ! Répond le monstre. Dis-moi qui est cette personne, que je te montre que tu as tort ! ” Touche ton compagnon qui ne pourra jamais être effrayé pour vaincre le monstre. ",
           "“ Le robot Tanique ne te craint pas ! ” dit Chevalier Justine À ces mots, le monstre se met à trembler et à enfler de colère, prêt à faire <span data-speech='dragon-roar'>le cri</span> le plus terrorisant de tous les temps : “ Braougraaaaaagggggaaaaaar !!!! “",
           "Voyant qu’il a échoué à effrayer le robot, le <span data-speech='dragon-death'>monstre pâlit</span> et un grondement sourd sort de sa gueule. Le voilà vaincu ! Il s’écroule tout à coup et son corps s’évanouit pour ne laisser qu’une petite forme <span data-speech='dragon-fade'>sur le sol</span>.",
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
      inverse: true,
      map: '/examples/scene-mars/bg.png'
    }))
    this.liane = this.addElement(
      new Bard.CharacterElement({
        name: "liane1",
        clickable: true,
        morphTargets: true,
        group:'background',
        visible: true,
        position: {
          x:(this.winWidth*0.7/this.aspect),
          y: this.winWidth*0.2/this.aspect,
          z: -29
        },
        rotation: {
          x:0,
          y:Math.PI,
          z:0,
        },
        scale: 160,
        opacity: 0.5,
        model: 'examples/obj/liane2/liane2.gltf'
      })
    )

    this.liane2 = this.addElement(
      new Bard.CharacterElement({
        name: "liane2",
        clickable: true,
        morphTargets: true,
        group:'background',
        visible: true,
        position: {
          x:(this.winWidth*0.4/this.aspect),
          y: this.winWidth*0.2/this.aspect,
          z: -29
        },
        rotation: {
          x:0,
          y:Math.PI,
          z:0,
        },
        scale: 160,
        opacity: 0.5,
        model: 'examples/obj/liane3/liane3.gltf'
      })
    )

    this.liane3 = this.addElement(
      new Bard.CharacterElement({
        name: "liane3",
        clickable: true,
        group:'background',
        morphTargets: true,
        visible: true,
        position: {
          x:(-this.winWidth*0.05/this.aspect),
          y: this.winWidth*0.25/this.aspect,
          z: -29
        },
        rotation: {
          x:0,
          y:Math.PI,
          z:0,
        },
        scale: 160,
        opacity: 0.5,
        model: 'examples/obj/liane4/liane4.gltf'
      })
    )

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

   

    this.liane.on('load', ()=>{
      this.liane.actions[1].play()
    })

    this.liane2.on('load', ()=>{
      this.liane2.actions[1].setDuration(2)
      this.liane2.actions[1].play()
    })

    this.liane3.on('load', ()=>{
      this.liane3.actions[1].setDuration(3)
      this.liane3.actions[1].play()
    })


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
          x:(this.winWidth*0.50/this.aspect),
          y: this.winWidth*0.27/this.aspect,
          z: -29
        },
        rotation: {
          x:Math.PI/2,
          y:0,
          z:0,
        },
        scale: 0.6,
        hide:true,
        originCenter: true,
        model: 'examples/obj/rig-heros (2).glb'
      })
    )

    this.robot = this.addElement(
      new Bard.CharacterElement({
        name: "robot-tanique",
        clickable: true,
        morphTargets: false,
        visible: true,
        position: {
          x:(this.winWidth*0.32/this.aspect),
          y: this.winWidth*0.27/this.aspect,
          z: -29
        },
        rotation: {
          x:Math.PI/2,
          y:0,
          z:0,
        },
        scale: 0.8,
        hide:true,
        originCenter: true,
        model: 'examples/obj/rig-robot-tanique.glb'
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
          x:(this.winWidth*0.40/this.aspect),
          y: this.winWidth*0.27/this.aspect,
          z: -29
        },
        rotation: {
          x:Math.PI/2,
          y:0,
          z:0,
        },
        scale: 0.5,
        originCenter: true,
        model: 'examples/obj/rig-chats3.glb',
        originRat: 3,
      })
    )

    this.caracal.on('load', ()=>{
      this.caracal.mesh.children[0].traverse((child)=> {
        if( child['name'] ==="projection" && child['material']) {
         child.material.opacity = 0
         child.material.realOpacity = 0
        }
      })
    })

    this.ocelot = this.addElement(
      new Bard.CharacterElement({
        name: "ocelot",
        hide:true,
        clickable: true,
        morphTargets: false,
        visible: true,
        position: {
          x:(this.winWidth*0.25/this.aspect),
          y: this.winWidth*0.27/this.aspect,
          z: -29
        },
        rotation: {
          x:Math.PI/2,
          y:0,
          z:0,
        },
        scale: 0.4,
        originCenter : true,
        originRat: 3,
        model: 'examples/obj/rig-chats3.glb'
      })
    )

    this.ocelot.on('load', ()=>{
      this.ocelot.mesh.children[0].traverse((child)=> {
        if( child['name'] ==="projection" && child['material']) {
         child.material.opacity = 0
         child.material.realOpacity = 0
        }
      })
    })


    this.serval = this.addElement(
      new Bard.CharacterElement({
        name: "serval",
        hide:true,
        clickable: true,
        morphTargets: false,
        visible: true,
        position: {
          x:(this.winWidth*0.7/this.aspect),
          y: this.winWidth*0.27/this.aspect,
          z: -29
        },
        rotation: {
          x:Math.PI/2,
          y:0,
          z:0,
        },
        scale: 0.35,
        originCenter : true,
        originRat: 3,
        model: 'examples/obj/rig-chats3.glb'
      })
    )

    this.serval.on('load', ()=>{
      this.serval.mesh.children[0].traverse((child)=> {
        if( child['name'] ==="projection" && child['material']) {
         child.material.opacity = 0
         child.material.realOpacity = 0
        }
      })
    })


    this.dragon = this.addElement(
      new Bard.CharacterElement({
        name: "dragon",
        clickable: true,
        morphTargets: false,
        visible: true,
        position: {
          x:(this.winWidth*1.1/this.aspect),
          y: this.winWidth*0.27/this.aspect + window.innerHeight,
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

    this.king = this.addElement(
      new Bard.CharacterElement({
        name: "king",
        clickable: true,
        morphTargets: false,
        visible: true,
        position: {
          x:(-this.winWidth*0.68/this.aspect),
          y: this.winWidth*0.27/this.aspect,
          z: -29
        },
        rotation: {
          x:-Math.PI/2,
          y:Math.PI,
          z:0,
        },
        scale: 1.,
        hide:true,
        model: 'examples/obj/rig-roi-martien.glb'
      })
    )

    this.soldat = this.addElement(
      new Bard.CharacterElement({
        name: "soldat",
        clickable: true,
        morphTargets: false,
        visible: true,
        position: {
          x:(-this.winWidth*0.68/this.aspect),
          y: this.winWidth*0.27/this.aspect,
          z: -29
        },
        rotation: {
          x:-Math.PI/2,
          y:Math.PI,
          z:0,
        },
        scale: 1.3,
        hide:true,
        model: 'examples/obj/rig-soldat-mars.glb'
      })
    )

    this.addAction('move-element',(e)=>{
      
      e.args.element.anims.push(new Bard.Animation({
        from: e.args.element.mesh.position.x,
        to: e.args.to+e.args.element.mesh.position.x,
        duration: e.args.duration,
        onProgress:  (advancement, value) => {
          var easeTime = Bard.Easing.easeInOutQuint(advancement)
          e.args.element.mesh.position.x = value
        },
        onFinish: ()=>{
          this.ocelot.actions[8].stop()
          // this.dragon.actions[2].stop()
          this.caracal.actions[8].stop()
        }
      }))
    })

    this.addAction('terryfying-roar', (e)=>{
      this.ocelotScared = this.ocelot.getAnimationByName('apeure')
      this.ocelotScared.setLoop(1,2)
     
      // this.ocelot.actions[9].crossFadeFrom(this.ocelot.actions[0], 0.2)
      this.ocelotScared.play()

      this.caracalScared = this.caracal.getAnimationByName('apeure')
      this.caracalScared.setLoop(1,2)
     
      // this.caracal.actions[9].crossFadeFrom(this.caracal.actions[0], 0.2)
      this.caracalScared.play()

      this.charScared = this.char.getAnimationByName('apeure')
      this.charScared.setLoop(THREE.LoopOnce)
     
      // this.caracal.actions[9].crossFadeFrom(this.caracal.actions[0], 0.2)
      this.charScared.play()

      this.robot.actions[3].setLoop(THREE.LoopOnce)
      // this.robot.actions[9].crossFadeFrom(this.robot.actions[0], 0.2)
      this.robot.actions[3].play()
    })

    this.addAction('unlock-sword', (e)=>{
      text.next();
      this.ocelot.actions[8].play();
      this.caracal.actions[8].play();

      this.charBrandit = this.char.getAnimationByName('brandit arme')
      this.charIdle = this.char.getAnimationByName('faux-fixe')
      this.charIdle.fadeOut(0.2)
      this.charBrandit.setLoop(THREE.LoopOnce)
      this.charBrandit.setDuration(1.2)
      this.charBrandit.clampWhenFinished = true
      this.charBrandit.play()

      this.executeAction('move-element', {element: this.ocelot, to: -this.winWidth*0.15/this.aspect, duration: 2000})
      this.executeAction('move-element', {element: this.caracal, to: -this.winWidth*0.15/this.aspect, duration: 2000})
      this.executeAction('move-element', {element: this.robot, to: -this.winWidth*0.15/this.aspect, duration: 2000})

    })

    this.addAction('dragon-appear', (e)=>{
      //this.executeAction('move-element', {element: this.dragon, to: -this.winWidth*0.72/this.aspect, duration: 1000})
      
      var from = new THREE.Vector3().copy(this.dragon.mesh.position);
      var to = new THREE.Vector3().copy(from);
      to.x -= this.winWidth*0.3/this.aspect
      to.y -= window.innerHeight

      this.dragon.anims.push(new Bard.Animation({
        from: 0,
        to: 1,
        duration: 1500,
        onProgress:  (advancement, value) => {
          var easeTime = Bard.Easing.easeInQuad(advancement)
          this.dragon.mesh.position.x = from.x + (to.x/0.95 - from.x)*easeTime
          this.dragon.mesh.position.y = from.y + (this.char.mesh.position.y - from.y)*easeTime
        },
        onFinish: ()=>{
          this.ocelot.actions[5].stop()
          this.caracal.actions[5].stop()
          this.dragon.anims.push(new Bard.Animation({
            from: 1,
            to: 0,
            duration: 400,
            onProgress: ((advancement, value)=>{
              this.book.scene.woobleIntensity = value;
            })
          }))
        }
      }))
      console.log(this.char)
    

      this.dragon.actions[2].setLoop(THREE.LoopOnce)
      this.dragon.actions[2].setDuration(1.2)

      

      this.dragon.actions[2].play()
      this.dragon.actions[3].fadeIn(1.5)
      this.dragon.actions[3].play()
      this.dragon.actions[0].fadeIn(1.5)
      this.dragon.actions[0].play()
      text.next();
    }, {
      once: true
    })
    this.addAction('dragonStopTalking', (e)=>{
      this.dragon.actions[3].fadeOut(0.4)
      text.next();
    })

    this.addAction('break-sword', (e)=>{
      this.dragon.actions[0].fadeOut(0.2)
      this.dragon.actions[9].setLoop(THREE.LoopOnce)
      this.dragon.actions[9].play()
    
      setTimeout(()=>{
        this.dragon.actions[0].fadeIn(0.5)
        this.dragon.actions[0].enabled = true

        this.dragon.actions[0].play()
        this.charBrandit.stop()
        this.char.actions[16].clampWhenFinished = true
        this.char.actions[16].setLoop(THREE.LoopOnce)
        this.char.actions[16].play()
        this.char.actions[14].fadeOut(0.2)
        this.executeAction('move-element', {element: this.char, to: -this.winWidth*0.15/this.aspect, duration: 1000})
      }, 500)
      
    })

    this.addAction('charUp', (e)=>{
      this.char.actions[16].stop()
      
      this.char.actions[14].enabled =true
      this.char.actions[14].fadeIn(0.8)
      this.char.actions[14].play()
      this.char.actions[4].clampWhenFinished = true
      this.char.actions[4].setLoop(THREE.LoopOnce)
      this.char.actions[4].play()

        text.next();
    })

    this.addAction('run', (e)=>{
      text.next();
      this.executeAction('move-element', {element: this.ocelot, to: -this.winWidth*1.4/this.aspect, duration: 11000})
      this.executeAction('move-element', {element: this.caracal, to: -this.winWidth*1.4/this.aspect, duration: 11000})
      this.executeAction('move-element', {element: this.robot, to: -this.winWidth*1.4/this.aspect, duration: 11000})

      setTimeout(this.executeAction.bind(this, 'move-element', {element: this.dragon, to: -this.winWidth*1.5/this.aspect, duration: 8000}), 3000)
      this.dragon.actions[5].setLoop(THREE.LoopOnce)
      this.dragon.actions[5].play()

      this.ocelot.actions[4].play()
      this.caracal.actions[4].play()
      this.char.actions[1].play()
      this.caracal.actions[0].fadeOut(0.5)
      this.ocelot.actions[0].fadeOut(0.5)
      this.char.actions[14].fadeOut(0.5)
      setTimeout( ()=>{
        this.dragon.actions[1].fadeIn(0.5),
      this.dragon.actions[1].play(),
      this.dragon.actions[0].fadeOut(0.5)
      }
        ,3000)
        setTimeout( ()=>{
          this.dragon.actions[1].fadeOut(1)
          this.dragon.actions[0].enabled =true
          this.dragon.actions[0].fadeIn(0.5)
          this.dragon.actions[0].play()
        }
          ,10000)

      this.caracal.mesh.rotation.y = Math.PI
      this.char.mesh.rotation.y = Math.PI 
      this.ocelot.mesh.rotation.y = Math.PI

      this.caracal.mesh.rotation.x = -Math.PI/2
      this.char.mesh.rotation.x = -Math.PI /2
      this.ocelot.mesh.rotation.x =- Math.PI/2

      for (let i = 0; i < this.planes.length; i++) {
        this.executeAction('move-element', {element: this.planes[i], to: -(this.fondPerdu*(4-i)), duration: 11000})
        console.log((this.fondPerdu*(4-i)))
        console.log(this.planes[i])
      }

      this.char.anims.push(new Bard.Animation({
        from: this.char.mesh.position.x,
        to:-(this.winWidth*1.4/this.aspect)+this.char.mesh.position.x,
        duration: 11000,
        onProgress:  (advancement, time) => {
          var easeTime = Bard.Easing.easeInOutQuint(advancement)
          this.char.mesh.position.x = time
          this.book.scene.camera.position.x = advancement*(-this.winWidth*1.5/this.aspect)
        },
        onFinish: ()=>{
          this.ocelot.actions[4].stop()
          // this.dragon.actions[2].stop()
          this.caracal.mesh.rotation.y = 0
          this.char.mesh.rotation.y =0 
          this.ocelot.mesh.rotation.y = 0

          this.caracal.actions[0].enabled =true
          this.caracal.actions[0].fadeIn(0.5)
          this.caracal.actions[0].play()
          this.ocelot.actions[0].enabled =true
          this.ocelot.actions[0].fadeIn(0.5)
          this.ocelot.actions[0].play()

          this.char.actions[14].enabled =true
          this.char.actions[14].fadeIn(0.5)
          this.char.actions[14].play()
          
          this.caracal.mesh.rotation.x = Math.PI/2
          this.char.mesh.rotation.x = Math.PI /2
          this.ocelot.mesh.rotation.x = Math.PI/2
          this.char.actions[1].stop()
          this.caracal.actions[4].stop()
        
        }
      }))
    })

    this.addAction('ocelot-talk', (e)=>{
      this.ocelot.actions[6].setLoop(THREE.LoopOnce)
      this.ocelot.actions[6].play()
    })
    
    this.addAction('dragon-talk',()=>{
      this.dragon.actions[3].enabled = true
      this.dragon.actions[3].crossFadeFrom(this.dragon.actions[0], 1)
      this.dragon.actions[3].play()
    })

    this.addAction('ocelot-respond', (e)=>{
      this.dragon.actions[3].crossFadeTo(this.dragon.actions[0], 0.5)
      this.dragon.actions[0].enabled =true
      this.dragon.actions[0].play()
      this.ocelot.actions[5].setLoop(1,2)
      this.ocelot.actions[5].play()
      text.next();
    })

    
    this.addAction('dragon-respond', (e)=>{
      this.robotClickable = true

      text.next();
      this.dragon.actions[3].enabled = true
      this.dragon.actions[3].crossFadeFrom(this.dragon.actions[0], 1)
      this.dragon.actions[3].play()
    })

    this.addAction("robot-click", ()=>{
      if(this.robotClickable) {
        this.dragon.actions[3].fadeOut(0.4)
        this.robotClickable = false
        this.robot.actions[1].setLoop(THREE.LoopOnce)
        this.robot.actions[1].play()
        text.next();
      }
    })

    this.robot.on('click', ()=>{
      this.executeAction("robot-click");
    })

    this.addAction('dragon-wigle', (e)=>{
    
    })

    this.addAction('dragon-roar', (e)=>{
      // this.king.mesh.position.x = this.dragon.mesh.position.x + (this.winWidth*0.4/this.aspect)
     
      // this.ocelot.actions[8].setLoop(THREE.LoopOnce)
     
      // this.ocelot.actions[9].crossFadeFrom(this.ocelot.actions[0], 0.2)
      this.ocelot.actions[0].stop()
      this.ocelot.actions[7].play()

      // this.caracal.actions[7].setLoop(THREE.LoopOnce)
      // this.caracal.actions[9].crossFadeFrom(this.caracal.actions[0], 0.2)
      this.caracal.actions[0].stop()
      this.caracal.actions[7].play()

      // this.char.actions[11].setLx  oop(THREE.LoopOnce)
      // this.char.actions[9].crossFadeFrom(this.char.actions[0], 0.2)
      this.char.actions[11].play()
      this.dragon.actions[0].stop()

      this.dragon.actions[0].crossFadeTo(this.dragon.actions[4], 0.5)

      this.dragon.actions[4].setLoop(THREE.LoopOnce)
      this.dragon.actions[4].play()
      text.next();
    })

    this.addAction('dragon-death', (e)=>{
      this.dragon.actions[6].setLoop(THREE.LoopOnce)
      this.dragon.actions[6].clampWhenFinished = true
      this.dragon.actions[6].play()
      this.ocelot.actions[7].stop()
      this.caracal.actions[7].stop()

      this.ocelot.actions[0].enabled = true
      this.ocelot.actions[0].play()
      this.ocelot.actions[7].stop()

      // this.caracal.actions[7].setLoop(THREE.LoopOnce)
      // this.caracal.actions[9].crossFadeFrom(this.caracal.actions[0], 0.2)
      this.caracal.actions[0].enabled = true
      this.caracal.actions[0].play()
      this.caracal.actions[7].stop()
    })

    this.addAction('dragon-fade', (e)=>{
      this.serval.mesh.position.x = this.dragon.mesh.position.x - this.winWidth*0.2/this.aspect
      this.serval.mesh.rotation.y = Math.PI

      this.serval.mesh.rotation.x = -Math.PI/2

      this.dragon.anims.push(new Bard.Animation({
        duration: 2000,
        onProgress: (advancement, time) => {
          var easeTime = Bard.Easing.easeInOutQuint(advancement)
          this.dragon.mesh.children[0].traverse((child)=> {
            if(child['material']) {
              child.material.opacity = Math.min(Math.max((1-easeTime)*child.material.realOpacity,0),1)
            }
          })
        }
      }))
      this.serval.anims.push(new Bard.Animation({
        duration: 2000,
        onProgress: (advancement, time) => {
          var easeTime = Bard.Easing.easeInOutQuint(advancement)
          this.serval.mesh.children[0].traverse((child)=> {
            if(child['material']) {
              child.material.opacity = Math.min(Math.max((easeTime)*child.material.realOpacity,0),1)*0.6
            }
          })
        }
      }))
      this.servalUp = this.serval.getAnimationByName('se releve')
      this.servalUp.setLoop(THREE.LoopOnce)
      this.servalUp.play()

      this.king.mesh.children[0].traverse((child)=> {
        if(child['material']) {
          child.material.opacity = child.material.realOpacity
        }
      })
      this.soldat.mesh.children[0].traverse((child)=> {
        if(child['material']) {
          child.material.opacity = child.material.realOpacity
        }
      })
      this.king.mesh.position.x = this.dragon.mesh.position.x + this.winWidth*0.3/this.aspect

      this.executeAction('move-element', {element: this.king, to: -this.winWidth*0.3/this.aspect, duration: 4000})
      this.king.actions[2].play()

      this.soldat.mesh.position.x = this.dragon.mesh.position.x + this.winWidth*0.4/this.aspect

      this.executeAction('move-element', {element: this.soldat, to: -this.winWidth*0.3/this.aspect, duration: 4000})
      this.soldat.actions[4].play()

      setTimeout(()=>{
        this.king.actions[2].crossFadeTo(this.king.actions[4], 0.2)
        this.king.actions[4].play()
        this.soldat.actions[4].crossFadeTo(this.soldat.actions[0], 0.2)
        this.soldat.actions[0].play()
      },3500)

      
    })
    /**
     * ACTIONS
     */
    this.addAction('transitionIn', (e)=>{

      this.rocket.actions[4].play()
      this.rocket.actions[4].fadeOut( 5)
      this.rocket.actions[2].play()
      this.rocket.actions[2].fadeIn(5)

      this.liane.anims.push(new Bard.Animation({
        duration: 5000,
        from: this.liane.mesh.position.y-(this.winWidth*0.2/this.aspect),
        to: this.liane.mesh.position.y,
        onProgress: (advancement, time)=>{
          this.liane.mesh.position.y = time
        }
        
      }))
      this.liane2.anims.push(new Bard.Animation({
        duration: 4000,
        from: this.liane2.mesh.position.y-(this.winWidth*0.2/this.aspect),
        to: this.liane2.mesh.position.y,
        onProgress: (advancement, time)=>{
          this.liane2.mesh.position.y = time
        }
        
      }))
      this.liane3.anims.push(new Bard.Animation({
        duration: 4000,
        from: this.liane3.mesh.position.y-(this.winWidth*0.2/this.aspect),
        to: this.liane3.mesh.position.y,
        onProgress: (advancement, time)=>{
          this.liane3.mesh.position.y = time
        }
        
      }))

      this.rocket.anims.push(new Bard.Animation({
        duration: 4000,
        from: this.winWidth*0.5/this.aspect,
        to: this.rocket.mesh.position.y,
        timingFunction:'easeOutQuad',
        onProgress:(advancement, time)=> {
          this.rocket.mesh.position.y = time
          this.book.scene.woobleIntensity = advancement/8

        },
        onFinish:()=> {
          // this.rocket.actions[0].play()
          console.log(this.ocelot.actions)
          this.ocelot.getAnimationByName('faux fixe').play()
          this.ocelot.anims.push(new Bard.Animation({
            duration: 1000,
            onProgress: (advancement, time) => {
              var easeTime = Bard.Easing.easeInOutQuint(advancement)
              this.ocelot.mesh.children[0].traverse((child)=> {
                if(child['material']) {
                  child.material.opacity = easeTime*child.material.realOpacity
                }
              })

              this.book.scene.woobleIntensity = (1 - time)*(1/8)
            }
          }))

          this.robot.getAnimationByName('faux fixe').play()
          this.robot.anims.push(new Bard.Animation({
            duration: 1000,
            onProgress: (advancement, time) => {
              var easeTime = Bard.Easing.easeInOutQuint(advancement)
              this.robot.mesh.children[0].traverse((child)=> {
                if(child['material']) {
                  child.material.opacity = easeTime*child.material.realOpacity
                }
              })
            }
          }))
          console.log(this.char.actions)
          this.caracal.getAnimationByName('faux fixe').play()
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

          this.char.getAnimationByName('faux-fixe').play()
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
      for (let i = 0; i < this.planes.length; i++) {
        this.planes[i].anims.push(new Bard.Animation({
          duration: 2700,
          from: this.planes[i].mesh.position.y-(this.winWidth*0.03*i/this.aspect),
          to: this.planes[i].mesh.position.y,
          onProgress: (advancement, time)=>{
            this.planes[i].mesh.position.y = time
          }
        }))        
      }
    }, {
      once: true
    })

    this.addAction("next",  e => text.next())


    this.on("start", ()=>{
      
      for(var i=0; i<this.elements.length; i++)
        this.elements[i].display();
      this.book.scene.camera.position.y = 50
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
  
    this.fondPerdu = (this.winWidth*0.5)/this.aspect
    
  }

  render() {
    this.beforeRender();
    this.afterRender();
  }

  initListeners() {}
}
