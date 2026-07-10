// 1. Detectar scroll para Header y Logo
let header = document.querySelector("#header");
let logo = document.querySelector("#logo");

function detectarScroll() {
    let pixeles = window.scrollY;
    if (pixeles > 800) {
        header.classList.add("scrolled");
        logo.style.filter = "brightness(0) invert(1)"; 
    } else {
        header.classList.remove("scrolled");
        logo.style.filter = "none"; 
    }
}
window.addEventListener("scroll", detectarScroll);

// 2. Contadores animados
let contadores = document.querySelectorAll(".contador");
let n1 = 0, n2 = 0, n3 = 0, n4 = 0;
let e1 = false, e2 = false, e3 = false, e4 = false;

function cont1() { if (n1 < 1500) { n1 += 25; contadores[0].textContent = n1; requestAnimationFrame(cont1); } else { contadores[0].textContent = 1500; } }
function cont2() { if (n2 < 83) { n2 += 1; contadores[1].textContent = n2; requestAnimationFrame(cont2); } else { contadores[1].textContent = 83; } }
function cont3() { if (n3 < 965) { n3 += 15; contadores[2].textContent = n3; requestAnimationFrame(cont3); } else { contadores[2].textContent = 965; } }
function cont4() { if (n4 < 25) { n4 += 1; contadores[3].textContent = n4; requestAnimationFrame(cont4); } else { contadores[3].textContent = 25; } }

window.addEventListener("scroll", function() {
    let h = window.innerHeight;
    if (contadores.length > 0) {
        let posicionTop = contadores[0].getBoundingClientRect().top;
        if (h - posicionTop > 0) { 
            if (e1 === false) { e1 = true; cont1(); }
            if (e2 === false) { e2 = true; cont2(); }
            if (e3 === false) { e3 = true; cont3(); }
            if (e4 === false) { e4 = true; cont4(); }
        }
    }
});

// 3. Slider de imágenes con flechas y automático
let slides = document.querySelectorAll(".slide");
let anterior = document.querySelector("#anterior");
let siguiente = document.querySelector("#siguiente");
let index = 0;

function mostrarSlide(posicion) {
    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove("active");
    }
    slides[posicion].classList.add("active");
}

function avanzarSlide() {
    index++;
    if (index >= slides.length) {
        index = 0;
    }
    mostrarSlide(index);
}

function retrocederSlide() {
    index--;
    if (index < 0) {
        index = slides.length - 1;
    }
    mostrarSlide(index);
}

siguiente.addEventListener("click", avanzarSlide);
anterior.addEventListener("click", retrocederSlide);

setInterval(avanzarSlide, 4000);

// 4. Menú hamburguesa
let menuToggle = document.querySelector("#menuToggle");
let nav = document.querySelector("#nav");

menuToggle.addEventListener("click", function() {
    nav.classList.toggle("show"); 
});

let enlacesMenu = document.querySelectorAll("#nav a");
for (let i = 0; i < enlacesMenu.length; i++) {
    enlacesMenu[i].addEventListener("click", function() {
        nav.classList.remove("show");
    });
}

