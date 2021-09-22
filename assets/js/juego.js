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

crearDeck();
