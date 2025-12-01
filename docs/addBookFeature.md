# LMS-2: Add a New Book – Feature Documentation

## Overview
This feature allows librarians to add new books into the Library Management System.  
It includes UI, backend logic (JavaScript), validation, and storage using browser localStorage.

---

## ✔ LMS-33 — UI: Add Book Form
The page `pages/addBook.html` contains a form with fields:
- Title
- Author
- ISBN
- Category

The form calls the JavaScript service `bookService.js` to process inputs.

---

## ✔ LMS-34 — Backend/API Logic
The file `services/bookService.js` implements the Add Book logic, including:
- Reading stored books
- Adding a new book object
- Saving updated list back to localStorage

Function:
```javascript
function addBook(book) { ... }
