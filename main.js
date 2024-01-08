const dialog = document.querySelector("dialog")
const showBookCatalog = document.querySelector(".dialog + button")
const closeButton = document.querySelector("dialog button")
const checked = document.getElementById("toggle")
const closeButtonClose = document.querySelector(".closebutton-1")
const nav = document.getElementById("nav")
const submitButton = document.querySelector(".button-submit")
const container = document.querySelector(".modal-container")
const header = document.getElementById("bars");
const closebuttonbtn = document.querySelector(".closebutton-2")
const checkbox = document.getElementById("check")

showBookCatalog.addEventListener("click", () => {
    dialog.showModal();
});

closeButton.addEventListener("click", () => {
    dialog.close();
})

header.addEventListener('click', () => {
  nav.classList.toggle('show');
});

const myLibrary = [];

function Book(tittle, author, pages, read = false) {

    this.tittle = tittle;
    this.author = author;
    this.pages = pages;
    this.read = read;
}


function addBookToLibrary(tittle, author, pages, read) {
    const newBook = new Book ( tittle, author, pages, read )
        myLibrary.push(newBook);
        displayBook(); 
}

function displayBook(){
    const display = document.getElementById("book")

    display.innerHTML = " ";

   myLibrary.forEach ((book, index) => {
     const card = document.createElement("div");
     card.classList.add("inner-items");
     card.innerHTML = `Tittle: ${book.tittle},<br>
     Author: ${book.author},<br>
     Pages: ${book.pages},
     <button onclick="toggleReadStatus(${index})" ${book.read ? 'style="background-color: blue"' : 'style="background-color: red"'}>
       ${book.read ? "STATUS:  READ" : "STATUS:  NOT READ"}
     </button>
     <button onclick="removeBook(${index})">Remove</button>`

   display.appendChild(card);

    })

}

// Function to remove a book from page
function removeBook(index) {
    myLibrary.splice(index, 1);
    displayBook();
  }
  
  // Function to toggle read status
  function toggleReadStatus(index) {
    myLibrary[index].read = !myLibrary[index].read;
    displayBook();
  }


    const addbook = document.getElementById("add-book") 
    addbook.addEventListener("submit", function(event) {
        event.preventDefault();

        const tittle = document.getElementById("tittle").value;
        const author = document.getElementById("author").value;
        const pages = document.getElementById("pages").value;
        const read = document.getElementById("read").checked;
        addBookToLibrary(tittle, author, pages, read);

        addbook.reset();

    })

displayBook();
