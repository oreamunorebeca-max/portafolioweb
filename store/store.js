/*Crear un array que almacenara todos 
los productos  que vienen  desde el JSON*/

let products = [];

/*Variable que controla cuantos productos
mostrar inicialmente */

let productsVisibles = 6;

/*Elementos del DOM*/

//Contenedor donde cargaran las cards

let container = document.querySelector ("#containerProductos");

//Input del buscador

let buscador = document.querySelector ("#buscador");

//Select para ordenar

let selectOrdenar = document.querySelector ("#ordenar");

/**Cargar archivo| JSON */

//Sirve para pedir informacion

fetch ("products.json")

//convertir la respuesta a un formato que JSON
.then (response => response.json())

//Corvertimos el JSON a datos  manejables por JS
.then (data => {
    //guardamos los productos en el array principal
    products = data;
    //llamar a la funcion que muestra los productos
    mostrarProductos(products);
})

//Funcion mostrar productos

function mostrarProductos (lista){
    //limpiar contenedor para evitar que se repitan los productos
    container.innerHTML = "";
    //variable para limitar los productos visibles
    let productsMostrados = lista.slice(0, productsVisibles);
    //recorrer cada uno de los productos
    productsMostrados.forEach (producto => {
        //variable para el stock
        let textoStock = "" ;
        let claseStock = "";
        //validar stock
        if (producto.stock > 0){
            //texto que vera el usuario
            textoStock = "Disponible:  " + producto.stock;
            //Aplicar clase 
            claseStock = "disponible";
        }else {
            textoStock = "Agotado";
            claseStock = "agotado";
        }
        //crear la card html
        // += significa agregar  mas contenido
        container.innerHTML += ` 
        <div class="card">
            <img src="${producto.imagen}">
            <div class="info">
                <h2>${producto.nombre}</h2>
                <p class= "precio">Precio: ₡${producto.precio}</p>
                <p class= "stock ${claseStock}">${textoStock}</p>
                <button class="btn">Agregar al carrito</button>
            </div>
        </div>        
        `;
    });     
}

//Buscador 

//Escuchar cuando el usuario escriba en el input

buscador.addEventListener ("input", function (){
//obtener el valor del input y convertilo a minuscula
let texto = this.value.toLowerCase();
//filtrar  productos
let filtrados  = products.filter(producto =>
    producto.nombre.toLowerCase().includes(texto)
);
//reiniciar los productos visibles
productsVisibles = 6;
//mostrar los productos filtrados
mostrarProductos(filtrados);
});
//Ordenar productos
//Detectar cuando se cambia el select

selectOrdenar.addEventListener ("change", function (){
//crear una copia del array, porque sort si modifica el array
    let copia = [...products];
    //ordenar menor a mayor
    if(selectOrdenar.value =="menor"){
        //sort compara dos elementos, (a y b) 
        // si el resultado es negativo (a) va primero
        copia.sort((a, b) => {
            return a.precio - b.precio;
        });
   }
//ordenar mayor a menor
    else if (selectOrdenar.value == "mayor"){
        copia.sort((a, b) => {
            return b.precio - a.precio;
        });
    }
//reiniciar cantidad visible
productsVisibles = 6;
//mostrar productos ordenados
mostrarProductos(copia);
});
//Scroll infinito
window.addEventListener ("scroll",  function(){
    //detectar si el usuario llego abajo
    //window.innerHeight  =>altura visible de la ventana 
    //window.scrollY => cuanto ha bajado el usuario
    //document.body.offsetHeight=> altura total de la pagina
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100){
        //aumentamos la cantidad visible
        productsVisibles += 2;
        mostrarProductos(products);
    }
});
