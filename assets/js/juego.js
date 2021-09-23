/*
  C = Clubs
  D = Diamonds
  H = Hearts
  S = Spades
*/

(() => {
  let deck = [];
  const tipos = ["C", "D", "H", "S"];
  const especiales = ["A", "J", "Q", "K"];

  let pedirCartaButton = document.querySelector("#pedir-carta");
  let detenerButton = document.querySelector("#detener-btn");
  let nuevoGameButton = document.querySelector("#nuevo-btn");

  let jugadorCartasContainer = document.querySelector("#jugador-cartas");
  let computadoraCartasContainer = document.querySelector(
    "#computadora-cartas"
  );

  let tablaPuntos = document.querySelectorAll("small");

  let puntosJugador = 0;
  let puntosComputadora = 0;

  const crearDeck = () => {
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

    deck = _.shuffle(deck);

    return deck;
  };

  const pedirCarta = () => {
    if (deck.length === 0) {
      throw "No ahy cartas en el deck";
    }

    let carta = deck.pop();
    return carta;
  };

  const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1);
    let puntos = 0;

    if (isNaN(valor)) {
      return valor === "A" ? 11 : 10;
    } else {
      return Number(valor);
    }
  };

  crearDeck();

  const turnoComputdaora = (puntosMinimos) => {
    do {
      const carta = pedirCarta();

      puntosComputadora += valorCarta(carta);
      tablaPuntos[1].innerText = puntosComputadora;

      const cartaImg = document.createElement("img");
      cartaImg.src = `assets/cartas/${carta}.png`;
      cartaImg.classList.add("carta");
      computadoraCartasContainer.append(cartaImg);

      if (puntosMinimos > 21) {
        break;
      }
    } while (puntosComputadora < puntosMinimos && puntosMinimos <= 21);

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

  pedirCartaButton.addEventListener("click", () => {
    const carta = pedirCarta();

    puntosJugador += valorCarta(carta);

    tablaPuntos[0].innerText = puntosJugador;

    const cartaImg = document.createElement("img");
    cartaImg.src = `assets/cartas/${carta}.png`;
    cartaImg.classList.add("carta");
    jugadorCartasContainer.append(cartaImg);

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
    turnoComputdaora(puntosJugador);
  });

  nuevoGameButton.addEventListener("click", () => {
    deck = [];
    deck = crearDeck();

    puntosJugador = 0;
    puntosComputadora = 0;

    tablaPuntos[0].innerText = 0;
    tablaPuntos[1].innerText = 0;

    jugadorCartasContainer.innerHTML = "";
    computadoraCartasContainer.innerHTML = "";

    pedirCartaButton.disabled = false;
    detenerButton.disabled = false;
  });
})();
