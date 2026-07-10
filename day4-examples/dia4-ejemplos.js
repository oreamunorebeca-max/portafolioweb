// ------------- 1. Menu hamburguesa -----------------------
let bars = document.querySelector("#bars");
let menu = document.querySelector("#menu");

bars.addEventListener("click", function() {
    menu.classList.toggle("mostrar");
});

// ------------- 2. Barra de progreso -----------------------
let barritaProgreso = document.querySelector("#barritaProgreso");

window.addEventListener("scroll", function() {
    let alturaContenido = document.documentElement.scrollHeight - window.innerHeight;
    let progreso = (window.scrollY / alturaContenido) * 100;
    barritaProgreso.style.width = progreso + "%";
});

// ------------- 3. Ventana Modal -----------------------
let abrirModal = document.querySelector("#abrirModal");
let ventanamodal = document.querySelector("#ventanamodal");
let btnCerrarJs = document.querySelector("#btnCerrarJs");

abrirModal.addEventListener("click", function() {
    ventanamodal.style.display = "flex";
});

btnCerrarJs.addEventListener("click", function() {
    ventanamodal.style.display = "none";
});

ventanamodal.addEventListener("click", function(e) {
    if (e.target === ventanamodal) {
        ventanamodal.style.display = "none";
    }
});

// ------------- 4. Animación de Contadores al hacer Scroll -----------------------
let contadores = document.querySelectorAll(".counter");
let velocidad = 100; 
let metas = [1500, 8400, 3200]; 
let yaCorrio = false; // Bandera para que solo corra una vez

window.addEventListener("scroll", function() {
    // Detectamos la posición del contenedor de los contadores
    let contenedorContadores = document.querySelector(".contenedor-padre");
    let posicionContenenedor = contenedorContadores.getBoundingClientRect().top;
    let alturaPantalla = window.innerHeight;

    // Si el contenedor entra en la visualización de la pantalla y no ha corrido antes
    if (posicionContenenedor < alturaPantalla && !yaCorrio) {
        yaCorrio = true; // Bloqueamos para que no se repita al seguir haciendo scroll

        contadores.forEach((contador, index) => {
            let actualizarContador = () => {
                let meta = metas[index];
                let valorActual = +contador.innerText;
                let incremento = Math.ceil(meta / velocidad);

                if (valorActual < meta) {
                    contador.innerText = valorActual + incremento;
                    setTimeout(actualizarContador, 20);
                } else {
                    contador.innerText = meta;
                }
            };
            actualizarContador();
        });
    }
});

// ------------- 5. Carrusel / Slider -----------------------
let sliderBox = document.querySelector(".slider-box");
let btnPrev = document.querySelector("#btnPrev");
let btnNext = document.querySelector("#btnNext");
let posicion = 0;
let totalElementos = document.querySelectorAll(".slider-box .gallery").length;

btnNext.addEventListener("click", function() {
    if (posicion < totalElementos - 1) {
        posicion++;
    } else {
        posicion = 0;
    }
    sliderBox.style.transform = `translateX(-${posicion * 800}px)`;
});

btnPrev.addEventListener("click", function() {
    if (posicion > 0) {
        posicion--;
    } else {
        posicion = totalElementos - 1;
    }
    sliderBox.style.transform = `translateX(-${posicion * 800}px)`;
});

// ------------- 6. Galería Interactiva con Filtros ----------
let botonesFiltro = document.querySelectorAll(".filtros button");
let imagenesGaleria = document.querySelectorAll(".fotos .item");

botonesFiltro.forEach(boton => {
    boton.addEventListener("click", function() {
        let filtro = boton.getAttribute("data-filter");

        imagenesGaleria.forEach(img => {
            if (filtro === "todo") {
                img.style.display = "block";
            } else if (img.classList.contains(filtro)) {
                img.style.display = "block";
            } else {
                img.style.display = "none";
            }
        });
    });
});

// ------------- 7. Lightbox -----------------------
let lightbox = document.querySelector("#lightbox");
let lightboxImg = document.querySelector("#lightbox-img");

imagenesGaleria.forEach(img => {
    img.addEventListener("click", function() {
        lightboxImg.src = img.src;
        lightbox.style.display = "flex";
    });
});

lightbox.addEventListener("click", function() {
    lightbox.style.display = "none";
});