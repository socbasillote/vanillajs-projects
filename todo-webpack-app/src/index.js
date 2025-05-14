// index.js
import { setupDOM } from './dom.js';
import { setupThemeToggle } from './dom.js';
import { getCurrentUser, login, signup, logout } from './auth.js';
import { setTodos } from './logic.js';
import { loadTodosForUser } from './auth.js';

const authSection = document.getElementById('auth-section');
const appSection = document.getElementById('app-section');

function showApp() {
  authSection.style.display = 'none';
  appSection.style.display = 'block';
  setupThemeToggle();
  setupDOM();
}

function showAuth() {
  authSection.style.display = 'block';
  appSection.style.display = 'none';
}

// Auth Events
document.getElementById('login-btn').addEventListener('click', () => {
  const username = document.getElementById('auth-username').value.trim();
  if (username && login(username)) {
    const userTodos = loadTodosForUser(username);
    setTodos(userTodos);
    showApp();
  } else {
    alert('User not found.');
  }
});

document.getElementById('signup-btn').addEventListener('click', () => {
  const username = document.getElementById('auth-username').value.trim();
  if (username && signup(username)) {
    setTodos([]); // new user starts with no todos
    showApp();
  } else {
    alert('Username already exists.');
  }
});

document.getElementById('logout-btn').addEventListener('click', () => {
  logout();
  showAuth();
});

// Load current session
const user = getCurrentUser();
if (user) {
  const userTodos = loadTodosForUser(user);
  setTodos(userTodos);
  showApp();
} else {
  showAuth();
}
