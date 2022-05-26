// book constructor
function Book(title, author, isbn){
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI constructor
function UI(){}

// UI PROTOTYPES
UI.prototype.addBookToList = function(book){
  const list = document.getElementById("book-list");
  // create table-row Element
  const row = document.createElement("tr");
  // insert columns
  row.innerHTML = `<td>${book.title}</td>
<td>${book.author}</td>
<td>${book.isbn}</td>
<td><a href="#" class="delete">X</a></td>
`;
  list.appendChild(row);
}

// show alert
UI.prototype.showAlert = function(message, className){
  // create div
  const div = document.createElement("div");
  // add classes
  div.className = `alert ${className}`;
  // add Text
div.appendChild(document.createTextNode(message));
  // get parent
  const container = document.querySelector(".container");
  // get form
  const form = document.querySelector("#book-form");
  // insert alert message before form
  container.insertBefore(div, form);
  // time out after 3s
  setTimeout(function(){
    document.querySelector(".alert").remove();
  }, 1500);
}

// clear fields
UI.prototype.clearFields = function(){
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("isbn").value = "";
}

// delete Book
UI.prototype.deleteBook = function(target){
  if(target.className === "delete"){ target.parentElement.parentElement.remove();
  }
}

// event listener for adding book
document.getElementById("book-form").addEventListener("submit", function(e){
  // get form values
  const title = document.getElementById("title").value,
    author = document.getElementById("author").value,
    isbn = document.getElementById("isbn").value;
  // instantiate book object
  const book = new Book(title,author,isbn);

  // instantiate ui Object
  const ui = new UI();

  // validate
  if(title === "" || author === "" || isbn === ""){
    // error alert
    ui.showAlert("Please fill in all fields", "error");
  }
  else{
    // add book to list
    ui.addBookToList(book);
    // show success
    ui.showAlert("Book successfully added", "success");
    // clear input fields
    ui.clearFields(); 
  }

  e.preventDefault();
});

// event listener for deleting book
document.getElementById("book-list").addEventListener("click", function(e){
  const ui = new UI();
  ui.deleteBook(e.target);
  ui.showAlert("Book was removed", "success");
  e.preventDefault();
});
