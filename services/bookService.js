// --- Fake database using localStorage ---
let books = JSON.parse(localStorage.getItem("books")) || [];

function saveBooks() {
    localStorage.setItem("books", JSON.stringify(books));
}

// --- API function: add a new book ---
function addBook(book) {
    // LMS-39: validation for duplicate ISBN
    if (books.some(b => b.isbn === book.isbn)) {
        alert("Duplicate ISBN! A book with this ISBN already exists.");
        return;
    }

    books.push(book);
    saveBooks();
    alert("Book added successfully!");
}

// --- Connect HTML form to this service ---
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("addBookForm");
    if (!form) return;

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const book = {
            title: document.getElementById("title").value.trim(),
            author: document.getElementById("author").value.trim(),
            isbn: document.getElementById("isbn").value.trim(),
            category: document.getElementById("category").value.trim(),
            status: "available",      // LMS-17
            issuedTo: null             // LMS-17
        };


        addBook(book);
    });
});
// --- LMS-17: Issue book to member ---
function issueBook(isbn, memberName) {
    const book = books.find(b => b.isbn === isbn);

    if (!book) {
        alert("Book not found.");
        return;
    }

    if (book.status === "issued") {
        alert("This book is already issued.");
        return;
    }

    book.status = "issued";
    book.issuedTo = memberName;

    saveBooks();
    alert(`Book issued successfully to ${memberName}`);
}
