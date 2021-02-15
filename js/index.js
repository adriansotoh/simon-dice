const celeste = document.getElementById("celeste");
const violeta = document.getElementById("violeta");
const naranja = document.getElementById("naranja");
const verde = document.getElementById("verde");
const button = document.getElementById("btnEmpezar");
const ULTIMO_NIVEL = 50;
const score = document.getElementById("score");
const mensaje = document.getElementById("mensaje");

class Juego {
  constructor() {
    this.inicializar = this.inicializar.bind(this);
    this.cambiarNivel = this.cambiarNivel.bind(this);
    this.toggleBtnEmpezar = this.toggleBtnEmpezar.bind(this);
    this.inicializar();
    this.generarSecuencia();
    setTimeout(this.siguienteNivel(), 500);
  }

  inicializar() {
    this.maximoScore = localStorage.getItem("puntos");
    if (this.maximoScore != null) {
      score.innerHTML = this.maximoScore;
    }
    this.siguienteNivel = this.siguienteNivel.bind(this);
    this.elegirColor = this.elegirColor.bind(this);
    this.toggleBtnEmpezar();
    this.puntos = 0;
    this.nivel = 1;
    this.colores = {
      celeste,
      violeta,
      naranja,
      verde,
    };
  }

  toggleBtnEmpezar() {
    if (button.classList.contains("hide")) {
      button.classList.remove("hide");
    } else {
      button.classList.add("hide");
    }
  }

  generarSecuencia() {
    this.secuencia = new Array(ULTIMO_NIVEL)
      .fill(0)
      .map((n) => Math.floor(Math.random() * 4));
  }

  cambiarNivel() {
    if (this.nivel === 1) {
      this.siguienteNivel();
    } else {
      swal(
        "Simon Dice",
        `Nivel ${this.nivel}    -   Puntuación: ${this.puntos}`
      ).then(this.siguienteNivel);
    }
  }

  siguienteNivel() {
    this.subNivel = 0;
    this.iluminarSecuencia();
    this.agregarEventosClick();
  }

  tranformarNumAColor(num) {
    switch (num) {
      case 0:
        return "celeste";
      case 1:
        return "naranja";
      case 2:
        return "verde";
      case 3:
        return "violeta";
    }
  }

  transformarColorANumero(color) {
    switch (color) {
      case "celeste":
        return 0;
      case "naranja":
        return 1;
      case "verde":
        return 2;
      case "violeta":
        return 3;
    }
  }

  iluminarSecuencia() {
    for (let i = 0; i < this.nivel; i++) {
      const color = this.tranformarNumAColor(this.secuencia[i]);
      setTimeout(() => this.iluminarColor(color), 1000 * i);
    }
  }

  iluminarColor(color) {
    this.colores[color].classList.add("light");
    setTimeout(() => this.apagarColor(color), 350);
  }

  apagarColor(color) {
    this.colores[color].classList.remove("light");
  }

  agregarEventosClick() {
    this.colores.celeste.addEventListener("click", this.elegirColor);
    this.colores.verde.addEventListener("click", this.elegirColor);
    this.colores.violeta.addEventListener("click", this.elegirColor);
    this.colores.naranja.addEventListener("click", this.elegirColor);
  }

  eliminarEventosClick() {
    this.colores.celeste.removeEventListener("click", this.elegirColor);
    this.colores.verde.removeEventListener("click", this.elegirColor);
    this.colores.violeta.removeEventListener("click", this.elegirColor);
    this.colores.naranja.removeEventListener("click", this.elegirColor);
  }

  elegirColor(ev) {
    const nombreColor = ev.target.dataset.color;
    const numeroColor = this.transformarColorANumero(nombreColor);
    this.iluminarColor(nombreColor);
    if (numeroColor === this.secuencia[this.subNivel]) {
      this.subNivel++;
      this.puntos++;
      if (this.subNivel === this.nivel) {
        this.nivel++;
        this.eliminarEventosClick();
        if (this.nivel === ULTIMO_NIVEL + 1) {
          this.ganoJuego();
        } else {
          setTimeout(this.cambiarNivel, 100);
        }
      }
    } else {
      this.perdioJuego();
    }
  }

  ganoJuego() {
    swal("Simon Dice", "Felicitaciones, ganaste el juego!", "success").then(
      this.inicializar
    );
  }

  perdioJuego() {
    if (this.puntos > this.maximoScore) {
      localStorage.setItem("puntos", this.puntos);
      swal(
        "Simon Dice",
        `Perdiste, pero tienes un nuevo record: ${this.puntos}`,
        "error"
      ).then(() => {
        this.eliminarEventosClick();
        this.inicializar();
      });
    } else {
      swal("Simon Dice", "Lo lamentamos, perdiste :c", "error").then(() => {
        this.eliminarEventosClick();
        this.inicializar();
      });
    }
  }
}

function empezarJuego() {
  window.juego = new Juego();
}

button.setAttribute("click", "empezarJuego()");

let arregloConRepetidos = [1, 2, 2, 3, 3, 3, 5, 5, 5];
console.log(arregloConRepetidos);
// let sinRepetidos = [new Set(arregloConRepetidos)];
let sinRepetidos = new Set(arregloConRepetidos);
// console.log(sinRepetidos);
// for (let item of sinRepetidos[0]) console.log(item);
for (let item of sinRepetidos) console.log(item);
