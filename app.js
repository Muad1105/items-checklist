// ****** SELECT ITEMS **********

const grocery = document.getElementById('grocery');
const submitBtn = document.querySelector('.submit-btn');
const alertPopup = document.querySelector('.alert');
const container = document.querySelector('.grocery-container');
const groceryList = document.querySelector('.grocery-list');

const itemTitle = document.querySelector('.title');
const editBtn = document.querySelector('.edit-btn');
const deleteBtn = document.querySelector('.delete-btn');
const clearBtn = document.querySelector('.clear-btn');

// edit option
let editItem = false;
let itemArray = [];
let previousClicked;

let itemNum = 0,
  value,
  newArticle,
  newElement;

function arrangeItems(itemNum, val) {
  newArticle = document.createElement('article');
  newArticle.classList.add('grocery-item');
  var newElement = `<div><p class='inline'>${itemNum}.</p>
  <p class="title">${val}</p></div>
  <div class="button-container">
  <button type="button" class="edit-btn">
  <i class="far fa-edit"></i>
  </button>
  <button type="button" class="delete-btn">
  <i class="far fa-trash-alt"></i>
  </button>
  </div>`;
  // eventItem = true;
  // itemArray.push(value);
  newArticle.innerHTML = newElement;
}

window.addEventListener('load', function () {
  if (localStorage) {
    for (i = 0; i < localStorage.length; i++) {
      localStorage.getItem(i);
      arrangeItems();
      console.log(i, arrangeItems());
    }
  }
});

// ****** EVENT LISTENERS **********
submitBtn.addEventListener('click', function (e) {
  e.preventDefault();
  value = grocery.value;
  itemNum++;
  window.localStorage.setItem(JSON.stringify(itemNum), JSON.stringify(value));
  console.log(localStorage);

  console.log(localStorage.getItem('0'));

  if (value && !editItem) {
    arrangeItems(itemNum, value);
    // let str = newArticle.outerHTML;
    groceryList.appendChild(newArticle);
    // groceryList.innerHTML = str;
    container.classList.add('show-container');

    alertMessage('item added', 'success');
  }
  if (!value) {
    alertMessage('please enter value', 'danger');
  }
  if (value && editItem) {
    previousClicked.innerText = value;
    editItem = false;
    alertMessage('item changed', 'success');
  }
  grocery.value = '';
});
container.addEventListener('click', function (e) {
  if (e.target.classList.contains('fa-edit')) {
    grocery.value =
      e.target.parentElement.parentElement.parentElement.children[0].children[1].innerHTML;
    previousClicked =
      e.target.parentElement.parentElement.parentElement.children[0]
        .children[1];
    editItem = true;
  }

  // deleting iput elements on click
  if (e.target.classList.contains('fa-trash-alt')) {
    // getting the item and removing it

    let item = e.target.parentElement.parentElement.parentElement;

    // getting which item is being deleted
    let num = parseInt(item.firstChild.firstChild.innerHTML);
    item.remove();
    //alertmessage - deletion
    alertMessage('item removed', 'danger');

    console.log(num);

    console.log(groceryList.childNodes);
    console.log(window.localStorage.length);
    // entry item number
    let len = groceryList.childNodes.length;
    console.log(len);
    for (let i = 0; i <= len; i++) {
      console.log(num, i);
      if (i == num) window.localStorage.removeItem(`${i}`);
      len--;
      let newStored = window.localStorage;
      console.log(newStored);
      console.log(newStored.key(1));
      window.localStorage.clear();

      for (let i = 0; i < newStored.length; i++) {
        arrangeItems();
      }
      console.log(newStored);
      console.log(JSON.parse(newStored.key(0)));
      console.log(window.localStorage);
      arrangeItems([]);
    }

    //check for other ways

    if (!groceryList.children[0]) container.classList.remove('show-container');
  }
  if (e.target.classList.contains('clear-btn')) {
    groceryList.innerHTML = '';
    container.classList.remove('show-container');

    alertMessage('all items emptied', 'danger');
    window.localStorage.clear();
  }
});

function alertMessage(text, action) {
  alertPopup.innerHTML = text;
  alertPopup.classList.add(`alert-${action}`);

  setTimeout(function () {
    alertPopup.innerHTML = '';
    alertPopup.classList.remove(`alert-${action}`);
  }, 1000);
}

{
  /* <article class="grocery-item">
  <p class="title"></p>
  <div class="button-container">
    <button type="button" class="edit-btn">
      <i class="far fa-edit"></i>
    </button>
    <button type="button" class="delete-btn">
      <i class="far fa-trash-alt"></i>
    </button>
  </div>
</article>; */
}
