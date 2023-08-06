const games = [
  { nombre: "Tic-Tac-Toe", imagen: "multimedia/tic_tac_toe.png" },
  { nombre: "Ahorcado", imagen: "multimedia/ahorcado.png" },
  { nombre: "Piedra, Papel o Tijera", imagen: "multimedia/piedra_papel_tijera.png" },
  { nombre: "Memorama", imagen: "multimedia/memorama.png" }  
];

let indice = 0;
function jugarJuego() {
  if(games[indice].nombre == "Tic-Tac-Toe"){
    location.href='GATO.2.html'
  }
  if(games[indice].nombre == "Ahorcado"){
    location.href='hanged.html'
  }
}

let contenedorJuegos = document.querySelector(".contenedor-juegos");

function cambiarJuego(cambio) {
  contenedorJuegos.classList.add("fade-out");
  indice += cambio;
  if (indice < 0) {
    indice = games.length - 1;
  } if (indice >= games.length) {
    indice = 0;
  }
  setTimeout(() => {
    actualizarJuego();
    contenedorJuegos.classList.add("fade-in")
  }, 500);

  setTimeout(() => {
    contenedorJuegos.classList.remove("fade-out")
    contenedorJuegos.classList.remove("fade-in")
  }, 1000);
}
  
function actualizarJuego() {
  const nombreJuego = document.getElementById("nombreJuego")
  const imagenJuego = document.getElementById("imagenJuego")
  
  nombreJuego.textContent = games[indice].nombre;
  imagenJuego.src = games[indice].imagen;
}
  
actualizarJuego();