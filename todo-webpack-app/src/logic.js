// logic.js
export function createTodoItem(text) {
  const li = document.createElement('li');
  li.textContent = text;
  return li;
}
