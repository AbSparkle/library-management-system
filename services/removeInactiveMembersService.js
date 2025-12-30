let members = JSON.parse(localStorage.getItem("members")) || [];

function saveMembers() {
  localStorage.setItem("members", JSON.stringify(members));
}

function loadInactive() {
  const tbody = document.getElementById("inactiveBody");
  tbody.innerHTML = "";

  const inactive = members
    .map((m, idx) => ({ ...m, _idx: idx }))
    .filter(m => m.isActive === false);

  if (inactive.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5">No inactive members found.</td></tr>`;
    return;
  }

  inactive.forEach(m => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${m.memberId || "-"}</td>
      <td>${m.fullName || "-"}</td>
      <td>${m.email || "-"}</td>
      <td>${m.phone || "-"}</td>
      <td><button data-idx="${m._idx}">Remove</button></td>
    `;
    tbody.appendChild(tr);
  });

  tbody.querySelectorAll("button").forEach(btn => {
    btn.addEventListener("click", () => {
      const idx = Number(btn.getAttribute("data-idx"));
      if (!confirm("Remove this inactive member?")) return;

      members.splice(idx, 1);
      saveMembers();
      loadInactive();
      alert("Inactive member removed.");
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("loadBtn").addEventListener("click", loadInactive);
});
