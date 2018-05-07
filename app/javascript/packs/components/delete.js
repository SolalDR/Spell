
export default function manageDeleteRecords() {
  var links = document.querySelectorAll("*[data-method='delete']");
  for(var i=0; i<links.length; i++){
    (function(link){

      link.addEventListener("click", function(e){
        var my_form = document.createElement('form');
        my_form.method='POST';
        my_form.action = this.href;

        var method = document.createElement('input');
        method.type = 'hidden';
        method.name='_method';
        method.value='delete';


        var token = document.createElement('input');
        token.type = 'hidden';
        token.name='authenticity_token';
        token.value = document.querySelector("meta[name='csrf-token']").getAttribute("content");

        my_form.appendChild(token);
        my_form.appendChild(method);

        document.body.appendChild(my_form);
        my_form.submit();
        
        e.preventDefault();
        return false;
      })

    }(links[i]));
  }  
}
