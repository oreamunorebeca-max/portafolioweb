// juego de la serpiente usando - fruta aleatoria y crecimiento de la serpiente

//Buscar el elemento canvas en el DOM
let canvas = document.querySelector('#juego');
//Obtener contexto  2d
let ctx = canvas.getContext('2d');
//Tamaño de la cabeza sera de 20 x 20px
let blockSize = 20;
/*Posicion inicial de la serpiente
let snakeX = 100;
let snakeY = 100;*/
//Serpiente
let snake = [
    {x: 100, y: 100},
];
//Direccion inicial
let dx  = blockSize;
let dy = 0;
//Fruta - posicion inicial
let frutaX = 0;
let frutaY = 0;

// Variables para niveles y puntuación
let score = 0;
let nivel = 1;
let velocidad = 300;

const imgCabeza = new Image();
imgCabeza.src = 'images/cabezaserpiente.png'; 

const imgFruta = new Image();
imgFruta.src = 'images/manzana.png'; 

// Cargar sonidos
const sonidoEat = new Audio('sonidos/eat.wav');
const sonidoGameOver = new Audio('sonidos/game-over.mp3');
const sonidoLevelUp = new Audio('sonidos/level-up.mp3');

//Crear la primera fruta
crearFruta();

//Escuchar el teclado
document.addEventListener('keydown', cambiarDireccion);
//Cambiar direccion
function cambiarDireccion(event){
    //Guardar la tecla presionada
    let key = event.key;
    //flecha arriba
    if (key === "ArrowUp" && dy === 0) {
        dx = 0;
        dy = -blockSize;
    }else if (key  === "ArrowRight" && dx === 0){
        dx = blockSize;
        dy = 0;
    }else if (key === "ArrowDown" && dy === 0){
        dx = 0;
        dy = blockSize;
    }else if (key === "ArrowLeft" && dx === 0){
        dx = -blockSize;
        dy = 0;
    }
}

// Crear fruta  en posicion aleatoria
function crearFruta(){
    frutaX = Math.floor(Math.random() * (canvas.width / blockSize)) * blockSize;
    frutaY = Math.floor(Math.random() * (canvas.height / blockSize)) * blockSize;
    
    for(let i = 0; i < snake.length; i++) {
        if(snake[i].x === frutaX && snake[i].y === frutaY) {
            crearFruta();
            break;
        }
    }
}

//Crear  función para limpiar el canvas
function limpiarCanvas(){
    // clear rect borra una zona rectangular 
    ctx.clearRect(0,0,canvas.width,canvas.height);
}

function dibujarOvalo(x, y, w, h, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.ellipse(x + w/2, y + h/2, w/2, h/2, 0, 0, 2 * Math.PI);
    ctx.fill();
}

function dibujarFruta() {
    // Tamaño al doble
    let tamano = blockSize * 2;
    // Offset para centrar la imagen en la cuadrícula
    let offset = blockSize / 2;
    
    if (imgFruta.complete && imgFruta.naturalWidth !== 0) {
        ctx.drawImage(imgFruta, frutaX - offset, frutaY - offset, tamano, tamano);
    } else {
        dibujarOvalo(frutaX - offset, frutaY - offset, tamano, tamano, 'red');
    }
}

//Dibujar cabeza de la serpiente
function dibujarSerpiente()
{
    //color del bloque
    ctx.fillStyle = 'seagreen';
    //Dibujar rectangulo (adaptado a imágenes y óvalos para toda la serpiente)
    // Se dibuja en orden inverso para que la cabeza quede siempre por encima del cuerpo
    for (let i = snake.length - 1; i >= 0; i--) {
        // Tamaño al doble tanto para la cabeza como para las bolitas del cuerpo
        let tamano = blockSize * 2;
        let offset = blockSize / 2;

        if (i === 0) {
            if (imgCabeza.complete && imgCabeza.naturalWidth !== 0) {
                ctx.drawImage(imgCabeza, snake[i].x - offset, snake[i].y - offset, tamano, tamano);
            } else {
                dibujarOvalo(snake[i].x - offset, snake[i].y - offset, tamano, tamano, 'darkgreen');
            }
        } else {
            dibujarOvalo(snake[i].x - offset, snake[i].y - offset, tamano, tamano, 'seagreen');
        }
    }
}

//Verificar colision con los bordes
function verificarColision(cabeza){
    //borde izquierdo
    if ( cabeza.x < 0){
         return true;
    }

    //borde derecho
    if ( cabeza.x + blockSize > canvas.width){
        return true;
    }
    //borde superior
    if ( cabeza.y < 0){
        return true;
    }
    //borde inferior
    if ( cabeza.y + blockSize > canvas.height){
        return true;
    }
    
    for (let i = 1; i < snake.length; i++) {
        if (cabeza.x === snake[i].x && cabeza.y === snake[i].y) {
            return true;
        }
    }

    //Si no choca  con ningun borde
    return false;
}

//funcion principal del juego
function actualizarJuego (){
    // Actualizar posicion horizontal de la serpiente
    let nuevaCabezaX = snake[0].x + dx;
    // Actualizar posicion vertical de la serpiente
    let nuevaCabezaY = snake[0].y + dy;

    let nuevaCabeza = {x: nuevaCabezaX, y: nuevaCabezaY};

    //Revisar si choca con los bordes
     if (verificarColision(nuevaCabeza)){
        //Detener el juego
        clearInterval(gameLoop);
        
        // Reiniciar tiempo de sonido por si se cortó
        sonidoGameOver.currentTime = 0;
        sonidoGameOver.play().catch(error => console.log("Audio reproducido tras interacción"));
        
        // Retrasar el alert para permitir que el sonido se escuche y se dibuje el último frame
        setTimeout(() => {
            alert("Game Over! Puntaje obtenido: " + score + " - Nivel alcanzado: " + nivel);
        }, 100);
        return;
    }
    
    snake.unshift(nuevaCabeza);

    // Verificar si come la fruta
    if (nuevaCabeza.x === frutaX && nuevaCabeza.y === frutaY) {
        sonidoEat.currentTime = 0; 
        sonidoEat.play().catch(error => console.log("Audio reproducido tras interacción"));
        score++;
        
        // Aumento de nivel cada 5 frutas
        if (score % 5 === 0) {
            nivel++;
            sonidoLevelUp.currentTime = 0;
            sonidoLevelUp.play().catch(error => console.log("Audio reproducido tras interacción"));
            
            // Retrasar alert para que el sonido empiece a reproducirse y no bloquee el hilo
            setTimeout(() => {
                alert("¡Felicidades! Pasaste al nivel: " + nivel + "\nPuntaje actual: " + score);
            }, 100);

            // Aumentar velocidad reduciendo el tiempo del intervalo (límite mínimo 50ms)
            velocidad = Math.max(50, velocidad - 30);
            clearInterval(gameLoop);
            gameLoop = setInterval(actualizarJuego, 200);
        }
        
        crearFruta();
    } else {
        snake.pop(); 
    }

    //Borramos el dibujo anterior
    limpiarCanvas();
    dibujarFruta();
    // Dibujamos la serpiente en su nueva posicion
    dibujarSerpiente();  
}
let gameLoop = setInterval(actualizarJuego, 200);