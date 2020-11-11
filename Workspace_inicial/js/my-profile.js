//VALIDAR DATOS PERSONALES
const formulario = document.getElementById("myProfile");
console.log(formulario);
const inputs = document.querySelectorAll("#myProfile input");
console.log(inputs);
const expresiones = {
	nombre: /^[a-zA-Z\_\-]{2,16}$/, 
    apellido: /^[a-zA-Z\_\-]{2,16}$/,
    edad: /^\d{2,3}$/,
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    telefono: /^\d{7,14}$/ 
}
const campos = {
    nombre: false,
    apellido: false,
    edad: false,
    correo: false,
    telefono: false,
}

const validarForm = (e) => { 
    switch (e.target.name) {
        case "name": 
        if (expresiones.nombre.test(e.target.value)) {
            document.getElementById("userName").classList.remove("form-grupo-incorrecto")
            document.getElementById("userName").classList.add("form-grupo-correcto")
            document.querySelector("#userName i").classList.add("fa-check-circle")
            document.querySelector("#userName i").classList.remove("fa-times-circle")
            document.querySelector("#userName .form-input-error").classList.remove("form-input-error-activo")
            campos.nombre = true  }
        else { document.getElementById("userName").classList.add("form-grupo-incorrecto")
        document.getElementById("userName").classList.remove("form-grupo-correcto")
        document.querySelector("#userName i").classList.add("fa-times-circle")
        document.querySelector("#userName i").classList.remove("fa-check-circle")
        document.querySelector("#userName .form-input-error").classList.add("form-input-error-activo") 
        campos.nombre = false }
        break;

        case "lastName": 
        if (expresiones.apellido.test(e.target.value)) {
            document.getElementById("userLastName").classList.remove("form-grupo-incorrecto")
            document.getElementById("userLastName").classList.add("form-grupo-correcto")
            document.querySelector("#userLastName i").classList.add("fa-check-circle")
            document.querySelector("#userLastName i").classList.remove("fa-times-circle")
            document.querySelector("#userLastName .form-input-error").classList.remove("form-input-error-activo")
        campos.apellido = true }
        else { document.getElementById("userLastName").classList.add("form-grupo-incorrecto")
        document.getElementById("userLastName").classList.remove("form-grupo-correcto")
        document.querySelector("#userLastName i").classList.add("fa-times-circle")
        document.querySelector("#userLastName i").classList.remove("fa-check-circle")
        document.querySelector("#userLastName .form-input-error").classList.add("form-input-error-activo") 
    campos.apellido = false }
        break;
        case "age": 
        if (expresiones.edad.test(e.target.value)) {
            document.getElementById("userAge").classList.remove("form-grupo-incorrecto")
            document.getElementById("userAge").classList.add("form-grupo-correcto")
            document.querySelector("#userAge i").classList.add("fa-check-circle")
            document.querySelector("#userAge i").classList.remove("fa-times-circle")
            document.querySelector("#userAge .form-input-error").classList.remove("form-input-error-activo")
        campos.edad = true}
        else { document.getElementById("userAge").classList.add("form-grupo-incorrecto")
        document.getElementById("userAge").classList.remove("form-grupo-correcto")
        document.querySelector("#userAge i").classList.add("fa-times-circle")
        document.querySelector("#userAge i").classList.remove("fa-check-circle")
        document.querySelector("#userAge .form-input-error").classList.add("form-input-error-activo") 
    campos.edad = false }
        break;
        case "email": 
        if (expresiones.correo.test(e.target.value)) {
            document.getElementById("userEmail").classList.remove("form-grupo-incorrecto")
            document.getElementById("userEmail").classList.add("form-grupo-correcto")
            document.querySelector("#userEmail i").classList.add("fa-check-circle")
            document.querySelector("#userEmail i").classList.remove("fa-times-circle")
            document.querySelector("#userEmail .form-input-error").classList.remove("form-input-error-activo")
        campos.correo = true }
        else { document.getElementById("userEmail").classList.add("form-grupo-incorrecto")
        document.getElementById("userEmail").classList.remove("form-grupo-correcto")
        document.querySelector("#userEmail i").classList.add("fa-times-circle")
        document.querySelector("#userEmail i").classList.remove("fa-check-circle")
        document.querySelector("#userEmail .form-input-error").classList.add("form-input-error-activo") 
    campos.correo  = false }
        break;
        case "telephone": 
        if (expresiones.telefono.test(e.target.value)) {
            document.getElementById("userPhone").classList.remove("form-grupo-incorrecto")
            document.getElementById("userPhone").classList.add("form-grupo-correcto")
            document.querySelector("#userPhone i").classList.add("fa-check-circle")
            document.querySelector("#userPhone i").classList.remove("fa-times-circle")
            document.querySelector("#userPhone .form-input-error").classList.remove("form-input-error-activo") 
        campos.telefono = true }
        else { document.getElementById("userPhone").classList.add("form-grupo-incorrecto")
        document.getElementById("userPhone").classList.remove("form-grupo-correcto")
        document.querySelector("#userPhone i").classList.add("fa-times-circle")
        document.querySelector("#userPhone i").classList.remove("fa-check-circle")
        document.querySelector("#userPhone .form-input-error").classList.add("form-input-error-activo")
    campos.telefono = false }
        break;
        
    }
    
}

