let books = JSON.parse(localStorage.getItem("books")) || [];

function displayBooks() {
  const tableBody = document.getElementById("bookTableBody");
  tableBody.innerHTML = "";

  books.forEach(book => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td>${book.isIssued ? "Not Available" : "Available"}</td>
    `;

    tableBody.appendChild(row);
  });
}

document.addEventListener("DOMContentLoaded", displayBooks);
