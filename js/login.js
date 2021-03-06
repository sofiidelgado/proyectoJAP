const inputs = document.querySelectorAll("#inicioSesion input");
console.log(inputs);
const expresiones = {
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    password: /^.{4,12}$/ };
const datos = {
        correo: false,
        password: false };

function redireccionar() { location.href="pagina-principal.html"
};

//Acá hice validaciones en los campos de correo y contraseña usando expresiones regulares y agregando o removiendo clases.
const validarDatos = (e) => { 
    switch (e.target.name) {
        case "email": 
        if (expresiones.correo.test(e.target.value)) {
            document.getElementById("userCorreo").classList.remove("form-grupo-incorrecto")
            document.getElementById("userCorreo").classList.add("form-grupo-correcto")
            document.querySelector("#userCorreo i").classList.add("fa-check-circle")
            document.querySelector("#userCorreo i").classList.remove("fa-times-circle")
            document.querySelector("#userCorreo .form-input-error").classList.remove("form-input-error-activo")
            datos.correo = true  }
        else { document.getElementById("userCorreo").classList.add("form-grupo-incorrecto")
        document.getElementById("userCorreo").classList.remove("form-grupo-correcto")
        document.querySelector("#userCorreo i").classList.add("fa-times-circle")
        document.querySelector("#userCorreo i").classList.remove("fa-check-circle")
        document.querySelector("#userCorreo .form-input-error").classList.add("form-input-error-activo") 
        datos.correo = false }
        break;
        case "contraseña": 
        if (expresiones.password.test(e.target.value)) {
            document.getElementById("userContraseña").classList.remove("form-grupo-incorrecto")
            document.getElementById("userContraseña").classList.add("form-grupo-correcto")
            document.querySelector("#userContraseña i").classList.add("fa-check-circle")
            document.querySelector("#userContraseña i").classList.remove("fa-times-circle")
            document.querySelector("#userContraseña .form-input-error").classList.remove("form-input-error-activo")
            datos.password = true  }
        else { document.getElementById("userContraseña").classList.add("form-grupo-incorrecto")
        document.getElementById("userContraseña").classList.remove("form-grupo-correcto")
        document.querySelector("#userContraseña i").classList.add("fa-times-circle")
        document.querySelector("#userContraseña i").classList.remove("fa-check-circle")
        document.querySelector("#userContraseña .form-input-error").classList.add("form-input-error-activo") 
        datos.password = false }
        break;
    }
}
//Eventos para validar en los inputs
inputs.forEach((input) => {
    input.addEventListener("keyup", validarDatos);
    input.addEventListener("blur", validarDatos);
});

//si todo está bien, el botón nos va a redirigir a la Página principal, de lo contrario nos muestra un mensaje de error
document.getElementById("boton").addEventListener("click", function(){

    if (datos.correo && datos.password) { 
    
        localStorage.setItem('UserLogged', document.getElementById("correo").value);
    
    redireccionar(); }
    else {
		document.getElementById('mensaje-error').classList.add('form-mensaje-activo');
	}
});
	
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){ 
});