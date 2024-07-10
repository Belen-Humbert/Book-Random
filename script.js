let books = [];
let currentUser = null;

function login() {
    const usernameInput = document.getElementById('username');
    const username = usernameInput.value.trim();
    if (username) {
        currentUser = username;
        document.getElementById('loginForm').style.display = 'none';
        document.getElementById('bookForm').style.display = 'block';
        loadBooks();
    }
}

function addBook() {
    const bookInput = document.getElementById('bookInput');
    const bookName = bookInput.value.trim();
    if (bookName) {
        books.push(bookName);
        updateBookList();
        bookInput.value = '';
    }
}

function updateBookList() {
    const bookList = document.getElementById('bookList');
    bookList.innerHTML = '';
    books.forEach(book => {
        const li = document.createElement('li');
        li.textContent = book;
        bookList.appendChild(li);
    });
}

function chooseRandomBook() {
    if (books.length === 0) {
        alert('No hay libros en la lista.');
        return;
    }

    const countdownElement = document.createElement('div');
    countdownElement.classList.add('countdown');
    document.querySelector('.container').appendChild(countdownElement);

    let countdown = 3;
    countdownElement.textContent = countdown;

    const countdownInterval = setInterval(() => {
        countdown -= 1;
        if (countdown > 0) {
            countdownElement.textContent = countdown;
        } else {
            clearInterval(countdownInterval);
            countdownElement.remove();
            showRandomBook();
        }
    }, 1000);
}

function showRandomBook() {
    const randomIndex = Math.floor(Math.random() * books.length);
    const randomBook = books[randomIndex];
    document.getElementById('randomBook').textContent = `Libro seleccionado: ${randomBook}`;
}

function saveBooks() {
    if (currentUser) {
        localStorage.setItem(`books_${currentUser}`, JSON.stringify(books));
        alert('Lista de libros guardada.');
    }
}

function loadBooks() {
    if (currentUser) {
        const savedBooks = localStorage.getItem(`books_${currentUser}`);
        if (savedBooks) {
            books = JSON.parse(savedBooks);
            updateBookList();
        }
    }
}

// Actualiza la lista de libros al cargar la página (en caso de que haya libros preexistentes)
document.addEventListener('DOMContentLoaded', () => {
    const lastUser = localStorage.getItem('lastUser');
    if (lastUser) {
        currentUser = lastUser;
        document.getElementById('loginForm').style.display = 'none';
        document.getElementById('bookForm').style.display = 'block';
        loadBooks();
    }
});
