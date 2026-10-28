import React, { useEffect, useState } from 'react';
import { LibraryProvider, useLibrary } from './context/LibraryContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Books from './pages/Books';
import Students from './pages/Students';
import Requests from './pages/Requests';
import Issues from './pages/Issues';
import Colleges from './pages/Colleges';
import Reports from './pages/Reports';
import Analytics from './pages/Analytics';
import { SearchBooks, MyRequests, MyBooks } from './pages/StudentPages';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import { Database, RotateCcw } from 'lucide-react';
function Shell(){const {user,college,logout,toast,resetDemo,addStudent,notify}=useLibrary();const [page,setPage]=useState('dashboard'),[navOpen,setNavOpen]=useState(false);useEffect(()=>{const handler=e=>{if(user?.role!=='librarian')return;addStudent(e.detail);};window.addEventListener('dlms-add-student',handler);return()=>window.removeEventListener('dlms-add-student',handler);},[user,addStudent]);if(!user)return <><Login/>{toast&&<div className="toast">{toast}</div>}</>;const titles={dashboard:'Dashboard',colleges:'Manage Colleges',librarians:'Librarian Accounts',analytics:'Reports & Analytics',books:'Manage Books',students:'Manage Students',requests:'Book Requests',issues:'Issue & Return',reports:'Library Reports',search:'Search Books',myrequests:'My Requests',mybooks:'My Issued Books'};let content;if(page==='dashboard')content=<Dashboard onNavigate={setPage}/>;else if((page==='colleges'||page==='librarians')&&user.role==='admin')content=<Colleges/>;else if(page==='analytics'&&user.role==='admin')content=<Analytics/>;else if(page==='books'&&user.role==='librarian')content=<Books/>;else if(page==='students'&&user.role==='librarian')content=<Students/>;else if(page==='requests'&&user.role==='librarian')content=<Requests/>;else if(page==='issues'&&user.role==='librarian')content=<Issues/>;else if(page==='reports'&&user.role==='librarian')content=<Reports/>;else if(page==='search'&&user.role==='student')content=<SearchBooks/>;else if(page==='myrequests'&&user.role==='student')content=<MyRequests/>;else if(page==='mybooks'&&user.role==='student')content=<MyBooks/>;else content=<Dashboard onNavigate={setPage}/>;return <div className="app-shell"><Sidebar role={user.role} page={page} onNavigate={p=>{setPage(p);setNavOpen(false)}} onLogout={logout} open={navOpen} onClose={()=>setNavOpen(false)}/><div className="main-area"><Topbar title={titles[page]||'Dashboard'} user={user} college={college} onMenu={()=>setNavOpen(true)}/><main className="page-content">{content}<footer className="app-footer"><span>© 2026 Libra Digital Library · Prototype</span><span><Database size={14}/> Demo data stored in this browser</span><button onClick={()=>{if(window.confirm('Reset all prototype data to the original demo?'))resetDemo();}}><RotateCcw size={13}/> Reset demo</button></footer></main></div>{toast&&<div className="toast">{toast}</div>}</div>}
export default function App(){return <LibraryProvider><Shell/></LibraryProvider>}
