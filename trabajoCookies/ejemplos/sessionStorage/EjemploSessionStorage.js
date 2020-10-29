/**
  * @author Mario Osuna Ordoñez
  */
document.addEventListener("DOMContentLoaded", function () {
  // Obtiene el campo de texto que vamos a moniterear
var field = document.getElementById("field");
 
// Verificamos si tenemos algún valor auto guardado
// (esto solo ocurrirá si la página es recargada accidentalmente)
if (sessionStorage.getItem("autosave")) {
  // Restaura el contenido al campo de texto
  field.value = sessionStorage.getItem("autosave");
}
 
// Espera por cambios en el campo de texto
field.addEventListener("change", function() {
  // Almacena el resultado en el objeto de almacenamiento de sesión 
  sessionStorage.setItem("autosave", field.value);
});
});



document.addEventListener("DOMContentLoaded", function () {
  var field = document.getElementById("field");

  
  if (sessionStorage.getItem("autosave")) {

    field.value = sessionStorage.getItem("autosave");
  }

  field.addEventListener("change", function () {
    sessionStorage.setItem("autosave", field.value);
  });
});



