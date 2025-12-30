// LMS-20 Prevent Double Issuing
// Checks if a member already issued a book.

function checkIfAlreadyIssued(memberId, bookId) {
    // Temporary logic until database is added
    console.log(`Checking if member ${memberId} already borrowed book ${bookId}`);
    return false; // Assume false until real DB added
}

module.exports = { checkIfAlreadyIssued };
