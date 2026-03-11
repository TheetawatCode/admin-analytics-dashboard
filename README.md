# Admin Analytics Dashboard

A modern **fullstack admin dashboard** built with **Next.js, TypeScript, Prisma, and PostgreSQL** for monitoring key business metrics such as revenue, orders, customers, and products.

This project demonstrates how to design and implement a **scalable dashboard architecture** with a relational database, RESTful APIs, and reusable UI components suitable for real-world business applications.

---

# 🚀 Live Demo

https://admin-analytics-dashboard.vercel.app

*(Update this link after deployment)*

---

# 🧠 Project Overview

The **Admin Analytics Dashboard** provides a centralized interface for monitoring and managing business data. It focuses on building a scalable fullstack architecture using modern web technologies.

Key objectives of this project include:

- Implementing a **fullstack architecture** with Next.js App Router
- Designing a **relational database schema** with PostgreSQL
- Using **Prisma ORM** for type-safe database operations
- Creating **reusable UI components** for maintainable frontend development
- Implementing **pagination and efficient data queries**
- Building a clean and responsive **analytics dashboard interface**

---

# 🛠 Tech Stack

### Frontend

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui
- Lucide Icons

### Backend

- Next.js API Routes
- Prisma ORM
- PostgreSQL

### Tooling

- pnpm
- ESLint
- Prettier

---

# ✨ Features

## Dashboard Overview

- Business KPI cards
  - Total Revenue
  - Total Orders
  - Total Customers
  - Active Products
- Revenue analytics chart
- Sales summary metrics
- Recent orders activity table

---

## Customers Management

- Customer listing page
- Pagination support
- Order count per customer
- Server-side database queries

---

## Orders Management

- Orders table
- Status indicators (Paid / Pending / Completed)
- Pagination support
- Order amount tracking

---

## Products Module

A **placeholder module** prepared for future expansion, including:

- Product catalog
- Inventory management
- Product analytics

---

## UI / UX

- Responsive admin layout
- Sidebar navigation
- Dashboard analytics layout
- Disabled global search (planned feature)

---

# 🗄 Database Schema

The application uses a **relational database schema** with the following core entities:

```
Customer
   ↓
Order
   ↓
OrderItem
   ↓
Product
```

Relationship overview:

- A **Customer** can create multiple Orders
- An **Order** contains multiple OrderItems
- Each **OrderItem** references a specific Product

---

# 📸 Screenshots

### Dashboard

![Dashboard](public/screenshots/dashboard.png)

### Customers

![Customers](public/screenshots/customers.png)

### Orders

![Orders](public/screenshots/orders.png)

### Products

![Products](public/screenshots/products.png)

---

# 📂 Project Structure

```
src
├─ app
│  ├─ dashboard
│  ├─ customers
│  ├─ orders
│  └─ products
│
├─ components
│  ├─ layout
│  ├─ dashboard
│  └─ ui
│
├─ lib
│  └─ prisma
│
└─ generated
   └─ prisma
```

---

# ⚙️ Getting Started

## 1 Install dependencies

```bash
pnpm install
```

---

## 2 Setup environment variables

Create a `.env` file:

```
DATABASE_URL="postgresql://user:password@localhost:5432/admin_dashboard"
```

---

## 3 Generate Prisma Client

```bash
pnpm prisma generate
```

---

## 4 Run database migration

```bash
pnpm prisma migrate dev
```

---

## 5 Seed the database

```bash
pnpm seed
```

This will generate sample data including:

- 12 customers
- 4 products
- 8 orders

---

## 6 Run the development server

```bash
pnpm dev
```

Open:

```
http://localhost:3000
```

---

# 📈 Future Improvements

Potential future enhancements:

- Global search across customers and orders
- Product management module
- Order detail page
- Authentication and role-based access control
- Advanced analytics dashboard

---

# 👨‍💻 Author

**Theetawat Premsawat**

Frontend-Focused Full-Stack Developer

Tech focus:

- React
- Next.js
- TypeScript
- Fullstack Web Applications