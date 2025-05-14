// dom.js
import { addTodo, getTodos, removeTodo, toggleComplete, clearTodos, setTodos, reloadTodos } from './logic';

import { saveTodos } from './storage';

export function setupThemeToggle() {
  const toggleBtn = document.getElementById('theme-toggle');

  const enableDark = () => {
    document.documentElement.style.setProperty('--bg-color', '#121212');
    document.documentElement.style.setProperty('--text-color', '#ffffff');
    document.documentElement.style.setProperty('--input-bg', '#333');
    document.documentElement.style.setProperty('--btn-bg', '#bb86fc');
    localStorage.setItem('theme', 'dark');
    toggleBtn.textContent = '🌙';
  };

  const enableLight = () => {
    document.documentElement.style.setProperty('--bg-color', '#ffffff');
    document.documentElement.style.setProperty('--text-color', '#000000');
    document.documentElement.style.setProperty('--input-bg', '#f0f0f0');
    document.documentElement.style.setProperty('--btn-bg', '#007bff');
    localStorage.setItem('theme', 'light');
    toggleBtn.textContent = '🌞';
  };

  const currentTheme = localStorage.getItem('theme');
  if (currentTheme === 'dark') {
    enableDark();
  } else {
    enableLight();
  }

  toggleBtn.addEventListener('click', () => {
    const isDark = localStorage.getItem('theme') === 'dark';
    if (isDark) {
      enableLight();
    } else {
      enableDark();
    }
  });
}


export function setupDOM() {
  const inputs = document.getElementById('todo-input');
  const list = document.getElementById('todo-list');
  const btn = document.getElementById('add-btn');
  const clearBtn = document.getElementById('clear-btn')

  let currentFilter = 'all';

  const searchInput = document.getElementById('search-input');
  let searchQuery = '';

  // Render one todo item
  function renderTodo(todo) {
    const li = document.createElement('li');
    li.dataset.id = todo.id;

    li.setAttribute('draggable', true);
    li.classList.add('draggable');

    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
    deleteBtn.classList.add('delete-btn');

    deleteBtn.addEventListener('click', () => {
      removeTodo(todo.id);

      // animation out before removing from dom
      li.classList.add('fade-out');
      li.addEventListener('transitionend', () => li.remove(), { once: true});
  
    })

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;

    const span = document.createElement('span');
    span.textContent = todo.task;
    if (todo.completed) {
      span.classList.add('completed');
    }  else {
      span.classList.remove('completed');
    }
    
    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);
    list.appendChild(li);
  }

  // Initial render from storage
  function renderList() {
    list.innerHTML = '';
    getTodos()
    .filter(todo => {
      const matchesFilter =
        currentFilter === 'all' ||
        (currentFilter === 'active' && !todo.completed) ||
        (currentFilter === 'completed' && todo.completed);
      
        const matchesSearch = todo.task.toLowerCase().includes(searchQuery.toLowerCase());

        return matchesFilter && matchesSearch;
    
    })
    .forEach(renderTodo);
  }
  renderList();

  // Drag
  let dragSrcEl = null;
  list.addEventListener('dragstart', (e) => {
    if (e.target.tagName === 'LI') {
      dragSrcEl = e.target;
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', e.target.dataset.id);
      e.target.classList.add('dragging');
    }
  });

  list.addEventListener('dragover', (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';

    const draggingOver = e.target.closest('li');
    if (draggingOver && draggingOver !== dragSrcEl) {
      const bounding = draggingOver.getBoundingClientRect();
      const offset = e.clientY - bounding.top;
      const half = bounding.height / 2;

      if (offset > half) {
        draggingOver.after(dragSrcEl);
      } else {
        draggingOver.before(dragSrcEl);
      }
    }
  });

  list.addEventListener('drop', (e) => {
    e.preventDefault();
    const newOrder = Array.from(list.children).map(li => li.dataset.id);

    // Reorder todos in memory based on new DOM order
    const reorderedTodos = newOrder.map(id => getTodos().find(todo => todo.id === id));

    // Update and save

    setTodos(reorderedTodos);
    renderList();
  });

  list.addEventListener('dragend', (e) => {
    if (e.target.classList.contains('dragging')) {
      e.target.classList.remove('dragging');
    }
  });

  // Add new todo
  btn.addEventListener('click', () => {
    const task = inputs.value.trim();
    if (task) {
      addTodo(task);
      renderList();
      inputs.value = '';
    }
  });

  inputs.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      const task = inputs.value.trim();
      if (task) {
        addTodo(task);
        renderList();
        inputs.value = '';
      }
    }
  });

  list.addEventListener('change', (e) => {
    if (e.target.type === 'checkbox') {
      const li = e.target.closest('li');
      const id = li.dataset.id;
      const span = li.querySelector('span');
      const completed = e.target.checked;

      toggleComplete(id, completed); // update in-memory and localStorage

      span.classList.toggle('completed', completed); // update DOM without full re-render
    }
  });


  clearBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to delete all todos?')) {
      clearTodos();
      list.innerHTML = '';
    }
  });

  document.querySelectorAll('#filters button').forEach(btn => {
    btn.addEventListener('click', () => {
      currentFilter = btn.dataset.filter;
      renderList();

      // Highlight selected button (optional)
      document.querySelectorAll('#filters button').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // searchInput.addEventListener('input', (e) => {
  //   searchQuery = e.target.value;
  //   renderList();
  // })

  window.addEventListener('storage', (e) => {
    if (e.key === 'todos') {
      renderList();
    }
  })
  reloadTodos();

}

