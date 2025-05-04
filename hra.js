import { findWinner } from 'https://unpkg.com/piskvorky@0.1.4';

window.addEventListener('DOMContentLoaded', () => {
  const policka = document.querySelectorAll('.block_hracipole_button');
  let currentPlayer = 'circle';

  // indikátor hráče
  const playerIndicator = document.querySelector('.block__menuHra__kolecko');

  // Funkce pro aktualizaci indikátoru hráče
  function updatePlayerIndicator() {
    if (currentPlayer === 'circle') {
      playerIndicator.classList.remove('board__field__cross');
      playerIndicator.classList.add('board__field__circle');
    } else {
      playerIndicator.classList.remove('board__field__circle');
      playerIndicator.classList.add('board__field__cross');
    }
  }

  updatePlayerIndicator();

  // Funkce pro vytvoření pole 100 hodnot: 'x', 'o' nebo '_'
  function ziskejHerniPole() {
    const pole = [];
    policka.forEach((policko) => {
      if (policko.classList.contains('board__field__circle')) {
        pole.push('o');
      } else if (policko.classList.contains('board__field__cross')) {
        pole.push('x');
      } else {
        pole.push('_');
      }
    });
    return pole;
  }

  // Funkce pro vyhodnocení hry
  function vyhodnotHru() {
    const pole = ziskejHerniPole();
    const vitez = findWinner(pole);

    if (vitez === 'x' || vitez === 'o') {
      setTimeout(() => {
        alert(`Vyhrál hráč se symbolem ${vitez}.`);
        location.reload(); // Přenačtení hry po zavření alertu
      }, 100); // timeout pro správné zobrazení
    }
  }

  // přidání funkce kliknutí na každé políčko
  policka.forEach((policko) => {
    policko.addEventListener('click', function () {
      if (currentPlayer === 'circle') {
        policko.classList.add('board__field__circle');
        currentPlayer = 'cross';
      } else {
        policko.classList.add('board__field__cross');
        currentPlayer = 'circle';
      }

      policko.disabled = true;
      updatePlayerIndicator();
      vyhodnotHru(); // zavolání kontroly výherce po každém tahu
    });
  });
});
