// auth.js

const USERS_KEY = 'todo_users';
const CURRENT_USER_KEY = 'current_user';

function getUsers() {
  return JSON.parse(localStorage.getItem(USERS_KEY)) || {};
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function getCurrentUser() {
  return localStorage.getItem(CURRENT_USER_KEY);
}

export function login(username) {
  const users = getUsers();
  if (users[username]) {
    localStorage.setItem(CURRENT_USER_KEY, username);
    return true;
  }
  return false;
}

export function signup(username) {
  const users = getUsers();
  if (users[username]) {
    return false; // user exists
  }
  users[username] = [];
  saveUsers(users);
  localStorage.setItem(CURRENT_USER_KEY, username);
  return true;
}

export function logout() {
  localStorage.removeItem(CURRENT_USER_KEY);
}

export function loadTodosForUser(username) {
  const users = getUsers();
  return users[username] || [];
}

export function saveTodosForUser(username, todos) {
  const users = getUsers();
  users[username] = todos;
  saveUsers(users);
}
