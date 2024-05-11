const userModule = (function () {
  function showForm(appContainer) {
    printTestData(appContainer);
    addUserForm(appContainer);
  }

  function printTestData(appContainer) {
    appContainer.innerHTML = `
      <section id="userForm" class="section">
        <div class="container">
          <h1 class="title">Ага!?</h1>
          <p class="subtitle">Какой псевдоним ты используешь сегодня?</p>
          <div id="users"></div>
        </div>
      </section>
    `;
  }

  function addUserForm(appContainer) {
    appContainer.innerHTML = `
      <section id="userForm" class="section">
        <div class="container">
          <h1 class="title">Ага!?</h1>
          <p class="subtitle">Какой псевдоним ты используешь сегодня?</p>
          <div id="users"></div>
        </div>
      </section>
    `;

    const usersDiv = document.getElementById('users');
    usersDiv.innerHTML = `
      <div class="columns">
        <div class="column">
          <form id="addNewUser">
            <h4 class="title is-4">Добавить пользователя</h4>
            <div class="field-body">
              <div class="field">
                <div class="control has-icons-left has-icons-right">
                  <input type="text" class="input" id="newUserName" name="username" placeholder="Введите имя" required>
                  <span class="icon is-small is-left">
                    <i class="fas fa-user"></i>
                  </span>
                </div>
              </div>
              <div class="field is-horizontal">
                <div class="control">
                  <button class="button is-link" id="addBtn" disabled>Добавить</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    `;

    const newUserNameInput = usersDiv.querySelector('#newUserName');
    const addBtn = usersDiv.querySelector('#addBtn');

    // Слушатель события для поля ввода имени пользователя
    newUserNameInput.addEventListener('input', function () {
      if (newUserNameInput.value.trim() !== '') {
        addBtn.removeAttribute('disabled'); // Активируем кнопку, если поле не пустое
      } else {
        addBtn.setAttribute('disabled', 'disabled'); // Деактивируем кнопку, если поле пустое
      }
    });
  }

  function addUser(username) {
    if (username) {
      myAppDB
        .ref('users/' + `user_${username.replace(/\s/g, '').toLowerCase()}`)
        .set({
          username: `${username}`,
          score: 0,
          timer: 0,
        })
        .then(function () {
          console.log('Пользователь добавлен в коллецию users');
          menu.addMenuAfterClear(username);
          audioManager.playMenuMusic();
        })
        .catch(function (error) {
          console.error('Ошибка добавления пользователя: ', error);
        });
    } else {
      console.error('Ошибка: имя пользователя не указано.');
    }
  }

  function addEventListeners() {
    const appContainer = document.getElementById('app');
    appContainer.addEventListener('click', function (event) {
      const form = appContainer.querySelector('#addNewUser');

      if (event.target && event.target.id === 'loginBtn') {
        event.preventDefault();
        event.stopPropagation();
        loginModule.login(
          appContainer.querySelector('#fieldEmail').value,
          appContainer.querySelector('#fieldPassword').value
        );
      }

      if (event.target && event.target.id === 'logoutBtn') {
        event.preventDefault();
        event.stopPropagation();
        loginModule.logout();
      }

      if (event.target && event.target.id === 'addBtn') {
        event.preventDefault();
        event.stopPropagation();
        addUser(form.newUserName.value);
        form.newUserName.value = '';
        clearScreen(); // Очищаем экран
        // menuModule.addMenuAfterClear(); // Добавляем меню после очистки экрана
      }

      if (event.target && event.target.classList.contains('delete')) {
        event.preventDefault();
        event.stopPropagation();
        deleteUser(event.target.dataset.id);
      }
      if (event.target && event.target.id === 'registerBtn') {
        event.preventDefault();
        event.stopPropagation();
        registrationModule.showRegistrationForm(appContainer); // Показываем форму регистрации
      }

      if (event.target && event.target.id === 'registerBtnForm') {
        event.preventDefault();
        event.stopPropagation();
        registrationModule.register(
          appContainer.querySelector('#registerEmail').value,
          appContainer.querySelector('#registerPassword').value
        );
      }

      function clearScreen() {
        const appContainer = document.getElementById('app');
        appContainer.innerHTML = ''; // Очищаем содержимое контейнера
      }
    });
  }

  return {
    showForm,

    printTestData,
    addUserForm,
    addUser,
    addEventListeners,
  };
})();
