const loginModule = (function () {
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
      <div class="columns is-centered">
        <div class="column">
          <div class="field is-grouped is-grouped-centered">
            <p class="control">
              <button id="registerBtn" class="button is-primary is-medium">
                Регистрация
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

  function login(userEmail, userPass) {
    if (userEmail && userPass) {
      auth
        .signInWithEmailAndPassword(userEmail, userPass)
        .then((userCredential) => {
          const user = userCredential.user;
          if (user) {
            userModule.showForm(document.getElementById('app'));
            userModule.printUsersList();
            const userData = {
              user: user,
              page: document.location.hash || '#main',
            };
            sessionStorage.setItem('my_firebase_user', JSON.stringify(userData));
          } else {
            userModule.hideForm(document.getElementById('app'));
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
      userModule.hideForm(document.getElementById('app'));
      sessionStorage.removeItem('my_firebase_user');
      console.log('Пшёл вон! =)');
    });
  }

  return {
    showLoginForm,
    loginError,
    login,
    logout,
  };
})();