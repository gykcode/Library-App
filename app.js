let myLibrary = [];

let counter = 0;
function generateGuid() {
  return counter++;
}

class Book {
  constructor(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
    this.id = generateGuid();
  }

  set toggleStatus(status) {
    this.status = status;
  }
}

function addBookToLibrary() {
  let book = new Book(
    document.querySelector('#book-title').value,
    document.querySelector('#book-author').value,
    document.querySelector('#book-pages').value,
    document.querySelector('#book-status').value
  );
  myLibrary.push(book);
}

function displayBooks(books) {
  let bookIndex = books.length - 1;
  //add new book
  const newBook = document.createElement('div');
  newBook.classList.add('book');
  //book title
  const bookTitle = document.createElement('div');
  bookTitle.classList.add('book-title');
  const titleTextContent = document.createElement('p');
  titleTextContent.textContent = books[bookIndex]['title'];
  bookTitle.appendChild(titleTextContent);
  newBook.appendChild(bookTitle);
  //book author
  const bookAuthor = document.createElement('div');
  bookAuthor.classList.add('book-author');
  const authorTextContent = document.createElement('p');
  authorTextContent.textContent = books[bookIndex]['author'];
  bookAuthor.appendChild(authorTextContent);
  newBook.appendChild(bookAuthor);
  //book pages
  const bookPages = document.createElement('div');
  bookPages.classList.add('book-pages');
  const pagesTextContent = document.createElement('p');
  pagesTextContent.textContent = books[bookIndex]['pages'];
  bookPages.appendChild(pagesTextContent);
  newBook.appendChild(bookPages);
  //book status
  const bookStatusButton = document.createElement('button');
  bookStatusButton.classList.add('book-status');
  bookStatusButton.value = books[bookIndex]['id'];
  bookStatusButton.textContent = books[bookIndex]['status'];
  newBook.appendChild(bookStatusButton);

  if (books[bookIndex]['status'] === 'Read') {
    bookStatusButton.className = 'read btn';
  } else if (books[bookIndex]['status'] === 'Unread') {
    bookStatusButton.className = 'unread btn';
  } else if (books[bookIndex]['status'] === 'Pending') {
    bookStatusButton.className = 'pending btn';
  }

  //button
  const bookDeleteButton = document.createElement('button');
  bookDeleteButton.classList.add('book-button');
  bookDeleteButton.value = books[bookIndex]['id'];
  bookDeleteButton.textContent = 'Delete';
  newBook.appendChild(bookDeleteButton);
  booksContainer.appendChild(newBook);

  bookDeleteButton.addEventListener('click', removeBook);
  bookStatusButton.addEventListener('click', (e) => {
    for (let i = 0; i < myLibrary.length; i++) {
      let getBookStatus = myLibrary[i].status;
      if (myLibrary[i]['id'] == e.target.value) {
        if (getBookStatus === 'Read') {
          bookStatusButton.textContent = 'Unread';
          myLibrary[i].toggleStatus = 'Unread';
          bookStatusButton.className = 'unread btn';
        } else if (getBookStatus === 'Unread') {
          bookStatusButton.textContent = 'Pending';
          myLibrary[i].toggleStatus = 'Pending';
          bookStatusButton.className = 'pending btn';
        } else if (getBookStatus === 'Pending') {
          bookStatusButton.textContent = 'Read';
          myLibrary[i].toggleStatus = 'Read';
          bookStatusButton.className = 'read btn';
        }
      }
    }
    console.log(myLibrary);
  });
}

function removeBook(e) {
  e.target.parentElement.remove();
  let index = myLibrary.findIndex(function (obj) {
    return obj.id == e.target.value;
  });
  if (index !== -1) myLibrary.splice(index, 1);
  console.log(myLibrary);
}

function resetForm() {
  form.reset();
}

const toggleButtonTheme = document.querySelector('#theme');
const booksContainer = document.querySelector('.books');
const book = document.querySelector('.book');
const addBook = document.querySelector('#add-book');
const deleteBook = document.querySelector('.book-button');
const btnOpenModal = document.querySelector('#btnNewBook');
const discardBookCloseModal = document.querySelector('#discardBtn');
const modal = document.querySelector('#myModal');
const form = document.querySelector('#form');
const libraryBooks = document.querySelector('#library-books');

toggleButtonTheme.addEventListener('click', () => {
  document.body.classList.toggle('dark');

  if (document.body.classList.contains('dark')) {
    localStorage.setItem('dark-mode', 'true');
  } else {
    localStorage.setItem('dark-mode', 'false');
  }
});

if (localStorage.getItem('dark-mode') === 'true') {
  document.body.classList.add('dark');
} else {
  document.body.classList.remove('dark');
}

addBook.addEventListener('click', (e) => {
  e.preventDefault();
  addBookToLibrary();
  displayBooks(myLibrary);
  modal.style.display = 'none';
  resetForm();
});

btnOpenModal.addEventListener('click', () => {
  modal.style.display = 'block';
});

discardBookCloseModal.addEventListener('click', (e) => {
  e.preventDefault();
  modal.style.display = 'none';
});

window.onclick = function (e) {
  if (e.target == modal) {
    modal.style.display = 'none';
  }
};