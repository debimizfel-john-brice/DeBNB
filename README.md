# 🏖️ DeBNB

DeBNB is a full-featured web application for exploring **vacation packages organized by price**, where users can **filter destinations**, **save favorites**, and administrators can **manage content in real time**.

The system includes **authentication** with **automatic role detection** (admin or user) based on the user’s email.

---

## 🧩 Tech Stack

- **Frontend:** React + TypeScript  
- **Backend / Database:** SQL  
- **Authentication:** Login with automatic role detection (admin / user)
- **Updates:** Real-time updates

---

## ✨ Features

### 👤 User
- User login
- Vacation listings displayed as cards
- Detailed information for each vacation:
  - Location
  - Dates
  - Price
  - Description
  - Image
- Filters to sort and browse vacations by price
- **Favorites (likes)** system
- Like counter visible on each card
- Clean and responsive UI

---

### ❤️ Favorites
- Users can like and unlike vacations
- Favorites are saved per user
- Like count updates in real time

---

## 🔐 Authentication & Roles

- The system automatically determines whether a user is:
  - **Admin**
  - **User**
- The role is assigned based on the email used during login
- Only admins have access to the admin panel

---

## 🛠️ Admin Panel

The admin panel allows administrators to:

- ➕ Add new vacations
- ✏️ Edit existing vacations
- ❌ Delete vacations
- 🔄 See changes reflected in real time across the application

Users see updates instantly without needing to refresh the page.

---

## 📸 Interface

- Main view with vacation cards
- Filter dropdown accessible from the top
- Visual like indicators
- Clean, user-focused design

---

## 🎯 Project Purpose

This project was built to:

- Develop a complete web application using React and TypeScript
- Implement authentication with role-based access
- Work with a SQL database
- Build a full CRUD system with permissions
- Handle real-time state updates
- Create a clean and intuitive user experience

---

## 👩‍💻 Author

**Deborah Mizrahi**

---

