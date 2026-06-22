# Product Management Dashboard

A full-stack Product Management Dashboard built with:

- React + TypeScript + Vite
- Material UI
- Node.js + Express + TypeScript
- MongoDB + Mongoose

## Project Structure

```bash
product-management-dashboard/
│
├── client/
├── server/
└── README.md
```

---

## Prerequisites

Make sure you have installed:

- Node.js (v18+ recommended)
- npm
- MongoDB (Local or Atlas)

---

# Backend Setup

## Navigate to server

```bash
cd server
```

## Install dependencies

```bash
npm install
```

## Create .env file

Create a `.env` file inside the `server` folder.

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
```

Example:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/product-dashboard
```

## Start backend

Development:

```bash
npm run dev
```

Production:

```bash
npm run build
npm start
```

Server runs on:

```bash
http://localhost:3000
```

---

# Frontend Setup

## Navigate to client

```bash
cd client
```

## Install dependencies

```bash
npm install
```

## Create .env file

Create a `.env` file inside the `client` folder.

```env
VITE_SERVER_BASE_URL=http://localhost:3000/api
```

## Start frontend

```bash
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

# API Endpoints

## Products

| Method | Endpoint           | Description         |
| -------- | ------------------ | ------------------- |
| GET    | /api/product/all   | Get all products    |
| GET    | /api/product/:id   | Get product by id   |
| POST   | /api/product       | Create product      |
| PUT    | /api/product/:id   | Update product      |
| DELETE | /api/product/:id   | Delete product      |

## Categories

| Method | Endpoint            | Description          |
| -------- | ------------------- | -------------------- |
| GET    | /api/category/all   | Get all categories   |
| GET    | /api/category/:id   | Get category by id   |
| POST   | /api/category       | Create category      |
| PUT    | /api/category/:id   | Update category      |
| DELETE | /api/category/:id   | Delete category      |

---

# Features

- Product CRUD
- Category CRUD
- Product Search
- Product Pagination
- Form Validation
- Responsive UI
- Material UI Components

---

# Tech Stack

### Frontend

- React
- TypeScript
- Vite
- Material UI
- Axios
- React Router

### Backend

- Node.js
- Express
- TypeScript
- MongoDB
- Mongoose
- Zod

---

# Running Both Applications

Open two terminals.

### Terminal 1

```bash
cd server
npm install
npm run dev
```

### Terminal 2

```bash
cd client
npm install
npm run dev
```

Visit:

```bash
http://localhost:5173
```

# Initial Setup

Before creating a product, you must first create at least one category because products are associated with categories.

Create a Category

Send a POST request to:

POST /api/category

Request Body:

{
  "name": "Electronics"
}

Example using cURL:

curl --location 'http://localhost:3000/api/category' \
--header 'Content-Type: application/json' \
--data '{
    "name": "Electronics"
}'