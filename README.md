# 💰 Expense Tracker (Full Stack with Google Auth)

A full-stack Expense Tracker web application built using React, Node.js, Express, and PostgreSQL.
This app allows users to securely log in with Google, track income and expenses, and visualize financial data.

---

## 🚀 Tech Stack

### Frontend

* React.js
* Tailwind CSS
* Recharts

### Backend

* Node.js
* Express.js
* Passport.js (Google OAuth)

### Database

* PostgreSQL

---

## ✨ Features

### 🔐 Authentication

* Google Login (OAuth 2.0)
* Secure user session handling
* User data stored in PostgreSQL

### 💰 Expense Management

* Add Income & Expenses
* Delete Transactions
* Fetch all transactions (user-specific)

### 📊 Dashboard

* Total Balance Calculation
* Income vs Expense tracking
* Pie Chart Visualization

### ⚡ Other Features

* Real-time UI updates
* Clean and responsive UI (Tailwind CSS)
* Full frontend-backend integration

---

## 🧠 How It Works

1. User logs in using Google
2. Backend authenticates user via Passport.js
3. User data is stored in PostgreSQL
4. All expenses are linked to the logged-in user
5. Dashboard displays personalized financial data

---

## 📁 Project Structure

```
expense-tracker/
│
├── frontend/                # React + Tailwind
│   ├── src/
│   │   ├── components/
│   │   │   └── ExpenseChart.jsx
│   │   ├── pages/
│   │   │   └── Dashboard.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   └── App.js
│
├── backend/                # Node + Express
│   ├── src/
│   │   ├── config/
│   │   │   ├── db.js
│   │   │   └── passport.js
│   │   ├── controllers/
│   │   │   └── expenseController.js
│   │   ├── routes/
│   │   │   ├── expenseRoutes.js
│   │   │   └── authRoutes.js
│   │   ├── middleware/
│   │   │   └── authMiddleware.js
│   │   ├── schema/
│   │   │   └── schema.sql
│   │   └── app.js
│
└── README.md
```

---

## 🗄️ Database Schema

### Users Table

* id (Primary Key)
* google_id
* name
* email

### Expenses Table

* id
* user_id (Foreign Key)
* title
* amount
* category
* type (income / expense)
* created_at

---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repository

```
git clone https://github.com/your-username/expense-tracker.git
cd expense-tracker
```

---

### 2️⃣ Backend Setup

```
cd backend
npm install
```

Create `.env` file:

```
DB_USER=postgres
DB_HOST=localhost
DB_NAME=expense_tracker
DB_PASSWORD=your_password
DB_PORT=5432

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
SESSION_SECRET=your_secret
```

Run backend:

```
npx nodemon src/app.js
```

---

### 3️⃣ Frontend Setup

```
cd frontend
npm install
npm start
```

---

## 🌐 API Endpoints

### Auth

| Method | Endpoint              | Description    |
| ------ | --------------------- | -------------- |
| GET    | /auth/google          | Google login   |
| GET    | /auth/google/callback | OAuth callback |

### Expenses

| Method | Endpoint          | Description        |
| ------ | ----------------- | ------------------ |
| POST   | /api/expenses/add | Add expense/income |
| GET    | /api/expenses     | Get user expenses  |
| DELETE | /api/expenses/:id | Delete expense     |









## 🔮 Future Improvements

* ✏ Edit Expense
* 📅 Filters (date/category)
* 📱 Mobile optimization
* 📊 Advanced analytics

---

## 👨‍💻 Author

* Swastik Kumar Purohit

---

## ⭐ Show Your Support

If you like this project, give it a ⭐ on GitHub!
