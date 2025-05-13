// dom.js
import { createTodoItem } from './logic';

export function addTodoToDOM(text) {
  const list = document.getElementById('todo-list');
  const item = createTodoItem(text);
  list.appendChild(item);
}
