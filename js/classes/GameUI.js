class GameUI {
  constructor() {
    this.timerValue = 180;
    this.scoreValue = 0;
    this.heartsCount = 3; // Начальное количество сердец

    // Создаем модальное окно для сброса игры
    this.modal = document.createElement('div');
    this.modal.id = 'gameOverModal';
    this.modal.classList.add('modal');
    this.modal.innerHTML = `
        <div class="modal-content">
          <h2>Game Over</h2>
          <p>Прадул</p>
          <button id="restartButton">Перезапуск игры</button>
        </div>
      `;
    document.body.appendChild(this.modal);

    // Назначаем обработчик для кнопки перезапуска игры
    this.restartButton = this.modal.querySelector('#restartButton');
    this.restartButton.addEventListener('click', () => this.handleRestartButtonClick());
  }

  showGameOverModal() {
    this.modal.style.display = 'block';
  }

  hideGameOverModal() {
    this.modal.style.display = 'none';
  }

  handleRestartButtonClick() {
    // Дополнительные действия при нажатии на кнопку перезапуска игры
    this.hideGameOverModal();
    this.resetGame();
    // Вызов метода для перезапуска игры или другой логики
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

    // Проверяем, существует ли камера, прежде чем использовать ее свойство
    const cameraX = camera ? camera.position.x : 0;
    const cameraY = camera ? camera.position.y : 0;

    // Перебираем количество сердец и рисуем их
    for (let i = 0; i < this.heartsCount; i++) {
      const heartOffset = i * (heartSize * 2 + heartSpacing);
      heartsX += heartOffset;

      c.fillStyle = 'red'; // Цвет сердца
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
      c.filter = 'blur(1px)'; // Размытие в 3 пикселя
      c.fill();
      c.filter = 'none'; // Сбрасываем эффект размытия
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
    const timerInterval = setInterval(() => {
      // Уменьшаем значение таймера на 1
      this.timerValue--;

      // Если таймер достиг нуля, останавливаем его
      if (this.timerValue === 0) {
        clearInterval(timerInterval);
        console.log('Время вышло!');
        return;
      }

      // Отображаем обновленное значение таймера
      this.drawTimer();
    }, 1000); // 1000 миллисекунд = 1 секунда
  }

  // Метод для отображения очков
  drawScore(camera) {
    c.fillStyle = 'black';
    c.font = '6px Arial';
    // Проверяем, существует ли камера, прежде чем использовать ее свойство
    const cameraX = camera ? camera.position.x : 0;
    const cameraY = camera ? camera.position.y : 0;
    // Отображаем очки в правом верхнем углу, учитывая положение камеры
    const scoreX = 210 - cameraX;
    const scoreY = 12 - cameraY;
    c.fillText(this.scoreValue, scoreX, scoreY);
  }

  // Метод для обновления счета (добавляет указанное количество очков)
  updateScore(points) {
    this.scoreValue += points; // Добавляем указанное количество очков к текущему счету
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

    // Очистка массива яблок
    appleManager.apples = [];

    // Пересоздаем яблоки
    appleManager.createApples(apple2D);

    // Пересоздаем всех врагов
    for (let i = 0; i < enemies.length; i++) {
      const enemy = enemies[i];
      enemy.position = { x: enemy.startX, y: enemy.position.y }; // Возвращаем врага на начальную позицию
      enemy.direction = 1; // Устанавливаем начальное направление движения
      enemy.setImageSrc(enemy.imageSrcRight); // Устанавливаем изображение врага в правильное направление
    }

    this.timerValue = 180;
    // Сброс очков на 0
    this.scoreValue = 0;
    this.heartsCount = 3;
  }
}
