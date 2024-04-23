// Получаем ссылку на элементы меню
document.addEventListener('DOMContentLoaded', function () {
  const gameMenuItem = document.getElementById('gameMenuItem');
  const settingsMenuItem = document.getElementById('settingsMenuItem');
  const historyMenuItem = document.getElementById('historyMenuItem');
  const menu = document.querySelector('.menu');

  gameMenuItem.addEventListener('click', startGame);
  settingsMenuItem.addEventListener('click', showSettings);
  historyMenuItem.addEventListener('click', showHistory);

  // Обработчик нажатия на кнопку "Игра"
  function startGame() {
    animate();
    console.log('Игра началась!');
    menu.style.display = 'none'; // Скрыть меню
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
// function startGame() {
//   // Поместите здесь всю логику, которая отвечает за начало игры

//   // Например, если ваша игра уже находится в файле index.js и запускается функцией animate(), то просто вызовите эту функцию здесь:
//   animate();
// }