class Http {
  
  constructor(params = {}){
    this.xhr = new XMLHttpRequest();
    this.events = {};
    this.eventsList = ["send", "open", "success", "error", "progress", "load", "abort"];
    this.init(params);
    this.open();
    if( params.auto ) this.send();
  }

  init(params){
    this.method = !params.method || params.method.match(/get/i) ? "GET" : "POST";
    if( params.params ) this.arguments = params.params;
    if( params.args ) this.arguments = params.args;
    if( params.action ) this.url = params.action; 
    if( params.url ) this.url = params.url;
    if( params.events )
      for(var event in params.events )
        this.on(event, params.event[event]);
   
    this.sanitizeUrl();

    this.data = new FormData();
    for(var i in this.arguments){
      this.data.append(i, this.arguments[i]);
    }
  }

  sanitizeUrl() {

  }

  initListener() {
    this.xhr.addEventListener("progress", ()=>{ this.emit("progress"); })
    this.xhr.addEventListener("load", ()=>{ this.emit("load"); })
    this.xhr.addEventListener("error", ()=>{ this.emit("error"); })
  }

  open(){
    this.xhr.open(this.method, this.url, true);
    this.emit("open");
    this.initListener();
  }

  send(){
    this.xhr.send(this.data);
  }

  /*******************************
  *
  *     Event system
  *
  *********************************/

  hasEvent(event) {
    return this.eventsList.indexOf(event) >= 0 ? true : false;
  }

  eventExist(event, callback){
    var exist = false;
    if( this.events[event] ) {
      for(var i=0; i<this.events[event].length; i++){
        if( this.events[event] == callback ){
          exist = true;
        }
      }
    }
    return exist;
  }

  emit(e, args = {}){

    var list = e instanceof Array ? e : [e];
    for(var j=0; j<list.length; j++){
      if( this.events[list[j]] && this.events[list[j]].length ){
        for(var i=0; i<this.events[list[j]].length; i++ ){
        var callback = this.events[list[j]][i];
          callback.call(this, args);
        }
      }
    }
  }

  on(event, callback){
    if( typeof this.events[event] == "undefined" )
      if (parseInt(this.eventsList.indexOf(event)) >= 0)
        this.events[ event ] = [];
      else
        console.warn(`The event "${event}" doesn't exist`)
    
    if( this.events[event] && !this.eventExist(event, callback) ) {
      this.events[event].push(callback);
    }
  }

  off(event, callback){
    if(this.events[event]){
      var i = this.events[event].indexOf(callback);
      if( i >= 0){
        this.events[event].splice(i, 1);
      }
    }
  }
}

export default Http;

