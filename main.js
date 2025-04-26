// DOM Elements
const dialog = document.getElementById("book-dialog");
const addButton = document.getElementById("add-button");
const closeButton = document.querySelector(".close-button");
const barsButton = document.getElementById("bars");
const nav = document.getElementById("nav");
const bookForm = document.getElementById("add-book-form");
const bookCollection = document.getElementById("book-collection");

// Stats Elements
const totalBooksEl = document.getElementById("total-books");
const booksReadEl = document.getElementById("books-read");
const pagesReadEl = document.getElementById("pages-read");

// Set current year in footer
document.getElementById("current-year").textContent = new Date().getFullYear();

// Event Listeners
addButton.addEventListener("click", () => {
    dialog.showModal();
});

closeButton.addEventListener("click", () => {
    dialog.close();
});

barsButton.addEventListener("click", () => {
    nav.classList.toggle("show");
});

// Book Library
let myLibrary = [];

// Load from local storage if available
function loadLibrary() {
    const savedLibrary = localStorage.getItem('myLibrary');
    if (savedLibrary) {
        myLibrary = JSON.parse(savedLibrary);
        displayBooks();
        updateStats();
    }
}

// Save to local storage
function saveLibrary() {
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
}

// Book Constructor
function Book(title, author, pages, read = false) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = Date.now().toString(); // Unique ID for each book
}

// Add Book To Library
function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    saveLibrary();
    displayBooks();
    updateStats();
}

// Remove Book
function removeBook(id) {
    myLibrary = myLibrary.filter(book => book.id !== id);
    saveLibrary();
    displayBooks();
    updateStats();
}

// Toggle Read Status
function toggleReadStatus(id) {
    const book = myLibrary.find(book => book.id === id);
    if (book) {
        book.read = !book.read;
        saveLibrary();
        displayBooks();
        updateStats();
    }
}

// Update Stats
function updateStats() {
    totalBooksEl.textContent = myLibrary.length;
    
    const booksRead = myLibrary.filter(book => book.read).length;
    booksReadEl.textContent = booksRead;
    
    const pagesRead = myLibrary.reduce((total, book) => {
        return book.read ? total + parseInt(book.pages) : total;
    }, 0);
    pagesReadEl.textContent = pagesRead;
}

// Display Books
function displayBooks() {
    bookCollection.innerHTML = "";
    
    if (myLibrary.length === 0) {
        const emptyState = document.createElement("div");
        emptyState.className = "empty-state";
        emptyState.innerHTML = `
            <i class="fas fa-book-open" style="font-size: 4rem; color: #ddd; margin-bottom: 1rem;"></i>
            <h3>Your bookshelf is empty</h3>
            <p>Add your first book by clicking the + button</p>
        `;
        bookCollection.appendChild(emptyState);
        return;
    }

    myLibrary.forEach(book => {
        const card = document.createElement("div");
        card.className = "book-card";
        
        // Generate a random pastel background color
        const hue = Math.floor(Math.random() * 360);
        const pastelColor = `hsl(${hue}, 70%, 85%)`;
        
        card.innerHTML = `
            <div class="book-header" style="background-color: ${pastelColor}">
                <h3 class="book-title">${book.title}</h3>
                <p class="book-author">by ${book.author}</p>
            </div>
            <div class="book-content">
                <p class="book-pages"><i class="fas fa-file-alt"></i> ${book.pages} pages</p>
                <div class="book-actions">
                    <button onclick="toggleReadStatus('${book.id}')" 
                        class="status-button ${book.read ? 'status-read' : 'status-not-read'}">
                        <i class="fas ${book.read ? 'fa-check-circle' : 'fa-times-circle'}"></i>
                        ${book.read ? "Read" : "Not Read"}
                    </button>
                    <button onclick="removeBook('${book.id}')" class="remove-button">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
        
        bookCollection.appendChild(card);
    });
}

// Form Submission
bookForm.addEventListener("submit", function(event) {
    event.preventDefault();
    
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const read = document.getElementById("read").checked;
    
    addBookToLibrary(title, author, pages, read);
    
    dialog.close();
    bookForm.reset();
});

// Initialize the app
loadLibrary();
displayBooks();
updateStats();