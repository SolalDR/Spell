  
import CodeMirror from "codemirror";
import Js from "codemirror/mode/jsx/jsx.js";

export default {
  init: function() {
     var editors = document.querySelectorAll(".codemirror__textarea");
    editors.forEach((editor)=>{
      var editor = CodeMirror.fromTextArea(editor, {
        lineNumbers: true,
        mode:  "javascript",
        theme: "material"      
      });
    })
  }
}
