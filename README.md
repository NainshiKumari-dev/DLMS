# Libra — Multi-College Digital Library Management System

A modular React + Vite frontend prototype for a multi-college library SaaS idea.

## Features

- Three demo roles: Super Admin, College Librarian, Student
- Super Admin: register colleges, activate/deactivate colleges, create librarian accounts, cross-college analytics
- Librarian: manage books and students, review requests, issue/return books, track overdue fees and reports
- Student: search books, request books, view request status and issued books
- College-scoped records in the demo data
- LocalStorage persistence for demo data
- Responsive navy/blue dashboard and login screen

## Run locally

1. Install Node.js (LTS).
2. Extract the project folder and open it in VS Code.
3. Open Terminal in this folder and run:

```bash
npm install
npm run dev
```

4. Open the local URL printed by Vite (usually http://localhost:5173).

## Demo credentials

| Role                                 | ID       | Password   |
| ------------------------------------ | -------- | ---------- |
| Super Admin                          | `SA001`  | `admin123` |
| Librarian (Agra Engineering College) | `L001`   | `lib123`   |
| Librarian (Taj Science College)      | `L002`   | `lib123`   |
| Student                              | `AEC001` | `stu123`   |
| Student                              | `AEC002` | `stu123`   |
| Student                              | `AEC003` | `stu123`   |

## Folder structure

```text
src/
  components/       # Sidebar, Topbar, Modal, DataTable, forms, stat cards
  context/          # Shared app state and demo actions
  data/             # Initial sample colleges, users, books, requests and issues
  pages/            # Login, dashboards, books, students, requests, circulation, reports
  App.jsx
  main.jsx
  styles.css
```

## Important prototype limitation

This is a frontend demo. Login credentials are demo-only and are not production-grade authentication. Data is stored in the browser's localStorage; it is not shared between devices and can be modified by the browser user. There is no Java/Spring Boot backend or MySQL database connected yet.

## Future backend integration

Replace the local functions in `src/context/LibraryContext.jsx` with calls to Spring Boot REST APIs. Suggested stack:

- React + Vite
- Java + Spring Boot + Spring Web
- JDBC (`spring-boot-starter-jdbc`) + MySQL Driver
- MySQL database with `college_id` on college-specific records
- Spring Security for real authentication and authorization

The backend must enforce college-level data isolation; hiding other colleges' data in the UI alone is not security.

# DLMS

A React-based multi-college Digital Library Management System prototype with role-based dashboards for Super Admin , Librarian , and Student.
