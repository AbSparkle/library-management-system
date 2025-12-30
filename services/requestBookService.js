let books = JSON.parse(localStorage.getItem("books")) || [];
let members = JSON.parse(localStorage.getItem("members")) || [];
let requests = JSON.parse(localStorage.getItem("requests")) || [];

function saveRequests() {
  localStorage.setItem("requests", JSON.stringify(requests));
}

function findBook(isbn) {
  return books.find(b => b.isbn === isbn);
}

function findMember(memberId) {
  return members.find(m => m.memberId === memberId);
}

document.addEventListener("DOMContentLoaded", () => {
  const checkBtn = document.getElementById("checkBtn");
  const requestBtn = document.getElementById("requestBtn");
  const info = document.getElementById("info");

  checkBtn.addEventListener("click", () => {
    const memberId = document.getElementById("memberId").value.trim();
    const isbn = document.getElementById("isbn").value.trim();

    requestBtn.disabled = true;
    info.textContent = "";

    if (!memberId || !isbn) {
      alert("Please enter Member ID and ISBN.");
      return;
    }

    const member = findMember(memberId);
    if (!member) {
      info.textContent = "Member not found.";
      return;
    }

    const book = findBook(isbn);
    if (!book) {
      info.textContent = "Book not found.";
      return;
    }

    const available = (book.isIssued !== true);
    info.textContent = available ? "Book is Available ✅" : "Book is Not Available ❌";

    requestBtn.disabled = !available;
  });

  requestBtn.addEventListener("click", () => {
    const memberId = document.getElementById("memberId").value.trim();
    const isbn = document.getElementById("isbn").value.trim();
    const book = findBook(isbn);

    if (!book || book.isIssued === true) {
      alert("Book is not available.");
      return;
    }

    requests.push({
      memberId,
      isbn,
      requestedAt: new Date().toISOString(),
      status: "Pending"
    });
    saveRequests();
    alert("Request submitted!");
  });
});
