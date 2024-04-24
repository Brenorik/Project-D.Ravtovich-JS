class GameUI {
  constructor() {
    this.modal = document.getElementById('gameOverModal');
    this.restartButton = document.getElementById('restartButton');
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
    player.resetGame();
    // Вызов метода для перезапуска игры или другой логики
  }
}
