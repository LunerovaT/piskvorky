import { findWinner } from 'https://unpkg.com/piskvorky@0.1.4';

window.addEventListener('DOMContentLoaded', () => {
  const policka = document.querySelectorAll('.block_hracipole_button');
  let currentPlayer = 'circle';

  const playerIndicator = document.querySelector('.block__menuHra__kolecko');

  function updatePlayerIndicator() {
    if (currentPlayer === 'circle') {
      playerIndicator.classList.remove('board__field__cross');
      playerIndicator.classList.add('board__field__circle');
    } else {
      playerIndicator.classList.remove('board__field__circle');
      playerIndicator.classList.add('board__field__cross');
    }
  }
  console.log('Počet políček v herní ploše:', policka.length);
  updatePlayerIndicator();

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

  function vyhodnotHru() {
    const pole = ziskejHerniPole();
    const vitez = findWinner(pole);

    if (vitez === 'x' || vitez === 'o') {
      setTimeout(() => {
        alert(`Vyhrál hráč se symbolem ${vitez}.`);
        location.reload();
      }, 100);
      return true;
    }

    return false;
  }

  function souradniceNaIndex(x, y) {
    return x + y * 10;
  }
  async function tahAIAutomaticky() {
    const pole = ziskejHerniPole();
    const odpoved = await fetch(
      'https://piskvorky.czechitas-podklady.cz/api/suggest-next-move',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          board: pole,
          player: 'x',
        }),
      },
    );

    const data = await odpoved.json();
    const { x, y } = data.position;
    const index = souradniceNaIndex(x, y);
    const policko = policka[index];

    policko.classList.add('board__field__cross');
    policko.disabled = true;

    currentPlayer = 'circle';
    updatePlayerIndicator();

    vyhodnotHru();
  }

  async function obsluzTah() {
    const konec = vyhodnotHru();
    if (konec) return;

    if (currentPlayer === 'cross') {
      await tahAIAutomaticky();
    }
  }

  policka.forEach((policko) => {
    policko.addEventListener('click', async function () {
      if (currentPlayer === 'circle' && !policko.disabled) {
        policko.classList.add('board__field__circle');
        policko.disabled = true;
        currentPlayer = 'cross';
        updatePlayerIndicator();
        await obsluzTah();
      }
    });
  });
});
