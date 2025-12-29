## LMS-18: Return Book

### Description
Allows a librarian to return a previously issued book.

### Business Rules
- Only issued books can be returned
- Returning resets book availability
- Member association is cleared

### How It Works
- Status changes from "issued" to "available"
- issuedTo field is reset to null
- Data is persisted using localStorage

### How to Test
1. Issue a book to a member
2. Call returnBook(isbn)
3. Verify status becomes "available"
4. Try returning again → blocked

### Files Modified
- services/bookService.js
- docs/LMS-18-return-book.md
