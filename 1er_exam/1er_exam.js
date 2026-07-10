// 1. Header Scroll
window.addEventListener("scroll", () => {
    let header = document.querySelector("#header");
    let logo = document.querySelector("#logo");
    if (window.scrollY > 100) {
        header.classList.add("scrolled");
        logo.style.filter = "brightness(0) invert(1)";
    } else {
        header.classList.remove("scrolled");
        logo.style.filter = "none";
    }
});

// 2. Contadores (Lógica simplificada)
let contadores = document.querySelectorAll(".contador");
let activado = false;

window.addEventListener("scroll", () => {
    let stats = document.querySelector(".estadisticas");
    let posicion = stats.getBoundingClientRect().top;
    
    if (posicion < window.innerHeight && !activado) {
        activado = true;
        contadores.forEach(c => {
            let meta = +c.getAttribute("data-numero");
            let actual = 0;
            let incremento = meta / 50;
            
            let timer = setInterval(() => {
                actual += incremento;
                c.textContent = Math.floor(actual);
                if (actual >= meta) {
                    c.textContent = meta;
                    clearInterval(timer);
                }
            }, 30);
        });
    }
});

// 3. Menú Hamburguesa
let menuToggle = document.querySelector("#menuToggle");
let nav = document.querySelector("#nav");

menuToggle.addEventListener("click", () => {
    nav.classList.toggle("show");
});
