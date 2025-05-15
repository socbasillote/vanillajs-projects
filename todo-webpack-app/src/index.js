// src/index.js
import './style.css';

import { setupDOM, setupThemeToggle } from './dom.js';
import { signup, login, logout, getCurrentUser } from './auth.js';
import { loadTodos, saveTodos } from './storage.js';
import { setTodos } from './logic.js';

// UI Elements
const authSection = document.getElementById('auth-section');
const todoApp = document.getElementById('todo-app');

const loginBtn = document.getElementById('login-btn');
const signupBtn = document.getElementById('signup-btn');
const logoutBtn = document.getElementById('logout-btn');

const signupUsername = document.getElementById('signup-username');
const signupPassword = document.getElementById('signup-password');
const loginUsername = document.getElementById('login-username');
const loginPassword = document.getElementById('login-password');

function showTodoApp() {
  authSection.classList.add('hidden');
  todoApp.classList.remove('hidden');
  setupThemeToggle();
  setupDOM();
}

function showAuth() {
  authSection.classList.remove('hidden');
  todoApp.classList.add('hidden');
}

// Load correct view
const currentUser = getCurrentUser();
if (currentUser) {
  setTodos(loadTodos()); // Load user's todos
  showTodoApp();
} else {
  showAuth();
}

// Signup logic
signupBtn.addEventListener('click', () => {
  const user = signupUsername.value.trim();
  const pass = signupPassword.value.trim();
  if (user && pass) {
    if (signup(user, pass)) {
      setTodos([]); // start with empty todos
      showTodoApp();
    } else {
      alert('Username already exists');
    }
  }
});

// Login logic
loginBtn.addEventListener('click', () => {
  const user = loginUsername.value.trim();
  const pass = loginPassword.value.trim();
  if (user && pass) {
    if (login(user, pass)) {
      setTodos(loadTodos());
      showTodoApp();
    } else {
      alert('Invalid username or password');
    }
  }
});

// Logout logic
logoutBtn.addEventListener('click', () => {
  logout();
  showAuth();
});
