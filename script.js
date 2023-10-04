const tasksArray = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : []; //to check if there are any tasks in the local storage, if there are, then we will parse them, if not, then we will create an empty array
console.log(tasksArray);

document.getElementById("add").addEventListener("click", function() { //when the add button is clicked, the function will be called
    const task = document.getElementById("task").value; //to get the value of the task
    let date = new Date();
    let dateArray = [];
 
    dateArray.push(date.getDate());
    dateArray.push(date.getMonth() + 1);
    dateArray.push(date.getFullYear());
 
    let dateStr = dateArray.join('/');
    document.getElementById('date').innerHTML = dateStr;
    createTask(task, dateStr); //to call the function to create the task
});

function createTask(task, date) {
    if (task === "") {
        alert("Please add some task!");
        return false;
    }

    const taskObject = { // Create an object to store both the task and the date
        task: task,
        date: date
    };

    tasksArray.push(taskObject); // Push the task object to the array
    localStorage.setItem('tasks', JSON.stringify(tasksArray));
    location.reload();
}

function displayTasks() {
    let tasksHTML = "";
    for (let idx = 0; idx < tasksArray.length; idx++) {
        tasksHTML += `<div class="task">
                        <div class="input-controller">
                                <textarea disabled>${tasksArray[idx].task}</textarea> <!-- Access task property -->
                                <div class="date">${tasksArray[idx].date}</div> <!-- Display date -->
                                <div class="edit-controller">
                                    <button class="deleteBtn">Delete</button>
                                    <button class="editBtn">Edit</button>
                                </div>
                        </div>

                        <div class="update-controller">
                            <button class="saveBtn">Save</button>
                            <button class="cancelBtn">Cancel</button>
                        </div>
                    </div>`;
    }
    document.getElementById('todo-list').innerHTML = tasksHTML;
    DeleteEvents();
    EditEvents();
    SaveEvents();
    CancelEvents();
}


function DeleteEvents(){
    let deleteBtns = document.getElementsByClassName('deleteBtn');
    for(let idx = 0; idx < deleteBtns.length; idx++){
        deleteBtns[idx].addEventListener('click', function(){
            tasksArray.splice(idx, 1); //for deleting that particular task from the array we used splice
            //splice is used to add or remove items from an array and it returns the removed items from the array and the original array is changed 
            localStorage.setItem('tasks', JSON.stringify(tasksArray));
            location.reload();
            displayTasks();
        })
    }
}

function EditEvents(){
    const editBtn = document.querySelectorAll(".editBtn");
    const updateController = document.querySelectorAll(".update-controller");
    const inputs = document.querySelectorAll(".input-controller textarea");

    for (let i = 0; i < editBtn.length; i++) {
        editBtn[i].addEventListener("click", function() {
            updateController[i].style.display = "block";
            inputs[i].disabled = false;
        });
    }
}

function SaveEvents(){
    const saveBtn = document.querySelectorAll(".saveBtn");
    const updateController = document.querySelectorAll(".update-controller");
    const inputs = document.querySelectorAll(".input-controller textarea");

    for (let i = 0; i < saveBtn.length; i++) {
        saveBtn[i].addEventListener("click", function() {
            tasksArray[i].task = inputs[i].value; // Update the task property of the task object
            localStorage.setItem('tasks', JSON.stringify(tasksArray));
            location.reload();
            displayTasks();
        });
    }
}

function CancelEvents(){
    const cancelBtn = document.querySelectorAll(".cancelBtn");
    const updateController = document.querySelectorAll(".update-controller");
    const inputs = document.querySelectorAll(".input-controller textarea");

    for (let i = 0; i < cancelBtn.length; i++) {
        cancelBtn[i].addEventListener("click", function() {
            updateController[i].style.display = "none";
            inputs[i].disabled = true;
        });
    }
}


function displayDate(){
   let date = new Date();
   let dateArray = [];

   dateArray.push(date.getDate());
   dateArray.push(date.getMonth() + 1);
   dateArray.push(date.getFullYear());

   let dateStr = dateArray.join('/');
   document.getElementById('date').innerHTML = dateStr;
}

window.onload = function(){
    displayDate();
    displayTasks();
    // localStorage.clear();
} //whenver the page loads, the function will be called and the date will be displayed