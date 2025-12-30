let books = JSON.parse(localStorage.getItem("books")) || [];
let borrowRecords = JSON.parse(localStorage.getItem("borrowRecords")) || [];

function saveBooks() {
  localStorage.setItem("books", JSON.stringify(books));
}
function saveBorrowRecords() {
  localStorage.setItem("borrowRecords", JSON.stringify(borrowRecords));
}

document.addEventListener("DOMContentLoaded", () => {
  const msg = document.getElementById("msg");

  document.getElementById("returnBtn").addEventListener("click", () => {
    const memberId = document.getElementById("memberId").value.trim();
    const isbn = document.getElementById("isbn").value.trim();

    msg.textContent = "";

    if (!memberId || !isbn) {
      alert("Please enter Member ID and ISBN.");
      return;
    }

    // Find an active borrow record (not returned yet)
    const recordIndex = borrowRecords.findIndex(r =>
      r.memberId === memberId && r.isbn === isbn && !r.returnedAt
    );

    if (recordIndex === -1) {
      msg.textContent = "No active borrowing record found for this member and book.";
      return;
    }

    // Mark record returned
    borrowRecords[recordIndex].returnedAt = new Date().toISOString();

    // Mark book available
    const book = books.find(b => b.isbn === isbn);
    if (book) book.isIssued = false;

    saveBorrowRecords();
    saveBooks();

    msg.textContent = "Book returned successfully ✅";
  });
});
