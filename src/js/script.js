const input = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');
const filters = document.querySelectorAll('.filter');

let todos = JSON.parse(localStorage.getItem('todos')) || [];
let currentFilter = 'all';


function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

// Renderizando a lista de tarefas
function renderTodos() {
  todoList.innerHTML = '';

  const filteredTodos = todos.filter(todo => {
    if (currentFilter === 'all') return true;
    if (currentFilter === 'pending') return !todo.completed;
    if (currentFilter === 'completed') return todo.completed;
  });

  filteredTodos.forEach((todo, index) => {
    const lista = document.createElement('lista');
    lista.className = 'todo-item' + (todo.completed ? ' completed' : '');
    
    lista.innerHTML = `
    <span>${todo.text}</span>
    <div>
      <button onclick="toggleTodo(${index})"><i class="fa-solid fa-check"></i></button>
      <button onclick="editTodo(${index})"><i class="fa-solid fa-pen-clip"></i></button>
      <button onclick="deleteTodo(${index})"><i class="fa-solid fa-trash-can"></i></button>
    </div>
  `;
    todoList.appendChild(lista);
  });
}

// Adicionando tarefas
addBtn.addEventListener('click', () => {
  const text = input.value.trim();
  if (text === '') return;

  todos.push({ text, completed: false });
  input.value = '';
  saveTodos();
  renderTodos();
  updateCounter();

});


function toggleTodo(index) {
  todos[index].completed = !todos[index].completed;
  saveTodos();
  renderTodos();
  updateCounter();

}

function deleteTodo(index) {
  todos.splice(index, 1);
  saveTodos();
  renderTodos();
  updateCounter();

}

// editar uma tarefa
function editTodo(index) {
    const novoTexto = prompt("Editar tarefa:", todos[index].text);
    if (novoTexto !== null && novoTexto.trim() !== "") {
      todos[index].text = novoTexto.trim();
      saveTodos();
      renderTodos();
      updateCounter();

    }
  }

// Filtro
filters.forEach(btn => {
  btn.addEventListener('click', () => {
    filters.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = btn.dataset.filter;
    renderTodos();
  });
});
renderTodos();

function updateCounter() {
    const total = todos.length;
    const pendentes = todos.filter(todo => !todo.completed).length;
    const concluidas = todos.filter(todo => todo.completed).length;
  
    document.getElementById("counter").textContent =
      `Total: ${total} | Pendentes: ${pendentes} | Concluídas: ${concluidas}`;
  }
  updateCounter();
  

function Enter(apertouEnter){
    if (apertouEnter.key === 'Enter') {
        addBtn.click();
    }
}
    input.addEventListener('keypress', Enter);

    
// Excluir todas as tarefas com confirmação
const clearBtn = document.getElementById('clear-all');
clearBtn.addEventListener('click', () => {
  if (todos.length === 0) {
    alert("Nenhuma tarefa para excluir.");
    return;
  }

  const confirmDelete = confirm("Tem certeza que deseja excluir TODAS as tarefas?");
  if (confirmDelete) {
    todos = [];
    saveTodos();
    renderTodos();
    updateCounter();

  }
});
