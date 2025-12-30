let members = JSON.parse(localStorage.getItem("members")) || [];
let selectedMemberIndex = null;

function saveMembers() {
  localStorage.setItem("members", JSON.stringify(members));
}

function findMemberIndexById(memberId) {
  return members.findIndex(m => m.memberId === memberId);
}

document.addEventListener("DOMContentLoaded", () => {
  const searchBtn = document.getElementById("searchBtn");
  const updateForm = document.getElementById("updateMemberForm");
  const searchResult = document.getElementById("searchResult");

  // Search member
  searchBtn.addEventListener("click", () => {
    const memberId = document.getElementById("searchMemberId").value.trim();

    if (!memberId) {
      alert("Please enter a Member ID.");
      return;
    }

    const index = findMemberIndexById(memberId);

    if (index === -1) {
      selectedMemberIndex = null;
      searchResult.textContent = "Member not found.";
      updateForm.reset();
      return;
    }

    selectedMemberIndex = index;
    const member = members[index];

    // Fill form with existing data
    document.getElementById("fullName").value = member.fullName || "";
    document.getElementById("email").value = member.email || "";
    document.getElementById("phone").value = member.phone || "";

    searchResult.textContent = `Member found: ${member.fullName} (${member.memberId})`;
  });

  // Update member
  updateForm.addEventListener("submit", (e) => {
    e.preventDefault();

    if (selectedMemberIndex === null) {
      alert("Please search and select a member first.");
      return;
    }

    members[selectedMemberIndex].fullName = document.getElementById("fullName").value.trim();
    members[selectedMemberIndex].email = document.getElementById("email").value.trim();
    members[selectedMemberIndex].phone = document.getElementById("phone").value.trim();
    members[selectedMemberIndex].updatedAt = new Date().toISOString();

    saveMembers();
    alert("Member profile updated successfully!");
  });
});
