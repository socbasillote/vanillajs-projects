// index.js
import './style.css';
import { addTodoToDOM } from './dom';

document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('todo-input');
  const button = document.getElementById('add-btn');

  button.addEventListener('click', () => {
    const text = input.value.trim();
    if (text !== '') {
      addTodoToDOM(text);
      input.value = '';
    }
  });
});
