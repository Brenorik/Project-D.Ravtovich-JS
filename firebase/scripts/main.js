const myApp = (function () {
  function showLoginForm(appContainer) {
    appContainer.innerHTML = `
      <div id="login" class="section">
        <div class="container">
          <div class="columns">
            <div class="column">
              <h1 class="is-size-2 has-text-centered">Приветствую в моем приложении</h1>
              <h2 class="is-size-4 has-text-centered">Залогиньтесь, пожалуйста.</h2>
            </div>
          </div>
          <div class="columns is-centered">
            <div class="column is-half">
              <div class="field">
                <p class="control has-icons-left has-icons-right">
                  <input id="fieldEmail" class="input is-medium" type="email" placeholder="Email">
                  <span class="icon is-small is-left">
                    <i class="fas fa-envelope"></i>
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div class="columns is-centered">
            <div class="column is-half">
              <div class="field">
                <p class="control has-icons-left">
                  <input id="fieldPassword" class="input is-medium" type="password" placeholder="Password">
                  <span class="icon is-small is-left">
                    <i class="fas fa-lock"></i>
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div class="columns is-centered">
            <div class="column">
              <div class="field is-grouped is-grouped-centered">
                <p class="control">
                  <button id="loginBtn" class="button is-success is-medium">
                    Войти
                  </button>
                </p>
              </div>
            </div>
          </div>
          <div class="columns">
            <div class="column">
              <div id="error" class="error">
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function loginError(error) {
    document.getElementById('error').innerHTML = `${error}`;
  }

  function showForm(appContainer) {
    printTestData(appContainer);
    addUserForm(appContainer);
  }

  function hideForm(appContainer) {
    showLoginForm(appContainer);
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
              <div class="field">
                <div class="control has-icons-left has-icons-right">
                  <input id="newUserEmail" class="input" type="email" placeholder="Email input" name="useremail" placeholder="Введите email" required>
                  <span class="icon is-small is-left">
                    <i class="fas fa-envelope"></i>
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

  function printUser(userList) {
    let userListContainer = document.getElementById('users-list__container');

    if (!userListContainer) {
      document.getElementById('users').innerHTML += `
        <div class="columns">
          <div class="column">
            <div class="users-list">
              <h4 class="title is-4">Список пользователей:</h4>
              <table id="users-list" class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
                <thead>
                  <tr>
                    <th>Пользователь</th>
                    <th>email</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody id="users-list__container"></tbody>
              </table>
            </div>
          </div>
        </div>
      `;
      userListContainer = document.getElementById('users-list__container');
    } else {
      userListContainer.innerHTML = '';
    }

    for (let user in userList) {
      userListContainer.append(createRow(user, userList));
    }

    function createRow(user, userList) {
      let row = document.createElement('tr'),
        td1 = document.createElement('td'),
        td2 = document.createElement('td'),
        td3 = document.createElement('td');
      td1.innerHTML = `<strong>${userList[user].username}</strong>`;
      td2.innerHTML = `${userList[user].email}`;
      td3.innerHTML = `<a href="#" data-id=${user} class="delete is-medium" title="удалить пользователя">Удалить</a>`;
      row.append(td1);
      row.append(td2);
      row.append(td3);

      return row;
    }
  }

  function clearUserList() {
    const container = document.getElementById('users-list__container');
    if (container) container.innerHTML = '';
  }

  function login(userEmail, userPass) {
    if (userEmail && userPass) {
      auth
        .signInWithEmailAndPassword(userEmail, userPass)
        .then((userCredential) => {
          const user = userCredential.user;
          if (user) {
            showForm(document.getElementById('app'));
            printUsersList();
            const userData = {
              user: user,
              page: document.location.hash || '#main',
            };
            sessionStorage.setItem('my_firebase_user', JSON.stringify(userData));
          } else {
            hideForm(document.getElementById('app'));
            sessionStorage.removeItem('my_firebase_user');
          }
        })
        .catch(function (error) {
          console.log('Error: ' + error.message);
          loginError('Неверный email или пароль. Введите корректные данные.');
        });
    } else {
      loginError('Пустое поле Email или Password. Введите данные в указанные поля.');
    }
  }

  function logout() {
    auth.signOut().then(() => {
      hideForm(document.getElementById('app'));
      sessionStorage.removeItem('my_firebase_user');
      console.log('Пшёл вон! =)');
    });
  }

  function addUser(username, useremail) {
    myAppDB
      .ref('users/' + `user_${username.replace(/\s/g, '').toLowerCase()}`)
      .set({
        username: `${username}`,
        email: `${useremail}`,
      })
      .then(function () {
        console.log('Пользователь добавлен в коллецию users');
      })
      .catch(function (error) {
        console.error('Ошибка добавления пользователя: ', error);
      });
  }

  function deleteUser(userid) {
    myAppDB
      .ref('users/' + userid)
      .remove()
      .then(function () {
        console.info('Пользователь удален из коллеции users');
      })
      .catch(function (error) {
        console.error('Ошибка удаления пользователя: ', error);
      });
  }

  function getUsersList() {
    myAppDB
      .ref('users/')
      .once('value')
      .then(function (snapshot) {
        console.log('Users list:');
        console.log(snapshot.val());
      })
      .catch(function (error) {
        console.log('Error: ' + error.code);
      });
  }

  function printUsersList() {
    myAppDB.ref('users/').on(
      'value',
      (snapshot) => printUser(snapshot.val()),
      (error) => console.log('Error: ' + error.code)
    );
  }

  function addEventListeners() {
    const appContainer = document.getElementById('app');
    appContainer.addEventListener('click', function (event) {
      const form = appContainer.querySelector('#addNewUser');

      if (event.target && event.target.id === 'loginBtn') {
        event.preventDefault();
        event.stopPropagation();
        login(appContainer.querySelector('#fieldEmail').value, appContainer.querySelector('#fieldPassword').value);
      }

      if (event.target && event.target.id === 'logoutBtn') {
        event.preventDefault();
        event.stopPropagation();
        logout();
      }

      if (event.target && event.target.id === 'addBtn') {
        event.preventDefault();
        event.stopPropagation();
        addUser(form.newUserName.value, form.newUserEmail.value);
        form.newUserName.value = '';
        form.newUserEmail.value = '';
      }

      if (event.target && event.target.classList.contains('delete')) {
        event.preventDefault();
        event.stopPropagation();
        deleteUser(event.target.dataset.id);
      }
    });
  }

  return {
    init: function () {
      const appContainer = document.getElementById('app');
      showLoginForm(appContainer);
      addEventListeners();
    },
  };
})();

myApp.init();
