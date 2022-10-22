if (localStorage.length != 0) {
  displaybook();
}


//declare a function name as book
function Book(name, author, type) {
  this.name = name;
  this.author = author;
  this.type = type;
}
//Declare a class named as Display
class Display {
  validate(book) {
    if (book.name.length < 2 || book.author.length < 2) {
      return false;
    } else {
      return true;
    }
  }
  add(book) {
    let library = localStorage.getItem('tablebody');
    if(library == null){
        librarybooks = [];
    }
    else{
        librarybooks = JSON.parse(library);
    }
    let tablebody = document.getElementById("tablebody");
    let ui = '';
    librarybooks.forEach(function(element,index){
        ui += `
            <tr  class = "tablerow">
            <th scope="row">${index + 1}</th>
            <td >${element.name}</td>
            <td>${element.author}</td>
            <td>${element.type}</td>
            <td><button  id = "${index}" onclick = "deletelem(this.id)">Delete</button></td>
            </tr>
        `;
    });
    if(library != 0){
    tablebody.innerHTML = ui;
    }
  }
  clear() {
    let libraryform = document.getElementById("libraryform");
    libraryform.reset();
  }
  show(type, message) {
    let shownote = document.getElementById("shownote");
    shownote.innerHTML = `
        <div class="alert alert-${type} alert-dismissible fade show" role="alert">
        <strong>Message :-</strong>${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
        `;
    setTimeout(() => {
      shownote.innerHTML = ``;
    }, 2000);
  }
}


//Main function
let addbook = document.getElementById("addbook");
let libraryform = document.getElementById("libraryform");
libraryform.addEventListener("submit", function (e) {
  e.preventDefault();
  let bookname = document.getElementById("getname").value;
  let authorname = document.getElementById("authorname").value;
  let type;
  let pscychology = document.getElementById("pscychology");
  let programming = document.getElementById("programming");
  let investor = document.getElementById("investor");
  if (pscychology.checked) {
    type = pscychology.value;
  } else if (programming.checked) {
    type = programming.value;
  } else {
    type = investor.value;
  }
  let book = new Book(bookname, authorname, type);
  let library = localStorage.getItem('tablebody');
  if(library == null){
      librarybooks = [];
  }
  else{
      librarybooks = JSON.parse(library);
  }
  let mybook = {
    nam: bookname,
    auth: authorname,
    typ : type
  }
  let display = new Display();
  if (display.validate(book)) {
    librarybooks.push(book);
    localStorage.setItem('tablebody',JSON.stringify(librarybooks));
    display.add(book);
    display.clear();
    display.show("success", "Your book has been added successfully");
  } else {
    display.show("danger", "Please enter the valid details of book");
  }
});




function deletelem(index){
  let library = localStorage.getItem('tablebody');
  if(library == null){
      librarybooks = [];
  }
  else{
      librarybooks = JSON.parse(library);
  }
  librarybooks.splice(index, 1);
  localStorage.setItem('tablebody',JSON.stringify(librarybooks));
  displaybook();
}

function displaybook(){
  let library = localStorage.getItem('tablebody');
  if(library == null){
      librarybooks = [];
  }
  else{
      librarybooks = JSON.parse(library);
  }
  let tablebody = document.getElementById("tablebody");
  let ui = '';
  librarybooks.forEach(function(element,index){
      ui += `
      <tr  class = "tablerow">
      <th scope="row" >${index + 1}</th>
      <td >${element.name}</td>
      <td>${element.author}</td>
      <td>${element.type}</td>
      <td><button  id = "${index}" onclick = "deletelem(this.id)">Delete</button></td>
      </tr>
      `;
  });
  if(library != 0){
  tablebody.innerHTML = ui;
  }
}
let search = document.getElementById("search");
search.addEventListener("input", function (e) {
  let inputval = search.value;
  let Book_Name = document.getElementsByClassName("tablerow");
  Array.from(Book_Name).forEach(function (element) {
    let cardtext = (element.getElementsByTagName('tr')[0]).innerText;
    if (cardtext.includes(inputval)) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  });
});