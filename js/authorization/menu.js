class Menu {
  constructor() {
    this.playerName = '';
    this.menuContainer = document.createElement('div');
    this.menuContainer.classList.add('menu-container');
    this.menuContainer.innerHTML = `
    <div id="menu" class="menu">
      <ul class="menu-items">

        <li id="gameMenuItem" class="menu-item">Игра</li>
        <li id="settingsMenuItem" class="menu-item">Настройки</li>
        <li id="helpMenuItem" class="menu-item">Помощь</li>
        <li id="retingMenuItem" class="menu-item">Рейтинг</li>
      </ul>
    </div>
    <div id="gameMenuI" class="menu-item">
  <button id="logoutBtn" class="logout-button">Выйти</button>
</div>
    
  `;
    this.gameMenuItem = this.menuContainer.querySelector('#gameMenuItem');
    this.settingsMenuItem = this.menuContainer.querySelector('#settingsMenuItem');
    this.helpMenuItem = this.menuContainer.querySelector('#helpMenuItem');
    this.retingMenuItem = this.menuContainer.querySelector('#retingMenuItem');
    this.menu = this.menuContainer.querySelector('.menu');

    this.gameMenuItem.addEventListener('click', this.startGame.bind(this));
    this.settingsMenuItem.addEventListener('click', this.showSettings.bind(this));
    this.helpMenuItem.addEventListener('click', this.showHelp.bind(this));
    this.retingMenuItem.addEventListener('click', this.showReting.bind(this));
  }

  addMenuAfterClear(playerName) {
    this.playerName = playerName;
    const gameMenuI = this.menuContainer.querySelector('#gameMenuI');
    gameMenuI.textContent = `Привет ${this.playerName}`;

    // Создаем кнопку "Выйти"
    const logoutButton = document.createElement('a');
    logoutButton.href = '#';
    logoutButton.textContent = 'Выйти';
    logoutButton.id = 'logoutBtn'; // Устанавливаем id кнопки
    logoutButton.classList.add('logout-button'); // Добавляем класс стиля для кнопки

    // Добавляем обработчик события клика на кнопку "Выйти"
    logoutButton.addEventListener('click', (event) => {
      event.preventDefault(); // Предотвращаем действие по умолчанию для ссылки
      event.stopPropagation(); // Остановка распространения события
      loginModule.logout();
      // Вызываем метод logout() класса Menu

      // Скрываем контейнер меню
      this.menuContainer.style.display = 'none';
    });

    // Добавляем кнопку "Выйти" к элементу "gameMenuI"
    gameMenuI.appendChild(logoutButton);

    // Добавляем контейнер меню к телу документа
    document.body.appendChild(this.menuContainer);
  }

  startGame() {
    gameUI.resetGame();
    audioManager.playBackgroundMusic();
    this.animationFrameId = window.requestAnimationFrame(animate);
    gameUI.username = this.playerName;
    console.log('Игра началась!');
    this.menu.style.display = 'none';
    isGameRunning = true;
  }

  showSettings() {
    console.log('Настройки');
  }

  showHelp() {
    console.log('История');
  }

  showReting() {
    gameUI.showReting();
  }
}
