export const seedData = {
  colleges: [
    { id: 'C001', name: 'Agra Engineering College', code: 'AEC', city: 'Agra', status: 'Active', plan: 'Standard', feePerDay: 5, loanDays: 14 },
    { id: 'C002', name: 'Taj Science College', code: 'TSC', city: 'Agra', status: 'Active', plan: 'Premium', feePerDay: 10, loanDays: 14 },
  ],
  librarians: [
    { id: 'L001', name: 'Ritu Sharma', email: 'ritu@aec.edu', password: 'lib123', collegeId: 'C001', status: 'Active' },
    { id: 'L002', name: 'Manoj Gupta', email: 'manoj@tsc.edu', password: 'lib123', collegeId: 'C002', status: 'Active' },
  ],
  students: [
    { id: 'AEC001', name: 'Aman Verma', email: 'aman@aec.edu', password: 'stu123', course: 'B.Tech', department: 'CSE', collegeId: 'C001', status: 'Active' },
    { id: 'AEC002', name: 'Neha Rawat', email: 'neha@aec.edu', password: 'stu123', course: 'B.Tech', department: 'IT', collegeId: 'C001', status: 'Active' },
    { id: 'AEC003', name: 'Rohit Sharma', email: 'rohit@aec.edu', password: 'stu123', course: 'BCA', department: 'Computer Applications', collegeId: 'C001', status: 'Active' },
    { id: 'TSC001', name: 'Priya Singh', email: 'priya@tsc.edu', password: 'stu123', course: 'B.Sc', department: 'Physics', collegeId: 'C002', status: 'Active' },
  ],
  books: [
    { id: 'B001', title: 'Wings of Fire', author: 'A.P.J. Abdul Kalam', category: 'Biography', isbn: '9788173711466', quantity: 4, available: 3, shelf: 'A-01', collegeId: 'C001' },
    { id: 'B002', title: 'Introduction to Algorithms', author: 'T. H. Cormen', category: 'Computer Science', isbn: '9780262046305', quantity: 3, available: 3, shelf: 'B-02', collegeId: 'C001' },
    { id: 'B003', title: 'Python Crash Course', author: 'Eric Matthes', category: 'Computer Science', isbn: '9781718502703', quantity: 5, available: 4, shelf: 'B-03', collegeId: 'C001' },
    { id: 'B004', title: 'Discovering India', author: 'Jawaharlal Nehru', category: 'History', isbn: '9780143031031', quantity: 2, available: 0, shelf: 'C-04', collegeId: 'C001' },
    { id: 'B005', title: 'Engineering Mathematics', author: 'B. S. Grewal', category: 'Mathematics', isbn: '9788174091955', quantity: 6, available: 6, shelf: 'C-01', collegeId: 'C001' },
    { id: 'B006', title: 'Database System Concepts', author: 'Silberschatz', category: 'Computer Science', isbn: '9780078022159', quantity: 4, available: 4, shelf: 'B-04', collegeId: 'C001' },
    { id: 'B007', title: 'Organic Chemistry', author: 'Morrison and Boyd', category: 'Science', isbn: '9780136436690', quantity: 3, available: 3, shelf: 'S-01', collegeId: 'C002' },
  ],
  requests: [
    { id: 'R001', studentId: 'AEC003', bookId: 'B002', date: new Date().toISOString().slice(0,10), status: 'Pending', collegeId: 'C001' },
  ],
  issues: [
    { id: 'I001', studentId: 'AEC001', bookId: 'B001', issueDate: daysAgo(10), dueDate: daysAgo(-4), returnDate: '', status: 'Issued', collegeId: 'C001' },
  ],
};
function daysAgo(n) { const d = new Date(); d.setDate(d.getDate()-n); return d.toISOString().slice(0,10); }
export const superAdmin = { id: 'SA001', name: 'Super Admin', email: 'superadmin@dlms.com', password: 'admin123', role: 'admin', status: 'Active' };
