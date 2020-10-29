/**
  * @author Mario Osuna Ordoñez
  */
document.addEventListener("DOMContentLoaded", function () {
  // Obtiene el campo de texto que vamos a moniterear
var field = document.getElementById("field");

// Espera por cambios en el campo de texto
field.addEventListener("change", function() {
  // Almacena el resultado en el objeto de almacenamiento de sesión 
  localStorage.setItem("autosave", field.value);
});
});


