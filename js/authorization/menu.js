class Menu {
  constructor() {
    this.playerName = '';
    this.menuContainer = document.createElement('div');
    this.menuContainer.classList.add('menu-container');
    this.menuContainer.style.backgroundImage = "url('./img/backgroundmenu.bmp')";
    this.menuContainer.style.backgroundSize = 'cover';
    this.menuContainer.style.backgroundPosition = 'center';
    this.menuContainer.innerHTML = `
    <div id="menu" class="menu">
    <ul class="menu-items">
      <li id="gameMenuItem" class="menu-item">Игра</li>
      <li id="settingsMenuItem" class="menu-item">Настройки</li>
      <li id="helpMenuItem" class="menu-item">Помощь</li>
      <li id="retingMenuItem" class="menu-item">Рейтинг</li>
    </ul>
    <div id="gameMenuPlayer" class="menuPlayer"></div>
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
    this.modal = null;
    this.settingsMenu = null;
    this.helpModal = null;
  }

  addMenuAfterClear(playerName) {
    this.playerName = playerName;
    const gameMenuPlayer = this.menuContainer.querySelector('#gameMenuPlayer');
    gameMenuPlayer.textContent = `Добро пожаловать, ${this.playerName}!`;

    const logoutButton = document.createElement('a');
    logoutButton.href = '#';
    logoutButton.textContent = 'Выйти';
    logoutButton.id = 'logoutBtn';
    logoutButton.classList.add('logout-button');

    logoutButton.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      // loginModule.logout();
      // audioManager.stopMenuMusic();
      window.location.reload();
    });

    gameMenuPlayer.appendChild(logoutButton);

    document.body.appendChild(this.menuContainer);
  }

  startGame() {
    gameUI.resetGame();
    audioManager.stopMenuMusic();
    audioManager.playBackgroundMusic();
    this.animationFrameId = window.requestAnimationFrame(animate);
    gameUI.username = this.playerName;
    console.log('Игра началась!');

    if (this.menuContainer) {
      this.menuContainer.remove();
    }

    isGameRunning = true;
    gameUI.stopTimer();

    // Запустить таймер
    gameUI.startTimer();
    window.addEventListener('keydown', keyDownHandler);
    window.addEventListener('keyup', keyUpHandler);
  }

  showSettings() {
    if (!this.modal) {
      this.createModal();
    }

    this.modal.style.display = 'block';
    audioManager.stopMenuMusic();
  }
  createModal() {
    this.modal = document.createElement('div');
    this.modal.classList.add('modal');

    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');

    const closeButton = document.createElement('button');
    closeButton.classList.add('close-button');
    closeButton.textContent = 'Закрыть';
    closeButton.addEventListener('click', () => {
      this.modal.style.display = 'none';
      audioManager.playMenuMusic();
    });

    const settingsMenu = this.createSettingsMenu();

    modalContent.appendChild(settingsMenu);
    modalContent.appendChild(closeButton);
    this.modal.appendChild(modalContent);
    document.body.appendChild(this.modal);
  }

  createSettingsMenu() {
    const settingsMenu = document.createElement('div');
    settingsMenu.classList.add('settings-menu');

    // Элемент управления для настройки громкости музыки
    const musicVolumeLabel = document.createElement('label');
    musicVolumeLabel.textContent = 'Громкость музыки:';
    const musicVolumeSlider = document.createElement('input');
    musicVolumeSlider.type = 'range';
    musicVolumeSlider.min = '0';
    musicVolumeSlider.max = '100';
    musicVolumeSlider.value = audioManager.backgroundMusic.volume * 100;
    musicVolumeSlider.classList.add('volume-slider');
    musicVolumeSlider.addEventListener('input', () => {
      const volume = parseFloat(musicVolumeSlider.value) / 100;
      audioManager.setMusicVolume(volume);
      audioManager.playMenuMusic();
    });

    musicVolumeSlider.addEventListener('change', () => {
      audioManager.stopMenuMusic();
    });

    // Элемент управления для настройки громкости звуковых эффектов
    const soundVolumeLabel = document.createElement('label');
    soundVolumeLabel.textContent = 'Громкость  звуков:';
    const soundVolumeSlider = document.createElement('input');
    soundVolumeSlider.type = 'range';
    soundVolumeSlider.min = '0';
    soundVolumeSlider.max = '100';
    soundVolumeSlider.value = audioManager.soundEffects['jump'].volume * 100;
    soundVolumeSlider.classList.add('volume-slider');
    soundVolumeSlider.addEventListener('input', () => {
      const volume = parseFloat(soundVolumeSlider.value) / 100;
      audioManager.setSoundEffectsVolume(volume);
      audioManager.playSoundEffect('victory');
    });

    settingsMenu.appendChild(musicVolumeLabel);
    settingsMenu.appendChild(musicVolumeSlider);
    settingsMenu.appendChild(document.createElement('br'));
    settingsMenu.appendChild(soundVolumeLabel);
    settingsMenu.appendChild(soundVolumeSlider);

    return settingsMenu;
  }

  showHelp() {
    if (!this.helpModal) {
      this.createHelpModal();
    }

    this.helpModal.style.display = 'block';
  }

  createHelpModal() {
    this.helpModal = document.createElement('div');
    this.helpModal.classList.add('modal-help');

    const helpContent = document.createElement('div');
    helpContent.classList.add('help-content');
    helpContent.innerHTML = `
    <div class="help-content">
        <div class="help-section control">
            <div class="slide">
            <h2>Управление</h2>
            <div class="infoSlide">
            <img src="./img/help/control.png" alt="control" />
                <p>"А" и "D" служат для перемещения влево и вправо соответственно,<br>
                в то время как "W" и клавиша "Пробел" позволяют совершить прыжок.<br>
                Атака осуществляется нажатием клавиши "O".</p>
            </div>
            </div>
        </div>
        <div class="help-section">
            <h2>Механики игры</h2>
            <div class="mechanics-grid">
                <div class="slide">
                    <h3>Очки</h3>
                    <div class="infoSlide">
                        <img src="./img/help/score.png" alt="score" />
                        <p>Ваша цель - собрать как можно больше яблок и одновременно уничтожить как можно больше врагов,
                         чтобы набрать максимальное количество очков. </p>
                    </div>
                </div>
                <div class="slide">
                    <h3>Противники</h3>
                    <div class="infoSlide">
                        <img src="./img/help/enemies.png" alt="enemies" />
                        <p>
                        Будьте осторожны в обращении с врагами и применяйте тактику - либо уклоняйтесь от них,
                         чтобы сохранить свою жизнь, либо смело атакуйте,
                         чтобы уничтожить их и заработать дополнительные очки.</p>
                    </div>
                </div>
                <div class="slide">
                    <h3>Урон</h3>
                    <div class="infoSlide">
                        <img src="./img/help/damage.png" alt="damage" />
                        <p> У вас есть всего три жизни, что означает, что у вас два права на ошибку.
                         Будьте внимательны и осторожны при прохождении уровней, чтобы не исчерпать все свои жизни.</p>
                    </div>
                </div>
                <div class="slide">
                    <h3>Победа</h3>
                    <div class="infoSlide">
                        <img src="./img/help/victory.png" alt="victory" />
                        <p>Пройдите уровень до конца и обратите внимание на знак. Найдите его, чтобы получить доступ к таблице
                         лучших игроков и занять свое место среди лучших из лучших. </p>
                    </div>
                </div>
                <div class="slide">
                    <h3>Смерть</h3>
                    <div class="infoSlide">
                        <img src="./img/help/death.png" alt="death" />
                        <p>Запомните: ходить по шипам нельзя, а персонаж не умеет плавать.
                         У вас есть 3 минуты. Пройдите уровень до конца.</p>
                    </div>
                </div>
            </div>
        </div>
        <button id="closeHelpButton">Закрыть</button>
    </div>
`;

    this.helpModal.appendChild(helpContent);

    document.body.appendChild(this.helpModal);

    const closeHelpButton = helpContent.querySelector('#closeHelpButton');
    closeHelpButton.addEventListener('click', () => {
      this.helpModal.style.display = 'none';
    });
  }

  showReting() {
    gameUI.showReting();
  }
}
