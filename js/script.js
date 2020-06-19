'use strict';

const todoControl = document.querySelector('.todo-control'),
  headerInput = document.querySelector('.header-input'),
  todoList = document.querySelector('.todo-list'),
  todoCompleted = document.querySelector('.todo-completed');

const todoData = JSON.parse(localStorage.getItem('todoData') || '[]');


//Функция вывода целей на экран
const render = function() {
  todoList.textContent = '';
  todoCompleted.textContent = '';
  localStorage.setItem('todoData', JSON.stringify(todoData));

  todoData.forEach(function(item, index) {
    const li = document.createElement('li');
    li.classList.add('todo-item');
    li.innerHTML = '<span class="text-todo">' + item.value + '</span>' +
      '<div class="todo-buttons">' +
        '<button class="todo-remove"></button>' +
        '<button class="todo-complete"></button>' +
      '</div>';

      if (item.completed) {
        todoCompleted.append(li);
      } else {
        todoList.append(li);
      }

      const todoComplete = li.querySelector('.todo-complete');
      todoComplete.addEventListener('click', function() {
        item.completed = !item.completed;
        render();
      });

      const todoRemove = li.querySelector('.todo-remove');
      todoRemove.addEventListener('click', function() {
        todoData.splice(index, 1);
        render();
      });
  });
};


//Занесение данных в массив todoData и вывод на экран
todoControl.addEventListener('submit', function(event) {
  event.preventDefault();
  if (headerInput.value.trim()) {
    const newTodo = {
      value: headerInput.value.trim(),
      completed: false
    };
    todoData.push(newTodo);
    render();
    headerInput.value = null;
  }
});

render();