export default class LoginForm {
  constructor(onSubmit) {
    this.onSubmit = onSubmit;
  }

  render() {
    const form = document.createElement('form');
    form.className = 'login-form';

    const errorEl = document.createElement('div');
    errorEl.className = 'form-error';

    const usernameLabel = document.createElement('label');
    usernameLabel.textContent = 'Username:';
    const usernameInput = document.createElement('input');
    usernameInput.type = 'text';
    usernameInput.name = 'username';

    // Autofill from LocalStorage if available
    const savedLogin = JSON.parse(localStorage.getItem('savedLogin'));
    if (savedLogin && savedLogin.username) {
    usernameInput.value = savedLogin.username;
    }

    const passwordLabel = document.createElement('label');
    passwordLabel.textContent = 'Password:';
    const passwordInput = document.createElement('input');
    passwordInput.type = 'password';
    passwordInput.name = 'password';

    const submitBtn = document.createElement('button');
    submitBtn.type = 'submit';
    submitBtn.textContent = 'Login';

    form.appendChild(errorEl);
    form.appendChild(usernameLabel);
    form.appendChild(usernameInput);
    form.appendChild(passwordLabel);
    form.appendChild(passwordInput);
    form.appendChild(submitBtn);

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const username = usernameInput.value.trim();
      const password = passwordInput.value.trim();

      if (!username || !password) {
        errorEl.textContent = 'Username and password are required!';
        return;
      }

      // Save to LocalStorage
      localStorage.setItem('savedLogin', JSON.stringify({ username }));

      // Clear error if valid
      errorEl.textContent = '';
      this.onSubmit({ username, password });
    });

    return form;
  }
}
