const books = JSON.parse(localStorage.getItem("books")) || [];

function getIsbnFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return (params.get("isbn") || "").trim();
}

document.addEventListener("DOMContentLoaded", () => {
  const isbn = getIsbnFromUrl();
  const msg = document.getElementById("msg");
  const details = document.getElementById("details");

  if (!isbn) {
    msg.textContent = "No ISBN provided. Use ?isbn=XXXX in the URL.";
    return;
  }

  const book = books.find(b => b.isbn === isbn);
  if (!book) {
    msg.textContent = `Book not found for ISBN: ${isbn}`;
    return;
  }

  document.getElementById("dTitle").textContent = book.title || "-";
  document.getElementById("dAuthor").textContent = book.author || "-";
  document.getElementById("dIsbn").textContent = book.isbn || "-";
  document.getElementById("dCategory").textContent = book.category || "-";
  document.getElementById("dStatus").textContent = (book.isIssued === true) ? "Not Available" : "Available";

  msg.textContent = "";
  details.style.display = "block";
});
