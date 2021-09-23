(() => {
  "use strict";

  let deck = [];
  const tipos = ["C", "D", "H", "S"];
  const especiales = ["A", "J", "Q", "K"];

  let puntosJugadores = [];

  const pedirCartaButton = document.querySelector("#pedir-carta");
  const detenerButton = document.querySelector("#detener-btn");
  const nuevoGameButton = document.querySelector("#nuevo-btn");

  const divCartasJugadores = document.querySelectorAll(".divCartas");

  const tablaPuntos = document.querySelectorAll("small");

  const incializarJuego = (numJugadores = 2) => {
    deck = crearDeck();

    puntosJugadores = [];
    for (let i = 0; i < numJugadores; i++) {
      puntosJugadores.push(0);
    }

    tablaPuntos.forEach((tabla) => {
      tabla.innerText = 0;
    });

    divCartasJugadores.forEach((div) => {
      div.innerHTML = "";
    });

    pedirCartaButton.disabled = false;
    detenerButton.disabled = false;
  };

  const crearDeck = () => {
    deck = [];

    for (let i = 2; i <= 10; i++) {
      for (const tipo of tipos) {
        deck.push(i + tipo);
      }
    }
    for (const tipo of tipos) {
      for (const especial of especiales) {
        deck.push(especial + tipo);
      }
    }

    return _.shuffle(deck);
  };

  const pedirCarta = () => {
    if (deck.length === 0) {
      throw "No ahy cartas en el deck";
    }

    return deck.pop();
  };

  const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1);

    if (isNaN(valor)) {
      return valor === "A" ? 11 : 10;
    } else {
      return Number(valor);
    }
  };

  const acumularPuntos = (carta, turno) => {
    puntosJugadores[turno] += valorCarta(carta);
    tablaPuntos[turno].innerText = puntosJugadores[turno];
    return puntosJugadores[turno];
  };

  const crearCarta = (carta, turno) => {
    const cartaImg = document.createElement("img");
    cartaImg.src = `assets/cartas/${carta}.png`;
    cartaImg.classList.add("carta");
    divCartasJugadores[turno].append(cartaImg);
  };

  const determinarGanador = () => {
    const [puntosMinimos, puntosComputadora] = puntosJugadores;

    setTimeout(() => {
      if (puntosComputadora === puntosMinimos) {
        alert("Nadie gana :(");
      } else if (puntosMinimos > 21) {
        alert("computadora gana");
      } else if (puntosComputadora > 21) {
        alert("Jugador gana");
      } else {
        alert("Computadora Gana");
      }
    }, 100);
  };

  const turnoComputdaora = (puntosMinimos) => {
    let puntosComputadora = 0;
    do {
      const carta = pedirCarta();

      puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1);

      crearCarta(carta, puntosJugadores.length - 1);
    } while (puntosComputadora < puntosMinimos && puntosMinimos <= 21);

    determinarGanador();
  };

  pedirCartaButton.addEventListener("click", () => {
    const carta = pedirCarta();

    const puntosJugador = acumularPuntos(carta, 0);
    crearCarta(carta, 0);

    if (puntosJugador > 21) {
      pedirCartaButton.disabled = true;
      detenerButton.disabled = true;
      turnoComputdaora(puntosJugador);
    } else if (puntosJugador === 21) {
      turnoComputdaora(puntosJugador);
      pedirCartaButton.disabled = true;
      detenerButton.disabled = true;
    }
  });

  detenerButton.addEventListener("click", () => {
    pedirCartaButton.disabled = true;
    detenerButton.disabled = true;
    turnoComputdaora(puntosJugadores[0]);
  });

  nuevoGameButton.addEventListener("click", () => {
    incializarJuego();
  });

  return "";
})();
