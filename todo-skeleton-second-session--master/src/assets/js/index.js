document.addEventListener("DOMContentLoaded", () => {
  renderKanban();

  const addTaskButtons = document.querySelectorAll(".kanban__icon--add");
  const modal = document.querySelector(".modal");
  const closeModalButton = document.querySelector(".close-modal");
  const cancelButton = document.querySelector(".cancel-button");
  const form = document.querySelector(".modal form");
  const submit = document.querySelector(".to_send-submit")

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.getElementById("title-task").value;
    const description = document.getElementById("description-task").value;
    const dueDate = form.elements["date"].value;

    if (title.trim() === "") {
      alert("Пожалуйста, введите название задачи!");
      return;
    }

    if (description.trim() === "") {
      alert("Пожалуйста, введите описание задачи!");
      return;
    }

    if (dueDate.trim() === "") {
      alert("Пожалуйста, введите дату!");
      return;
    }

    const taskContainer = document.querySelector('.kanban__list');

    const taskItem = document.createElement('div');
    taskItem.classList.add('task-item');
    
    const taskItemInfo = document.createElement('div');
    taskItemInfo.classList.add('task-item__info');

    const taskContent = document.createElement('div');
    taskContent.classList.add('task-item__complexity');
    
    const taskTitle = document.createElement('div');
    taskTitle.textContent = title;
    
    const taskDescription = document.createElement('div');
    taskDescription.textContent = description;
    
    const taskDueDate = document.createElement('div');
    taskDueDate.textContent = dueDate;
    
    taskContent.appendChild(taskTitle);
    taskContent.appendChild(taskDescription);
    taskContent.appendChild(taskDueDate);
    
    /*const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Удалить задачу';
    deleteButton.classList.add('delete-button');
    
    deleteButton.addEventListener('click', () => {
        taskItem.remove();
    });*/
   
    taskItem.appendChild(taskContent);
    
    /*taskItem.appendChild(deleteButton);*/
    
    taskContainer.appendChild(taskItem);
    
    document.getElementById("title-task").value = "";
    document.getElementById("description-task").value = "";
    form.elements["date"].value = "";

    /*tasks.forEach((task) => {
      const taskItem = document.createElement('div');
      taskItem.className = 'task';
      taskItem.innerHTML = `
      <div class=".task-item ${task.title}">
        <div class="title-task">
          ${title}
        </div>
        <div class="description-task">
          ${description}
        </div>
        <div class="date">
          ${dueDate}
        </div>
      </div>
      <div class=""></div>
    `;
    })
    taskContainer.appendChild(taskItem);*/ 
  });

  addTaskButtons.forEach((button) => {
    button.addEventListener("click", () => {
      modal.style.display = "flex";
    });
  });

  closeModalButton.addEventListener("click", () => {
    modal.style.display = "none";
  });

  cancelButton.addEventListener("click", () => {
    modal.style.display = "none";
  });

 /* submit.addEventListener("click", () => {
    modal.style.display = "none"
    form.stylevalue = "";
  })*/

});


function renderTaskElement() {
  // Вставить код рендера задачи
}


function renderKanban() {
  const kanbanContainer = document.querySelector(".kanban");

  columns.forEach((column) => {
    const columnSection = document.createElement("section");
    columnSection.className = `kanban__column kanban__column--${column.id}`;
    columnSection.innerHTML = `
          <div class="kanban__header">
            <div class="kanban__header-content">
              <img src="${column.icon}" alt="Колонка ${column.title}" class="kanban__icon kanban__icon--column">
              <h2 class="kanban__title">${column.title}</h2>
            </div>
            <img src="./src/assets/img/kanban/plus.svg" alt="Добавить задачу" class="kanban__icon kanban__icon--add">
          </div>
          <div class="kanban__list"></div>
        `;

    const listContainer = columnSection.querySelector(".kanban__list");
    column.tasks.forEach((taskId) => {
      const task = tasks.find((task) => task.id === taskId);
      if (task) {
        listContainer.appendChild(renderTaskElement(task));
      }
    });

    kanbanContainer.appendChild(columnSection);
  });
}