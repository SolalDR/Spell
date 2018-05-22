class Http {
  constructor(method, url, params = {}){

  }
}


var a = new Http("get", "http://localhost:4999/test/:id/", {
  onSuccess: function(){

  },
  onError: function(){

  },
  params: {
    id: 3,
    bruh: 'Yolo'
  }
})

