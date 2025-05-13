const KEY = "todos";

export function saveTodos(todos) {
    localStorage.setItem(KEY, JSON.stringify(todos));
}

export function loadTodos() {
    return JSON.parse(localStorage.getItem(KEY) || []);
}