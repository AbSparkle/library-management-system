const members = JSON.parse(localStorage.getItem("members")) || [];
const borrowRecords = JSON.parse(localStorage.getItem("borrowRecords")) || []; 
// borrowRecords format example:
// { memberId, bookTitle, isbn, borrowedAt, returnedAt }

function findMemberById(memberId) {
  return members.find(m => m.memberId === memberId);
}

function getHistory(memberId) {
  // Option A: separate borrowRecords storage
  const recordsFromBorrowRecords = borrowRecords.filter(r => r.memberId === memberId);
  if (recordsFromBorrowRecords.length > 0) return recordsFromBorrowRecords;

  // Option B: borrowHistory stored inside member object
  const member = findMemberById(memberId);
  if (member && Array.isArray(member.borrowHistory) && member.borrowHistory.length > 0) {
    return member.borrowHistory;
  }

  return [];
}

function renderHistory(records) {
  const tbody = document.getElementById("historyTableBody");
  tbody.innerHTML = "";

  records.forEach(r => {
    const borrowedAt = r.borrowedAt ? new Date(r.borrowedAt).toLocaleString() : "-";
    const returnedAt = r.returnedAt ? new Date(r.returnedAt).toLocaleString() : "-";
    const status = r.returnedAt ? "Returned" : "Borrowed";

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${borrowedAt}</td>
      <td>${r.bookTitle || r.title || "-"}</td>
      <td>${r.isbn || "-"}</td>
      <td>${returnedAt}</td>
      <td>${status}</td>
    `;
    tbody.appendChild(row);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("viewHistoryBtn");
  const statusMessage = document.getElementById("statusMessage");

  btn.addEventListener("click", () => {
    const memberId = document.getElementById("memberIdInput").value.trim();
    if (!memberId) {
      alert("Please enter a Member ID.");
      return;
    }

    const member = findMemberById(memberId);
    if (!member) {
      statusMessage.textContent = "Member not found.";
      renderHistory([]);
      return;
    }

    const records = getHistory(memberId);
    if (records.length === 0) {
      statusMessage.textContent = `No borrowing history found for ${member.fullName} (${member.memberId}).`;
      renderHistory([]);
      return;
    }

    statusMessage.textContent = `Borrowing history for ${member.fullName} (${member.memberId})`;
    renderHistory(records);
  });
});
