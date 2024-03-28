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
const toggleButton = document.querySelector(".toggle-read");

function Book(title, author, pageNum, readOrNah) {
  this.title = title;
  this.author = author;
  this.pageNum = pageNum;
  this.readOrNah = readOrNah;
  this.info = function() {
    console.log(title + " by " + author + ", " + pageNum + " pages, " + readOrNah);
  };
}

function addBookToLibrary(title, author, pageNum, readOrNah) {
    const book = new Book(title, author, pageNum, readOrNah);
    myLibrary.push(book);
}

function readYet(readOrNah) {
    if (readOrNah) {
        return "Already read";
    } else {
        return "Not read";
    }
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
    read.textContent = readYet(bookObject.readOrNah);
    read.addEventListener("click", () => bookObject.changeRead(index));

    bookCard.appendChild(bookTitle);
    bookCard.appendChild(authorName);
    bookCard.appendChild(pageAmount);
    bookCard.appendChild(read);
    bookCard.appendChild(removeButton);
    bookDisplay.appendChild(bookCard);
}

function removeBook(index) {
    myLibrary.splice(index, 1); /* index to remove, number of elements to remove */
    loopArray();
}

function loopArray() {
    const libraryLength = myLibrary.length;
    bookDisplay.textContent = ""; /* Set to blank so we can display cards via looping other wise it duplicates */
    for (let i = 0; i < libraryLength; i++) {
        const bookObject = myLibrary[i];
        displayBooks(bookObject, i);
    }
}

Book.prototype.changeRead = function(index) {
    myLibrary[index].readOrNah = !myLibrary[index].readOrNah;
    loopArray();
};

addBook.addEventListener("click", (event) => {
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
