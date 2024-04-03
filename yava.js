const myLibrary = [];

const dialog = document.querySelector("#new-book-dialog");
const addBook = document.querySelector("#add-book");
const submitButton = document.querySelector("#submit-book");
const closeButton = document.querySelector("#close-button");
const bookDisplay = document.querySelector(".book-display");
const titleInput = document.querySelector('#title');
const authorInput = document.querySelector('#author');
const pagesInput = document.querySelector('#pages');
const readCheckbox = document.querySelector('#read');

class Book {
  constructor(title, author, pageNum, readOrNah) {
    this.title = title;
    this.author = author;
    this.pageNum = pageNum;
    this.readOrNah = readOrNah;
  }

  info() {
    console.log(`${this.title} by ${this.author}, ${this.pageNum} pages, ${this.readOrNah}`);
  }

  toggleRead() {
    this.readOrNah = !this.readOrNah;
  }
}

function addBookToLibrary(title, author, pageNum, readOrNah) {
  const book = new Book(title, author, pageNum, readOrNah);
  myLibrary.push(book);
}

function displayBooks(bookObject, index) {
  const bookCard = document.createElement("div");
  const bookTitle = document.createElement("p");
  const authorName = document.createElement("p");
  const pageAmount = document.createElement("p");
  const read = document.createElement("button");
  const removeButton = document.createElement("button");

  bookCard.classList.add("book-card");
  bookCard.setAttribute("data-index", index);
  read.classList.add("toggle-read");
  removeButton.textContent = "Remove";
  removeButton.classList.add("remove-book");
  removeButton.addEventListener("click", () => removeBook(index));
  bookTitle.textContent = bookObject.title;
  authorName.textContent = bookObject.author;
  pageAmount.textContent = bookObject.pageNum;
  read.textContent = bookObject.readOrNah ? "Already read" : "Not read";
  read.addEventListener("click", () => {
    bookObject.toggleRead();
    loopArray();
  });

  bookCard.appendChild(bookTitle);
  bookCard.appendChild(authorName);
  bookCard.appendChild(pageAmount);
  bookCard.appendChild(read);
  bookCard.appendChild(removeButton);
  bookDisplay.appendChild(bookCard);
}

function removeBook(index) {
  myLibrary.splice(index, 1);
  loopArray();
}

function loopArray() {
  bookDisplay.textContent = "";
  myLibrary.forEach((book, index) => {
    displayBooks(book, index);
  });
}

addBook.addEventListener("click", () => {
  dialog.showModal();
});

submitButton.addEventListener("click", (event) => {
  event.preventDefault();
  const titleValue = titleInput.value;
  const authorValue = authorInput.value;
  const pageValue = pagesInput.value;
  const readValue = readCheckbox.checked;
  dialog.close();
  addBookToLibrary(titleValue, authorValue, pageValue, readValue);
  loopArray();
});

closeButton.addEventListener("click", () => {
  dialog.close();
});
