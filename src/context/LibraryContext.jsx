import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { seedData, superAdmin } from '../data/seed';
const Ctx = createContext(null);
const KEY = 'multi-college-dlms-react-v1';
const today = () => new Date().toISOString().slice(0,10);
const addDays = (date, n) => { const d = new Date(date+'T00:00:00'); d.setDate(d.getDate()+n); return d.toISOString().slice(0,10); };
const daysLate = due => Math.max(0, Math.floor((new Date(today()) - new Date(due+'T00:00:00')) / 86400000));
export const useLibrary = () => useContext(Ctx);
export function LibraryProvider({ children }) {
  const [data, setData] = useState(() => { try { return JSON.parse(localStorage.getItem(KEY)) || seedData; } catch { return seedData; } });
  const [user, setUser] = useState(() => { try { return JSON.parse(sessionStorage.getItem('dlms-user')) || null; } catch { return null; } });
  const [toast, setToast] = useState('');
  useEffect(() => { localStorage.setItem(KEY, JSON.stringify(data)); }, [data]);
  const notify = msg => { setToast(msg); window.setTimeout(() => setToast(''), 2800); };
  const college = user?.role === 'admin' ? null : data.colleges.find(c => c.id === user?.collegeId);
  const login = (role, id, password) => {
    const list = role === 'admin' ? [superAdmin] : role === 'librarian' ? data.librarians : data.students;
    const found = list.find(x => x.id.toLowerCase() === id.trim().toLowerCase() && x.password === password);
    if (!found) return { ok:false, message:'Incorrect ID or password.' };
    if (found.status !== 'Active') return { ok:false, message:'This account is inactive. Contact your administrator.' };
    if (role !== 'admin' && !data.colleges.some(c => c.id === found.collegeId && c.status === 'Active')) return { ok:false, message:'College account is inactive.' };
    const session = { id:found.id, name:found.name, email:found.email, role, collegeId:found.collegeId || null };
    setUser(session); sessionStorage.setItem('dlms-user', JSON.stringify(session)); return {ok:true};
  };
  const logout = () => { setUser(null); sessionStorage.removeItem('dlms-user'); };
  const update = fn => setData(prev => { const next = structuredClone(prev); fn(next); return next; });
  const scoped = list => list.filter(x => user?.role === 'admin' || x.collegeId === user?.collegeId);
  const addCollege = form => {
    if (data.colleges.some(c => c.code.toLowerCase() === form.code.trim().toLowerCase())) return notify('College code already exists.');
    const id = 'C'+String(data.colleges.length+1).padStart(3,'0');
    update(d => d.colleges.push({id, name:form.name.trim(), code:form.code.trim().toUpperCase(), city:form.city.trim(), status:'Active', plan:form.plan, feePerDay:Number(form.feePerDay)||5, loanDays:Number(form.loanDays)||14}));
    notify('College registered. Create a librarian account for it.');
  };
  const addLibrarian = form => { if(data.librarians.some(l=>l.email.toLowerCase()===String(form.email).toLowerCase())) return notify('This librarian email is already registered.'); if(String(form.password||'').length<6) return notify('Password must contain at least 6 characters.'); const id='L'+String(data.librarians.length+1).padStart(3,'0'); update(d=>d.librarians.push({id,...form,status:'Active'})); notify('Librarian account created.'); };
  const toggleCollege = id => { update(d=>{const c=d.colleges.find(x=>x.id===id); if(c)c.status=c.status==='Active'?'Inactive':'Active';}); notify('College status updated.'); };
  const addBook = form => { const id='B'+String(data.books.length+1).padStart(3,'0'); const qty=Number(form.quantity); update(d=>d.books.push({id,...form,quantity:qty,available:qty,collegeId:user.collegeId})); notify('Book added successfully.'); };
  const editBook = (id, form) => { update(d=>{const b=d.books.find(x=>x.id===id && x.collegeId===user.collegeId); if(!b)return; const qty=Number(form.quantity), issued=b.quantity-b.available; b.title=form.title;b.author=form.author;b.category=form.category;b.isbn=form.isbn;b.shelf=form.shelf;b.quantity=qty;b.available=Math.max(0,qty-issued);}); notify('Book updated.'); };
  const deleteBook = id => { if(data.issues.some(i=>i.bookId===id && i.status==='Issued')) return notify('Cannot delete a book while copies are issued.'); update(d=>{d.books=d.books.filter(b=>b.id===id && b.collegeId===user.collegeId);}); notify('Book deleted.'); };
  const addStudent = form => { const id=form.id.trim().toUpperCase(); if(data.students.some(s=>s.id===id || s.email.toLowerCase()===form.email.toLowerCase())) return notify('Student ID or email already exists.'); update(d=>d.students.push({...form,id,collegeId:user.collegeId,status:'Active'})); notify('Student added.'); };
  const requestBook = bookId => { const book=data.books.find(b=>b.id===bookId && b.collegeId===user.collegeId); if(!book || book.available<1)return notify('This book is out of stock.'); if(data.requests.some(r=>r.studentId===user.id && r.bookId===bookId && r.status==='Pending'))return notify('You already have a pending request.'); if(data.issues.some(i=>i.studentId===user.id && i.bookId===bookId && i.status==='Issued'))return notify('You already have this book issued.'); update(d=>d.requests.push({id:'R'+String(d.requests.length+1).padStart(3,'0'),studentId:user.id,bookId,date:today(),status:'Pending',collegeId:user.collegeId})); notify('Book request sent to librarian.'); };
  const decideRequest = (id, status) => { update(d=>{const r=d.requests.find(x=>x.id===id && x.collegeId===user.collegeId); if(r && r.status==='Pending')r.status=status;}); notify(`Request ${status.toLowerCase()}.`); };
  const issueBook = requestId => { let message=''; update(d=>{const r=d.requests.find(x=>x.id===requestId && x.collegeId===user.collegeId); if(!r || r.status!=='Approved'){message='Approve this request first.';return;} const b=d.books.find(x=>x.id===r.bookId); if(!b || b.available<1){message='Book is out of stock.';return;} b.available--; const c=d.colleges.find(x=>x.id===user.collegeId); const id='I'+String(d.issues.length+1).padStart(3,'0'); d.issues.push({id,studentId:r.studentId,bookId:r.bookId,issueDate:today(),dueDate:addDays(today(),c?.loanDays||14),returnDate:'',status:'Issued',collegeId:user.collegeId}); r.issued=true; message='Book issued and stock updated.'; }); notify(message); };
  const returnBook = issueId => { let message=''; update(d=>{const i=d.issues.find(x=>x.id===issueId && x.collegeId===user.collegeId); if(!i || i.status!=='Issued'){message='Issue record not found.';return;} i.status='Returned';i.returnDate=today();i.lateFee=daysLate(i.dueDate)*(d.colleges.find(c=>c.id===user.collegeId)?.feePerDay||5); const b=d.books.find(x=>x.id===i.bookId); if(b)b.available++; message=i.lateFee?`Book returned. Late fee: ₹${i.lateFee}.`:'Book returned successfully.'; }); notify(message); };
  const resetDemo = () => { setData(structuredClone(seedData)); logout(); notify('Demo data reset.'); };
  const value = useMemo(()=>({data,user,college,toast,login,logout,notify,scoped,addCollege,addLibrarian,toggleCollege,addBook,editBook,deleteBook,addStudent,requestBook,decideRequest,issueBook,returnBook,resetDemo}),[data,user,college,toast]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
