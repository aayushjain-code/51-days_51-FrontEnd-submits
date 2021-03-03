// //////////////////////////////////////////////////Elements selecting distributed all over code
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const input = document.getElementById("item");
const list = document.getElementById("list");

/////////////////////////////////////////////////////////ClassNames
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

//////////////////////////////////////////////////////////VARIABLES
let LIST = [], //to store LIST = [{} , {} ,{} , ......]
  id = 0;
//LIST[0]->{name:"abc",id:0,done:false,trash:false}....

////////////////////////////////////////////////// get item from localStorage
let data = localStorage.getItem("TODO");

//////////////////////////////////////////////////// check if data is not empty
if (data) {
  LIST = JSON.parse(data); //getting our array data
  id = LIST.length; //set the id to the last one in the list
  loadList(LIST); // load the list to user interface
} else {
  //if data isn't empty
  List = [];
  id = 0;
}

//////////////////////////////////////////////////////load items to the user interface
function loadList(array) {
  array.forEach(function (item) { //loop to array 
    addTodo(item.name, item.id, item.done, item.trash); 
  });
}

///////////////////////////////////////////////////// To clear the local storage --round button top right
clear.addEventListener("click", function () {
  localStorage.clear();
  location.reload();
});

/////////////////////////////////////////////////////////////////////////// Show today Date
const options = { weekday: "long", month: "short", day: "numeric" };
const today = new Date();
dateElement.innerHTML = today.toLocaleDateString("en-US", options);




//////////////////////////////////////////////////////////////////////// Add to-do function
function addTodo(toDo, id, done, trash) {
  if (trash) {
    return;
  }

  const DONE = done ? CHECK : UNCHECK;
  const LINE = done ? LINE_THROUGH : "";

  const item = `     
   <li class = "item">
                 <i class="fa ${DONE} co" job ="complete" id="${id}"></i>
                 <p class = "text ${LINE}">${toDo}</p>
                 <i class="fa fa-trash-o de" job ="delete" id="${id}"></i>
                 </li>
   `;

  const position = "beforeend"; //position => beforebegin-afterbegin-beforeend-afterend

  list.insertAdjacentHTML(position, item); //elemen.insertAdjacentHTML(position , text); text=>something which should be placed
}

/////////////////////////////////////////////////////////////////////////add an item on click on plus
function clickAdd() {
  const toDo = input.value;

  if (toDo) {
    addTodo(toDo, id, false, false);

    LIST.push({
      name: toDo,
      id: id,
      done: false,
      trash: false,
    });
    // add item to localStorage ( this code must be added where the LIST array is updated)
    localStorage.setItem("TODO", JSON.stringify(LIST));
    id++;
  }
  input.value = "";
}

//////////////////////////////////////////////////////////////////// Add an item to the list user the enter key
document.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    const toDo = input.value;

    if (toDo) {
      addTodo(toDo, id, false, false);

      LIST.push({
        name: toDo,
        id: id,
        done: false,
        trash: false,
      });
      // add item to localStorage ( this code must be added where the LIST array is updated)
      localStorage.setItem("TODO", JSON.stringify(LIST));
      id++;
    }
    input.value = "";
  }
});

//addTodo("drink",1,true,false);

///////////////////////////////////////////////////////////////////////////Complete To do
function completeTodo(element) {
  element.classList.toggle(CHECK);
  element.classList.toggle(UNCHECK);
  element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

  LIST[element.id].done = LIST[element.id].done ? false : true;
}

///////////////////////////////////////////////////////////////////////////////// Remove to do
function removeTodo(element) {
  element.parentNode.parentNode.removeChild(element.parentNode);//removing from UI

  LIST[element.id].trash = true;//updating local array
}



/////////////////////////////////////////////////////////////////////////// Target the items created dynamically
/////////////////////////////////////////////////////////////////////////// Implementation of completeTodo & removeTodo
list.addEventListener("click", function (event) {
  const element = event.target; //return the clicked element inside the list
  const elementJob = element.attributes.job.value; //complete or delete

  if (elementJob == "complete") {
    completeTodo(element);
  } else if (elementJob == "delete") {
    removeTodo(element);
  }

  // add item to localStorage ( this code must be added where the LIST array is updated)
  localStorage.setItem("TODO", JSON.stringify(LIST));
});
