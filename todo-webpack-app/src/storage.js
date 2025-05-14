// storage.js
import { getCurrentUser, loadTodosForUser, saveTodosForUser } from './auth.js';

export function saveTodos(todos) {
  const user = getCurrentUser();
  if (user) {
    saveTodosForUser(user, todos);
  }
}

export function loadTodos() {
  const user = getCurrentUser();
  return user ? loadTodosForUser(user) : [];
}
