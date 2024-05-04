// menu.js
const menuModule = (function () {
  function addMenuAfterClear(playerName) {
    const menuContainer = document.createElement('div');
    menuContainer.classList.add('menu-container');
    menuContainer.innerHTML = `
      <div id="menu" class="menu">
        <ul class="menu-items">
        <li id="gameMenuI" class="menu-item">Привет ${playerName}</li>
          <li id="gameMenuItem" class="menu-item">Игра</li>
          <li id="settingsMenuItem" class="menu-item">Настройки</li>
          <li id="helpMenuItem" class="menu-item">Помощь</li>
          <li id="retingMenuItem" class="menu-item">Рейтинг</li>
        </ul>
      </div>
    `;
    document.body.appendChild(menuContainer);
    // <img src="..//../img/wot.jpg alt="Menu Image" class="menu-image"  после ид меню />
    const gameMenuItem = document.getElementById('gameMenuItem');
    const settingsMenuItem = document.getElementById('settingsMenuItem');
    const helpMenuItem = document.getElementById('helpMenuItem');
    const retingMenuItem = document.getElementById('retingMenuItem');

    const menu = document.querySelector('.menu');

    gameMenuItem.addEventListener('click', startGame);
    settingsMenuItem.addEventListener('click', showSettings);
    helpMenuItem.addEventListener('click', showHelp);
    retingMenuItem.addEventListener('click', showReting);

    // "Игра"
    function startGame() {
      animate();
      gameUI.startTimer();
      console.log('Игра началась!');
      menu.style.display = 'none'; // Скрыть меню
    }

    function showSettings() {
      // Показать настройки
      console.log('Настройки');
    }

    function showHelp() {
      // Показать историю игры
      console.log('История');
    }
    function showReting() {
      // Показать историю игры
      console.log('Рейтинг');
    }
  }

  return {
    addMenuAfterClear,
  };
})();
