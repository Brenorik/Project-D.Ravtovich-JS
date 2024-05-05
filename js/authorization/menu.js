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
      gameUI.username = playerName;
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
      // Получаем ссылку на базу данных
      const dbRef = myAppDB.ref('users');

      // Получаем данные о пользователях из базы данных
      dbRef.once('value', function (snapshot) {
        const users = snapshot.val();

        // Преобразуем объект пользователей в массив
        const usersArray = Object.values(users);

        // Сортируем пользователей по количеству очков в обратном порядке
        usersArray.sort((a, b) => b.score - a.score);

        // Выбираем только первые 10 пользователей, у которых score и timer не равны 0
        const topUsers = usersArray.filter((user) => user.score !== 0 && user.timer !== 0).slice(0, 10);

        // Создаем HTML-разметку для таблицы рейтинга
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

        // Добавляем каждого пользователя в таблицу рейтинга
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

        // Отображаем таблицу рейтинга в модальном окне
        showModal(tableHtml);
      });
    }

    // Функция для отображения модального окна с содержимым
    function showModal(content) {
      const modalContainer = document.createElement('div');
      modalContainer.classList.add('modal-container');
      modalContainer.innerHTML = `
        <div class="modal">
            <div class="modal-content">
                ${content}
            </div>
            <button id = restartButton >Закрыть</button>
        </div>
      `;

      document.body.appendChild(modalContainer);

      const closeBtn = modalContainer.querySelector('#restartButton');
      closeBtn.addEventListener('click', function () {
        modalContainer.remove();
      });

      // Делаем модальное окно видимым
      modalContainer.querySelector('.modal').style.display = 'block';
    }
  }

  return {
    addMenuAfterClear,
  };
})();
