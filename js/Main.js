document.addEventListener('DOMContentLoaded', function () {
  const gameMenuItem = document.getElementById('gameMenuItem');
  const settingsMenuItem = document.getElementById('settingsMenuItem');
  const historyMenuItem = document.getElementById('historyMenuItem');
  const menu = document.querySelector('.menu');

  gameMenuItem.addEventListener('click', startGame);
  settingsMenuItem.addEventListener('click', showSettings);
  historyMenuItem.addEventListener('click', showHistory);

  // "Игра"
  function startGame() {
    animate();
    gameUI.startTimer();
    console.log('Игра началась!');
    menu.style.display = 'none'; // Скрыть меню
    // Создаем новый аудио элемент
    const audio = new Audio('../audio/Comix.mp3');
    // Воспроизводим музыку
    audio.play();
  }

  function showSettings() {
    // Показать настройки
    console.log('Настройки');
  }

  function showHistory() {
    // Показать историю игры
    console.log('История');
  }
});
