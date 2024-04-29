document.addEventListener('DOMContentLoaded', function () {
  const menuContainer = document.createElement('div');
  menuContainer.classList.add('menu-container');
  menuContainer.innerHTML = `
    <div id="menu" class="menu">
      <img src="your_image_url" alt="Menu Image" class="menu-image" />
      <ul class="menu-items">
        <li id="gameMenuItem" class="menu-item">Игра</li>
        <li id="settingsMenuItem" class="menu-item">Настройки</li>
        <li id="historyMenuItem" class="menu-item">История</li>
      </ul>
    </div>
  `;
  document.body.appendChild(menuContainer);

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
