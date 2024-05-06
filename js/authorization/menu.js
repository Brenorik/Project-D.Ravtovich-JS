class Menu {
  constructor() {
    this.playerName = '';
    this.menuContainer = document.createElement('div');
    this.menuContainer.classList.add('menu-container');
    this.menuContainer.innerHTML = `
      <div id="menu" class="menu">
        <ul class="menu-items">
          <li id="gameMenuI" class="menu-item">Привет ${this.playerName}</li>
          <li id="gameMenuItem" class="menu-item">Игра</li>
          <li id="settingsMenuItem" class="menu-item">Настройки</li>
          <li id="helpMenuItem" class="menu-item">Помощь</li>
          <li id="retingMenuItem" class="menu-item">Рейтинг</li>
        </ul>
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
    this.menuContainer.querySelector('#gameMenuI').textContent = `Привет ${this.playerName}`;
    document.body.appendChild(this.menuContainer);
  }

  startGame() {
    gameUI.resetGame();
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
