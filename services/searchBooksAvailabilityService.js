let books = JSON.parse(localStorage.getItem("books")) || [];

function render(list) {
  const tbody = document.getElementById("resultsBody");
  tbody.innerHTML = "";

  if (list.length === 0) {
    tbody.innerHTML = `<tr><td colspan="4">No books found.</td></tr>`;
    return;
  }

  list.forEach(b => {
    const isIssued = b.isIssued === true;
    const status = isIssued ? "Not Available" : "Available";

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${b.title || "-"}</td>
      <td>${b.author || "-"}</td>
      <td>${b.isbn || "-"}</td>
      <td>${status}</td>
    `;
    tbody.appendChild(tr);
  });
}

function search() {
  const filter = document.getElementById("availabilityFilter").value;
  if (filter === "all") return render(books);

  const wantIssued = (filter === "unavailable");
  const filtered = books.filter(b => (b.isIssued === true) === wantIssued);
  render(filtered);
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("searchBtn").addEventListener("click", search);
  render(books);
});
