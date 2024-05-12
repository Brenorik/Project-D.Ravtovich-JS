class GameUI {
  constructor() {
    this.timerValue = 180;
    this.scoreValue = 0;
    this.heartsCount = 3;
    this.winPosition = { x: 2784, y: 336 }; // Координаты для победного местоположения
    this.modal = null;
    this.restartButton = null;
    this.initModal();
    this.hasWon = false;
    this.username = '';
    this.menu = null;
  }
  stopGame() {
    window.cancelAnimationFrame(menu.animationFrameId);
    c.clearRect(0, 0, canvas.width, canvas.height);
    this.modal.style.display = 'none';
    isGameRunning = false;
  }

  showReting() {
    const dbRef = myAppDB.ref('users');
    dbRef.once('value', (snapshot) => {
      const users = snapshot.val();
      const usersArray = Object.values(users);
      usersArray.sort((a, b) => b.score - a.score);
      const topUsers = usersArray.filter((user) => user.score !== 0 && user.timer !== 0).slice(0, 10);

      let tableHtml = `
        <table>
          <thead>
            <tr>
              <th>Имя пользователя</th>
              <th>Рейтинг</th>
              <th>Время</th>
            </tr>
          </thead>
          <tbody>
      `;

      topUsers.forEach((user) => {
        tableHtml += `
          <tr>
            <td>${user.username}</td>
            <td>${user.score}</td>
            <td>${user.timer}</td>
          </tr>
        `;
      });

      tableHtml += `
          </tbody>
        </table>
      `;

      this.showModal(tableHtml);
    });
  }

  showModal(content) {
    const modalContainer = document.createElement('div');
    modalContainer.classList.add('modal-container');
    modalContainer.innerHTML = `
      <div class="modal">
          <div class="modal-content">
              ${content}
              <button id="closeButton">Закрыть</button>
          </div>
      </div>
    `;

    document.body.appendChild(modalContainer);

    const closeBtn = modalContainer.querySelector('#closeButton');
    closeBtn.addEventListener('click', () => {
      modalContainer.remove();
    });

    modalContainer.querySelector('.modal').style.display = 'block';
  }
  handleMenuButtonClick() {
    this.menu.addMenuAfterClear(this.username);
  }

  resetMenu() {
    // Проверяем, существует ли уже экземпляр меню
    if (this.menu) {
      // Удаляем старый экземпляр меню
      this.menu.menuContainer.remove();
    }
    // Создаем новый экземпляр меню
    this.menu = new Menu();
    // Добавляем меню на страницу
    this.menu.addMenuAfterClear(this.username);
  }

  initModal() {
    // Создаем модальное окно для сброса игры
    this.modal = document.createElement('div');
    this.modal.id = 'gameOverModal';
    this.modal.classList.add('modal');
    this.modal.innerHTML = `
<div class="modal-content">
    <h2></h2>
    <p></p>
    <button id="restartButton">Перезапуск игры</button>
    <button id="retingButton">Рейтинг</button>
    <button id="menuButton">Меню</button>
</div>`;
    document.body.appendChild(this.modal);

    this.restartButton = this.modal.querySelector('#restartButton');
    this.retingButton = this.modal.querySelector('#retingButton');
    this.menuButton = this.modal.querySelector('#menuButton');
    this.restartButton.addEventListener('click', () => this.handleRestartButtonClick());
    this.retingButton.addEventListener('click', () => this.showReting());
    this.menuButton.addEventListener('click', () => {
      this.stopGame();
      this.resetMenu();
      audioManager.stopBackgroundMusic();
      audioManager.playMenuMusic();
    });
  }

  showGameOverModal() {
    this.stopTimer();
    audioManager.stopBackgroundMusic();
    player.position = { x: 30, y: 450 };
    player.velocity = { x: 0, y: 1 };
    this.modal.style.display = 'block';
    this.removeMenuButton();
  }

  hideGameOverModal() {
    this.modal.style.display = 'none';
  }

  handleRestartButtonClick() {
    // Дополнительные действия при нажатии на кнопку перезапуска игры
    this.hideGameOverModal();
    this.resetGame();
    this.startTimer();
  }
  updateUser(username, newScore, newTimer) {
    // Формируем ссылку на пользователя в базе данных
    const userRef = myAppDB.ref('users/' + `user_${username.replace(/\s/g, '').toLowerCase()}`);
    // Обновляем данные пользователя
    userRef
      .update({
        score: newScore,
        timer: newTimer,
      })
      .then(() => {
        console.log('Данные пользователя успешно обновлены');
      })
      .catch((error) => {
        console.error('Ошибка при обновлении данных пользователя: ', error);
      });
  }

  checkForWinCondition() {
    if (this.hasWon) {
      return false;
    }
    if (player.hitbox.position.x >= this.winPosition.x && player.hitbox.position.y <= this.winPosition.y) {
      this.hasWon = true;
      this.modal.querySelector('.modal-content h2').innerText = 'Поздравляем!' + this.username;
      this.modal.querySelector('.modal-content p').innerHTML =
        'Вы победили! Вы набрали <span id="score">' +
        this.scoreValue +
        '</span> очков за <span id="time">' +
        (180 - this.timerValue) +
        '</span> секунд.';
      audioManager.playSoundEffect('victory');
      this.showGameOverModal();

      // После победы обновляем данные пользователя
      this.updateUser(this.username, this.scoreValue, 180 - this.timerValue);
    }
  }

  checkForGameOverCondition() {
    this.modal.querySelector('.modal-content h2').innerText = 'Game Over';
    this.modal.querySelector('.modal-content p').innerHTML =
      'Для вашей смерти понадобилось <span id="time">' + (180 - this.timerValue) + '</span> секунд.';
    this.showGameOverModal();
  }

  // Метод для отображения двух сердец
  drawHearts(camera) {
    // Размер сердца
    const heartSize = 3;
    // Расположение сердец (верхний левый угол)
    let heartsX = 15;
    const heartsY = 8;
    // Расстояние между сердцами
    const heartSpacing = 5;

    const cameraX = camera ? camera.position.x : 0;
    const cameraY = camera ? camera.position.y : 0;

    // Перебираем количество сердец и рисуем их
    for (let i = 0; i < this.heartsCount; i++) {
      const heartOffset = i * (heartSize * 2 + heartSpacing);
      heartsX += heartOffset;

      c.fillStyle = 'red';
      c.beginPath();
      c.moveTo(heartsX - cameraX, heartsY + heartSize / 2 - cameraY);
      c.bezierCurveTo(
        heartsX - cameraX,
        heartsY - cameraY,
        heartsX - heartSize - cameraX,
        heartsY - cameraY,
        heartsX - heartSize - cameraX,
        heartsY + heartSize / 2 - cameraY
      );
      c.bezierCurveTo(
        heartsX - heartSize - cameraX,
        heartsY + heartSize - cameraY,
        heartsX - cameraX,
        heartsY + heartSize * 1.5 - cameraY,
        heartsX - cameraX,
        heartsY + heartSize * 2 - cameraY
      );
      c.bezierCurveTo(
        heartsX - cameraX,
        heartsY + heartSize * 1.5 - cameraY,
        heartsX + heartSize - cameraX,
        heartsY + heartSize - cameraY,
        heartsX + heartSize - cameraX,
        heartsY + heartSize / 2 - cameraY
      );
      c.bezierCurveTo(
        heartsX + heartSize - cameraX,
        heartsY - cameraY,
        heartsX - cameraX,
        heartsY - cameraY,
        heartsX - cameraX,
        heartsY + heartSize / 2 - cameraY
      );
      c.closePath();

      // Создаем градиент для заполнения сердца
      const gradient = c.createRadialGradient(
        heartsX - cameraX,
        heartsY - cameraY,
        0,
        heartsX - cameraX,
        heartsY - cameraY,
        heartSize
      );
      gradient.addColorStop(0, '#ff4d4d');
      gradient.addColorStop(1, '#cc0000');
      c.fillStyle = gradient;

      // Применяем эффект размытия
      c.filter = 'blur(1px)';
      c.fill();
      c.filter = 'none';
      heartsX -= heartOffset;
    }
  }

  // Метод для отображения таймера
  drawTimer() {
    // Получаем минуты и секунды из значения таймера
    const minutes = Math.floor(this.timerValue / 60);
    const seconds = this.timerValue % 60;

    // Форматируем минуты и секунды для отображения в формате "мм:сс"
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');

    // Отображаем отформатированное время
    c.fillStyle = 'black';
    c.font = '6px Arial';
    // Позиция текста относительно камеры
    const timerX = 235 - camera.position.x;
    const timerY = 12 - camera.position.y;
    c.fillText(formattedMinutes + ':' + formattedSeconds, timerX, timerY);
  }

  startTimer() {
    this.timerInterval = setInterval(() => {
      // Уменьшаем значение таймера на 1
      this.timerValue--;

      if (this.timerValue === 0) {
        clearInterval(this.timerInterval);
        audioManager.playSoundEffect('gameOver');
        this.checkForGameOverCondition();
        // console.log('Время вышло!');
        return;
      }

      // Отображаем обновленное значение таймера
      this.drawTimer();
    }, 1000);
  }
  stopTimer() {
    clearInterval(this.timerInterval);
  }

  // Метод для отображения очков
  drawScore(camera) {
    c.fillStyle = 'black';
    c.font = '6px Arial';
    const cameraX = camera ? camera.position.x : 0;
    const cameraY = camera ? camera.position.y : 0;
    // Отображаем очки в правом верхнем углу, учитывая положение камеры
    const scoreX = 210 - cameraX;
    const scoreY = 12 - cameraY;
    c.fillText(this.scoreValue, scoreX, scoreY);
  }

  // Метод для обновления счета (добавляет указанное количество очков)
  updateScore(points) {
    this.scoreValue += points;
  }
  // Метод для сброса игры
  resetGame() {
    // Сброс позиции и скорости игрока
    player.position = { x: 30, y: 450 };
    player.velocity = { x: 0, y: 1 };
    // Сброс флага проигрывания анимации смерти
    player.deathAnimationPlayed = false;
    // Сброс позиции камеры
    camera.position = { x: 0, y: -backgroundImageHeight + scaledCanvas.height };
    // Очистка текущего изображения
    player.image = null;
    this.stopTimer();
    // Очистка массива яблок
    appleManager.apples = [];

    // Пересоздаем яблоки
    appleManager.createApples(apple2D);
    audioManager.playBackgroundMusic();

    // Пересоздаем всех врагов
    for (let i = 0; i < enemies.length; i++) {
      const enemy = enemies[i];
      enemy.position = { x: enemy.startX, y: enemy.position.y };
      enemy.direction = 1;
      enemy.setImageSrc(enemy.imageSrcRight);
    }

    this.timerValue = 180;
    this.scoreValue = 0;
    this.heartsCount = 3;
    this.displayMenuButton();
  }

  update() {
    if (!this.hasWon) {
      this.checkForWinCondition();
    }
  }
  // Добавляем кнопку меню
  displayMenuButton() {
    if (!document.getElementById('menuContainer2')) {
      const container = document.createElement('div');
      container.id = 'menuContainer2';

      this.menuButton = document.createElement('button');
      this.menuButton.textContent = 'Меню';
      this.menuButton.id = 'menuButtonDisplay';

      this.menuButton.addEventListener('click', () => {
        this.stopGame();
        this.resetMenu();
        audioManager.stopBackgroundMusic();
        audioManager.playMenuMusic();
        this.removeMenuButton();
      });

      container.appendChild(this.menuButton);

      document.body.appendChild(container);
    }
  }
  // Удаляем кнопку
  removeMenuButton() {
    if (this.menuButton) {
      this.menuButton.parentNode.removeChild(this.menuButton);
      this.menuButton = null;

      const container = document.getElementById('menuContainer2');
      if (container) {
        container.parentNode.removeChild(container);
      }
    }
  }
}
