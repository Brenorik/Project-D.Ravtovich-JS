class GameUI {
  constructor() {
    this.modal = document.getElementById('gameOverModal');
    this.restartButton = document.getElementById('restartButton');
    this.restartButton.addEventListener('click', () => this.handleRestartButtonClick());
    this.timerValue = 0;
    this.scoreValue = 0;
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
    player.resetGame();
    // Вызов метода для перезапуска игры или другой логики
  }
  // Метод для отображения двух сердец
  drawHearts(camera) {
    // Размер сердца
    const heartSize = 3;
    // Расположение сердец (верхний левый угол)
    const heartsX = 15;
    const heartsY = 10;
    // Расстояние между сердцами
    const heartSpacing = 5;

    // Проверяем, существует ли камера, прежде чем использовать ее свойство
    const cameraX = camera ? camera.position.x : 0;
    const cameraY = camera ? camera.position.y : 0;

    // Рисуем первое сердце
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

    // Рисуем второе сердце с учетом расстояния между сердцами
    c.beginPath();
    c.moveTo(heartsX + heartSize * 1.5 + heartSpacing - cameraX, heartsY + heartSize / 2 - cameraY);
    c.bezierCurveTo(
      heartsX + heartSize * 1.5 + heartSpacing - cameraX,
      heartsY - cameraY,
      heartsX + heartSize / 2 + heartSpacing - cameraX,
      heartsY - cameraY,
      heartsX + heartSize / 2 + heartSpacing - cameraX,
      heartsY + heartSize / 2 - cameraY
    );
    c.bezierCurveTo(
      heartsX + heartSize / 2 + heartSpacing - cameraX,
      heartsY + heartSize - cameraY,
      heartsX + heartSize * 1.5 + heartSpacing - cameraX,
      heartsY + heartSize * 1.5 - cameraY,
      heartsX + heartSize * 1.5 + heartSpacing - cameraX,
      heartsY + heartSize * 2 - cameraY
    );
    c.bezierCurveTo(
      heartsX + heartSize * 1.5 + heartSpacing - cameraX,
      heartsY + heartSize * 1.5 - cameraY,
      heartsX + heartSize * 2.5 + heartSpacing - cameraX,
      heartsY + heartSize - cameraY,
      heartsX + heartSize * 2.5 + heartSpacing - cameraX,
      heartsY + heartSize / 2 - cameraY
    );
    c.bezierCurveTo(
      heartsX + heartSize * 2.5 + heartSpacing - cameraX,
      heartsY - cameraY,
      heartsX + heartSize * 1.5 + heartSpacing - cameraX,
      heartsY - cameraY,
      heartsX + heartSize * 1.5 + heartSpacing - cameraX,
      heartsY + heartSize / 2 - cameraY
    );
    c.closePath();

    // Создаем градиент для заполнения сердца
    const gradient2 = c.createRadialGradient(
      heartsX + heartSize * 1.5 + heartSpacing - cameraX,
      heartsY - cameraY,
      0,
      heartsX + heartSize * 1.5 + heartSpacing - cameraX,
      heartsY - cameraY,
      heartSize
    );
    gradient2.addColorStop(0, '#ff4d4d');
    gradient2.addColorStop(1, '#cc0000');
    c.fillStyle = gradient2;

    // Применяем эффект размытия
    c.filter = 'blur(1px)'; // Размытие в 3 пикселя
    c.fill();
    c.filter = 'none'; // Сбрасываем эффект размытия
  }

  // Метод для отображения таймера
  drawTimer(camera) {
    c.fillStyle = 'black';
    c.font = '8px Arial';
    // Проверяем, существует ли камера, прежде чем использовать ее свойство
    const cameraX = camera ? camera.position.x : 0;
    const cameraY = camera ? camera.position.y : 0;
    // Корректируем позицию текста относительно камеры
    const timerX = 50 - cameraX;
    const timerY = 16 - cameraY;
    c.fillText('Time: ' + this.timerValue, timerX, timerY);
  }

  // Метод для отображения очков
  drawScore(camera) {
    c.fillStyle = 'black';
    c.font = '8px Arial';
    // Проверяем, существует ли камера, прежде чем использовать ее свойство
    const cameraX = camera ? camera.position.x : 0;
    const cameraY = camera ? camera.position.y : 0;
    // Отображаем очки в правом верхнем углу, учитывая положение камеры
    const scoreX = 215 - cameraX;
    const scoreY = 16 - cameraY;
    c.fillText('Score: ' + this.scoreValue, scoreX, scoreY);
  }
}
