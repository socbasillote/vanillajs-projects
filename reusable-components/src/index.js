import './style.css';

import Dropdown from './components/Dropdown.js';
import Modal from './components/Modal.js';
import LoginForm from './components/LoginForm.js';
import Toast from './components/Toast.js';

const app = document.getElementById('app');

// Dropdown Component
const dropdown = new Dropdown({
    label: 'Choose a fruit:',
    options: [
        { label: 'Apple', value: 'apple' },
        { label: 'Banana', value: 'banana' },
        { label: 'Cherry', value: 'cherry' }
        
    ],
    onChange: (value) => {
        console.log('Selected:', value);
    }
});

app.appendChild(dropdown.render());

// Button to open modal
const openLoginModal  = document.createElement('button');
openLoginModal.textContent = 'Open Login Modal';
openLoginModal.className = 'modal-close'; // reuse style
openLoginModal.onclick = () => {
    const loginForm = new LoginForm(({ username, password }) => {
        alert(`Logged in as ${username} with password ${password}`)
    });

    const modal = new Modal({
        title: 'Login',
        content: loginForm.render()
    });

    document.body.appendChild(modal.render());
};
app.appendChild(openLoginModal);

// Clear Saved Login Button
const clearLoginBtn = document.createElement('button');
clearLoginBtn.textContent = 'Clear Saved Login';
clearLoginBtn.className = 'modal-close'; // optional styling reuse
clearLoginBtn.onclick = () => {
  localStorage.removeItem('savedLogin');
  Toast.show('Saved login cleared!', 'success');
};

app.appendChild(clearLoginBtn);
Toast.show('Message sent!', 'info');