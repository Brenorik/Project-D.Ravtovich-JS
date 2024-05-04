const userModule = (function () {
  function showForm(appContainer) {
    printTestData(appContainer);
    addUserForm(appContainer);
  }

  function hideForm(appContainer) {
    loginModule.showLoginForm(appContainer);
  }

  function printTestData(appContainer) {
    appContainer.innerHTML = `
      <section id="userForm" class="section">
        <div class="container">
          <a href="#" id="logoutBtn" class="logout button is-primary">Выйти</a>
          <h1 class="title">Hello from AppView!</h1>
          <p class="subtitle">Test app created.</p>
          <div id="users"></div>
        </div>
      </section>
    `;
  }

  function addUserForm(appContainer) {
    document.getElementById('users').innerHTML += `
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
                  <button class="button is-link" id="addBtn">Добавить</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    `;
  }

  function addUser(username) {
    myAppDB
      .ref('users/' + `user_${username.replace(/\s/g, '').toLowerCase()}`)
      .set({
        username: `${username}`,
        score: 'score',
        timer: 'timer',
      })
      .then(function () {
        console.log('Пользователь добавлен в коллецию users');
        menuModule.addMenuAfterClear(username);
      })
      .catch(function (error) {
        console.error('Ошибка добавления пользователя: ', error);
      });
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
    hideForm,
    printTestData,
    addUserForm,
    addUser,
    addEventListeners,
  };
})();
