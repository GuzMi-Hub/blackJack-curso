/*
  C = Clubs
  D = Diamonds
  H = Hearts
  S = Spades
*/

let deck = [];
const tipos = ["C", "D", "H", "S"];
const especiales = ["A", "J", "Q", "K"];

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
let carta = pedirCarta();
console.log(valorCarta(carta));
