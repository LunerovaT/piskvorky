window.addEventListener('DOMContentLoaded', () => {
  const policka = document.querySelectorAll('.block_hracipole_button');
  let currentPlayer = 'circle';

  //indikátor hráče
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

  // hrací pole
  policka.forEach((policko) => {
    policko.addEventListener('click', function () {
      if (currentPlayer === 'circle') {
        policko.classList.add('board__field__circle');
        currentPlayer = 'cross'; // Přepnutí hráče
      } else {
        policko.classList.add('board__field__cross');
        currentPlayer = 'circle'; // Přepnutí hráče
      }
      policko.disabled = true;
      updatePlayerIndicator(); // aktualizace hráče
    });
  });
});
