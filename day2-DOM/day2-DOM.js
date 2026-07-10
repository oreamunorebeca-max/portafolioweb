/*DOM
Document Object Model, es una representación en forma de arbol de todos
los elementos html
document 
I________________body
        |__________h1
        |__________p
*/

// Ejemplo de boton para subir al inicio de la pagina a partir de la segunda seccion
let btnsubir = document.querySelector(".subir");
let segundaSeccion = document.querySelector(".usuario");

function subir(){
    if(window.scrollY >= (segundaSeccion.offsetTop - 100)){
        btnsubir.classList.add("mostrar");
    } else {
        btnsubir.classList.remove("mostrar");
    }
}
window.addEventListener("scroll", subir);

// Ejemplo 1 cambio de color
function modoOscuro() {
    let light = document.querySelector(".light");
    let btnlight = document.querySelector("#btnlight");
    if(light.style.background === "white" || light.style.background === ""){
        light.style.background = "black";
        light.style.color = "white";
        btnlight.textContent = "Modo Claro";
    } else {
        light.style.background = "white";
        light.style.color = "black";
        btnlight.textContent = "Modo Oscuro";
    }
}

// Ejemplo 2 mostrar valor escrito 
function mostrarNombre(){
    let nombre = document.querySelector("#usuario").value;
    document.querySelector("#saludo").textContent = "Hola " + nombre;
}

// Ejemplo 3 calculo con valores de usuario
let btnSuma = document.querySelector("#btnSuma");
let btnResta = document.querySelector("#btnResta"); 
let btnMultiplicacion = document.querySelector("#btnMultiplicacion");
let btnDivision = document.querySelector("#btnDivision");
let resultadoSumar = document.querySelector("#resultadoSumar");

function sumarNumeros(){
    let cifra1 = Number(document.querySelector("#cifra1").value);
    let cifra2 = Number(document.querySelector("#cifra2").value);
    let resultado = cifra1 + cifra2;
    resultadoSumar.textContent = "Resultado: " + resultado;
}
btnSuma.addEventListener("click", sumarNumeros);

function restarNumeros(){
    let cifra1 = Number(document.querySelector("#cifra1").value);
    let cifra2 = Number(document.querySelector("#cifra2").value);
    let resultado = cifra1 - cifra2;
    resultadoSumar.textContent = "Resultado: " + resultado;
}
btnResta.addEventListener("click", restarNumeros);

function multiplicarNumeros(){
    let cifra1 = Number(document.querySelector("#cifra1").value);
    let cifra2 = Number(document.querySelector("#cifra2").value);
    let resultado = cifra1 * cifra2;
    resultadoSumar.textContent = "Resultado: " + resultado;
}
btnMultiplicacion.addEventListener("click", multiplicarNumeros);

function dividirNumeros(){
    let cifra1 = Number(document.querySelector("#cifra1").value);
    let cifra2 = Number(document.querySelector("#cifra2").value);
    let resultado = cifra1 / cifra2;
    resultadoSumar.textContent = "Resultado: " + resultado;
}
btnDivision.addEventListener("click", dividirNumeros);


// Ejemplo 4 cambio de color de fondo con clase
let seccionFondo = document.querySelector(".fondo");
let btnFondo = document.querySelector("#btnColor");
let colores = ["DeepPink", "PaleVioletRed", "DarkOrchid", "DarkTurquoise", "DarkCyan", "Teal", "LightSeaGreen",  "DarkOliveGreen", "DarkGreen", "DarkSlateGray", "DarkBlue", "DarkSlateBlue", "Indigo"];
let indiceColor = 0; 
let nombreColores = document.querySelector("#nombreColores");

function cambiarColor(){
    seccionFondo.style.background = colores[indiceColor];
    nombreColores.textContent = "El color de fondo es:  " + colores[indiceColor];
    seccionFondo.style.color = "white"; 
    indiceColor++;
    if(indiceColor >= colores.length){
        indiceColor = 0;
    }
}           
btnFondo.addEventListener("click", cambiarColor);

// Ejemplo 5 detectar posisicion del scroll
let scrollPosition = document.querySelector("#scrollPosition");
let header = document.querySelector("#header");

function mostrarScroll(){
    let pixeles = (window.scrollY).toFixed(0);
    scrollPosition.textContent = "El scroll está en:  " + pixeles + "px";

    if(pixeles > 800){
        header.style.background = "cyan";
        header.style.color = "teal";
    } else {
        header.style.background = "teal";
        header.style.color = "white";
    }
}
window.addEventListener("scroll", mostrarScroll);
mostrarScroll();