inputs.forEach((input) => {
    input.addEventListener("keyup", validarForm);
    input.addEventListener("blur", validarForm);
});


formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    
    if (campos.nombre && campos.apellido && campos.edad && campos.correo && campos.telefono ) 
    {  document.getElementById("form-mensaje-exito").classList.add("form-mensaje-exito-activo");
		setTimeout(() => {
			document.getElementById("form-mensaje-exito").classList.remove("form-mensaje-exito-activo");
		}, 5000);

		document.querySelectorAll('.form-grupo-correcto').forEach((icono) => {
			icono.classList.remove('form-grupo-correcto');
		});
	} else {
		document.getElementById('form-mensaje').classList.add('form-mensaje-activo');
	}

})

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

//PARA GUARDAR DATOS
document.getElementById("submitProfile").addEventListener("click", function() {
var allDatos = [];

    datos = [];
    datos.push(document.getElementById("name").value);
    datos.push(document.getElementById("lastName").value);
    datos.push(document.getElementById("age").value);
    datos.push(document.getElementById("email").value);
    datos.push(document.getElementById("telephone").value);

    allDatos.push(datos);
    elArray = JSON.stringify(allDatos)
    localStorage.setItem('array', elArray);
mostrarDatos();

})

//SIN TERMINAR PROBANDO 123
function mostrarDatos(array){
x = JSON.parse(localStorage.getItem('array')); 
    //let htmlContentToAppend = "";
    for(let i=0; i < x.lenght; i++) {
        $("#myProfile").append("<form> <input value="+x[i][0]+"></input> </form>")

    /*let xx = x[i];
    let nom = document.getElementById("name").value;
    let ape = document.getElementById("lastName").value;
    let edad = document.getElementById("age").value;
    let corr = document.getElementById("email").value;
    let tel = document.getElementById("telephone").value;

    nom = datos.push(document.getElementById("name").value);
    ape = datos.push(document.getElementById("lastName").value);
    edad = datos.push(document.getElementById("age").value);
    corr = datos.push(document.getElementById("email").value);
    tel = datos.push(document.getElementById("telephone").value);
    
    htmlContentToAppend += `
    
    <input class="col" value="`+ xx[i][0] + `"></input>
    <input class="col" value="`+ xx[i][1] + `"></input>
    <p class="col" value="`+ xx[i][2] + `"></p>
    <p class="col" value="`+ xx[i][3] + `"></p>
    <p class="col" value="`+ xx[i][4] + `"></p>
    `;
    document.getElementById("datosPerfil").innerHTML = htmlContentToAppend;*/
    
    

    } }







});