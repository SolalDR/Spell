let annyang = require('annyang')

if (annyang) {
    // Let's define a command. 
    annyang.setLanguage('fr-FR')

    var commands = {
      "la forêt s'assombrit": function() { alert('Hello world!'); },
      "la forêt sa sonnerie": function() { alert('Hello world!'); }
    };
    


    annyang.addCallback('result', function(phrases){
        console.log(phrases)
        console.log('ok')
    })
    // Add our commands to annyang 
    annyang.addCommands(commands);
   
    // Start listening. 
    annyang.start();
  }