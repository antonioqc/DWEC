document.addEventListener("DOMContentLoaded", function () {
document.addEventListener("click",alertCookie); //Evento
    document.cookie = "nombre=antonio"; //Creación
    document.cookie = "apellidos=quesada cuadrado";
    //document.cookie = "apellidos = qc"; //Modificamos valor cookie
    function alertCookie() {
        alert(document.cookie);

    }

})
