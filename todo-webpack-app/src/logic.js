// logic.js
import { saveTodos, loadTodos } from './storage.js';

let todos = loadTodos();  // Load todos for the current user

export function getTodos() {
  return todos;
}

export function addTodo(task) {
  const newTodo = { id: Date.now().toString(), task, completed: false };
  todos.push(newTodo);
  saveTodos(todos);  // Save only for active user
  return newTodo;
}

export function removeTodo(id) {
  todos = todos.filter(todo => todo.id !== id);
  saveTodos(todos);
}

export function toggleComplete(id, completed) {
  const todo = todos.find(t => t.id === id);
  if (todo) {
    todo.completed = completed;
    saveTodos(todos);
  }
}

export function clearTodos() {
  todos = [];
  saveTodos(todos);
}

export function setTodos(newTodos) {
  todos = newTodos;
  saveTodos(todos);
}

// Reload todos when user changes (e.g. after login)
export function reloadTodos() {
  todos = loadTodos();
}
