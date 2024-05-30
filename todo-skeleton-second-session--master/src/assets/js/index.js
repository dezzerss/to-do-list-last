document.addEventListener("DOMContentLoaded", () => {
  renderKanban();

  const addTaskButtons = document.querySelectorAll(".kanban__icon--add");
  const modal = document.querySelector(".modal");
  const closeModalButton = document.querySelector(".close-modal");
  const cancelButton = document.querySelector(".cancel-button");
  const form = document.querySelector(".modal form");
  const submit = document.querySelector(".to_send-submit");
  const addBoardElement = document.querySelectorAll(".header__icon--add");
  const modalBoard = document.querySelector(".modal-board");
  const closeModalBoard = document.querySelector(".close-modal__board");
  const cancelBoard = document.querySelector(".cancel-button__board");
  const formBoard = document.querySelector(".modal-board form")
  const submitBoard = document.querySelector(".to_send-submit__board");

  formBoard.addEventListener("submitBoard", (e) => {
    e.preventDefault();

    const titleNameBoard = document.getElementById("title-name-board").value;

    if (titleNameBoard.trim() === "") {
      alert("Пожалуйста, введите название доски!");
      return;
    }

    const addKanbanContainer = document.querySelector(".kanban"); 
    const addNewSection = document.createElement('div');
    addNewSection.classList.add('kanban__column--${titleNameBoard}');
    addNewSection.innerHTML = `
    <div class="kanban__header">
      <div class="kanban__header-content">
        <img src="./src/assets/img/kanban/plus.svg" alt="Колонка ${titleNameBoard}" class="kanban__icon kanban__icon--column">
        <h2 class="kanban__title">${titleNameBoard}</h2>
      </div>
      <img src="./src/assets/img/kanban/plus.svg" alt="Добавить задачу" class="kanban__icon kanban__icon--add">
    </div>
    <div class="kanban__list"></div>
  `;

  addKanbanContainer.appendChild(addNewSection);

  document.getElementById("title-name-board").value = "";
  })

  // submitBoard.addEventListener("click", () => {
  //   modalBoard.style.display = "none"
  //   formBoard.stylevalue = "";
  // })

  

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

    // function addTaskToList() {
    const taskContainer = document.querySelector('.kanban__list');
    const taskContent = document.createElement('div');
    taskContent.classList.add('task-item-wrapper');
    taskContent.innerHTML = `
            <div class="task-item">
              <div class="task-item__header">
                <h3 class="task-item__title">${title}</h3>
                <button type="button" class="remove-item">✖</button>
              </div>
              <p class="task-item__description">${description}</p>
                <div class="task-item__info">
                  <div class="task-item__complexity">
                    <ul class="complexity__dot">
                      <li class="complexity__dot--standart"></li>
                      <li class="complexity__dot--standart"></li>
                      <li class="complexity__dot--standart"></li>
                    </ul>
                  </div>
                  <span class="task-item__client">${dueDate}</span>
                </div>
            </div>
      `;

    const removeButton = taskContent.querySelector('.remove-item'); 
    removeButton.addEventListener('click', () => {
      taskContent.remove(); 
    });
   
    taskContainer.appendChild(taskContent);

    document.getElementById("title-task").value = "";
    document.getElementById("description-task").value = "";
    form.elements["date"].value = "";
    // }
  });


  addTaskButtons.forEach((button) => {
    button.addEventListener("click", () => {
      modal.style.display = "flex";
    });
  });

  addBoardElement.forEach((button) => {
    button.addEventListener("click", () => {
      modalBoard.style.display = "flex";
    });
  });

  closeModalBoard.addEventListener("click", () => {
    modalBoard.style.display = "none";
  });

  cancelBoard.addEventListener("click", () => {
    modalBoard.style.display = "none";
  });

  closeModalButton.addEventListener("click", () => {
    modal.style.display = "none";
  });

  cancelButton.addEventListener("click", () => {
    modal.style.display = "none";
  });

  submit.addEventListener("click", () => {
    modal.style.display = "none"
    form.stylevalue = "";
  })

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

// document.addEventListener('DOMContentLoaded', (event) => {

//   const draggables = document.querySelector('task-item');
//   const colums = document.querySelector('kanban__column');


//   draggables.forEach(function (item) {
//       item.addEventListener('dragstart', function () {
//           item.classList.add('dragging');
//       })

//       item.addEventListener('dragend', function () {
//           item.classList.remove('dragging');
//       })
//       item.getAttribute('draggable');
//       item.setAttribute('draggable', 'true');
//   })


//   colums.forEach(function (item) {
//       item.addEventListener('dragover', function (event) {
//           event.preventDefault();
//           const draggable = document.querySelector('.dragging');
//           item.querySelector('.kanban__list').appendChild(draggable);
//       })
//   })
// })