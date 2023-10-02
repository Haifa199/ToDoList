const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo"); 

 todoButton.addEventListener("click", addTodo);
 todoList.addEventListener("click" , deletCompleteTodo);
 filterOption.addEventListener("click", filterTodo);
 document.addEventListener("DOMContentLoaded", getTodos);


 function addTodo(event){
     event.preventDefault();
     const todoDive = document.createElement("div");
     todoDive.classList.add("todo");  

     const newTodo = document.createElement("li");
     newTodo.innerText = todoInput.value;

     saveLocalTodo(todoInput.value);

    newTodo.classList.add("todo-item");
    todoDive.appendChild(newTodo);
    todoInput.value="";


    const completedButton = document.createElement("button");
    completedButton.innerHTML = "<i class='fas fa-check'></i>";
    completedButton.classList.add("complete-btn");
    todoDive.appendChild(completedButton);

    const trashButton = document.createElement("button");
    trashButton.innerHTML = "<i class='fas fa-trash'></i>";
    trashButton.classList.add("trash-btn");
    todoDive.appendChild(trashButton);


    todoList.appendChild(todoDive);
     
 }


function deletCompleteTodo(event){
   const item = event.target;
   console.log(item.parentElement)

   if (item.classList[0] === "trash-btn"){
       const todo = item.parentElement;
       removeLocalTodo(todo); 
       todo.remove();
   }
   if (item.classList[0] === "complete-btn") {
       const todo = item.parentElement;
       todo.classList.toggle("completed");
   }

}



function filterTodo (event){
    
    const todos = todoList.childNodes;
    todos.forEach(function (todo){
    switch(event.target.value){
        case "all":
            todo.style.display = "flex";
            break;
        case "complete":
            if(todo.classList.contains("completed")){
                todo.style.display = "flex";
            } else {
                todo.style.display = "none";
            }
            break;
        case "uncompleted":
            if(todo.classList.contains("completed")){
                todo.style.display = "none";
            } else {
                todo.style.display = "flex";
            }
            
    }

    })

}





function saveLocalTodo(todo){
    let todos;
    if (localStorage.getItem("todos") === null){
        todos = [];
    } else{
        todos= JSON.parse(localStorage.getItem("todos"));
    }

    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function removeLocalTodo (todo){
    let todos;
    if (localStorage.getItem("todos") === null){
        todos = [];
    } else{
        todos= JSON.parse(localStorage.getItem("todos"));
    };
     
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));

}


function getTodos (){
    let todos;
    if (localStorage.getItem("todos") === null){
        todos = [];
    } else{
        todos= JSON.parse(localStorage.getItem("todos"));
    };
    todos.forEach(function(todo){
        const todoDive = document.createElement("div");
        todoDive.classList.add("todo");  
   
        const newTodo = document.createElement("li");
        newTodo.innerText = todo;


        newTodo.classList.add("todo-item");
        todoDive.appendChild(newTodo);
    


    const completedButton = document.createElement("button");
    completedButton.innerHTML = "<i class='fas fa-check'></i>";
    completedButton.classList.add("complete-btn");
    todoDive.appendChild(completedButton);

    const trashButton = document.createElement("button");
    trashButton.innerHTML = "<i class='fas fa-trash'></i>";
    trashButton.classList.add("trash-btn");
    todoDive.appendChild(trashButton);


    todoList.appendChild(todoDive);
      

    })


}