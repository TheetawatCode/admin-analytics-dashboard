# Admin Analytics Dashboard

A modern fullstack admin dashboard built with **Next.js, TypeScript, Prisma, and PostgreSQL** for monitoring business metrics such as revenue, orders, customers, and products.

This project demonstrates building a scalable dashboard interface with a relational database, RESTful APIs, and reusable UI components.

---

## 🚀 Live Demo
(Deploy URL here after deployment)

Example:
https://admin-analytics-dashboard.vercel.app

---

## 🧠 Project Overview

The Admin Analytics Dashboard provides an overview of key business metrics and management interfaces for customers and orders.

The project focuses on:

- Fullstack architecture with **Next.js App Router**
- **Relational database modeling** using PostgreSQL
- **Prisma ORM** for type-safe database access
- Clean and reusable **UI component structure**
- Pagination and data querying
- Dashboard analytics visualization

---

## 🛠 Tech Stack

Frontend

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui
- Lucide Icons

Backend

- Next.js API Routes
- Prisma ORM
- PostgreSQL

Tooling

- pnpm
- ESLint
- Prettier

---

## ✨ Features

### Dashboard Overview

- Business KPI cards
  - Total Revenue
  - Total Orders
  - Total Customers
  - Active Products
- Revenue analytics chart
- Sales summary metrics
- Recent orders activity table

### Customers Management

- Customer list page
- Pagination support
- Order count per customer
- Server-side database queries

### Orders Management

- Orders table
- Status indicators (Paid / Pending / Completed)
- Pagination
- Order amount tracking

### Products Module

A **placeholder module** prepared for future expansion including:

- Product catalog
- Inventory management
- Product analytics

### UI/UX

- Responsive admin layout
- Sidebar navigation
- Dashboard analytics layout
- Disabled global search (planned feature)

---

## 🗄 Database Schema

The application uses a relational schema with the following core entities:

Customer  
↓  
Order  
↓  
OrderItem  
↓  
Product

Example relationships:

- A **Customer** can have multiple Orders
- An **Order** contains multiple OrderItems
- Each **OrderItem** references a Product

---

## 📸 Screenshots

### Dashboard

![Dashboard](public/screenshots/dashboard.png)

### Customers

![Customers](public/screenshots/customers.png)

### Orders

![Orders](public/screenshots/orders.png)

### Products

![Products](public/screenshots/products.png)

---

## 📂 Project Structure
src
├─ app
│ ├─ dashboard
│ ├─ customers
│ ├─ orders
│ └─ products
│
├─ components
│ ├─ layout
│ ├─ dashboard
│ └─ ui
│
├─ lib
│ └─ prisma
│
└─ generated
└─ prisma 

---

## ⚙️ Getting Started

### 1 Install dependencies

```bash
pnpm install 

2 Setup environment variables

Create .env

DATABASE_URL="postgresql://user:password@localhost:5432/admin_dashboard" 

3 Generate Prisma Client 

pnpm prisma generate 

4 Run database migration 

pnpm prisma migrate dev 

5 Seed the database 

pnpm seed 

This will generate sample data including:

12 customers

4 products

8 orders 

6 Run the development server
pnpm dev 

Open:

http://localhost:3000 

📈 Future Improvements

Possible future features include:

Global search across customers and orders

Product management module

Order detail page

Authentication and role-based access

Advanced analytics dashboard

👨‍💻 Author

Theetawat Premsawat

Frontend-Focused Full-Stack Developer

Tech focus:

React

Next.js

TypeScript

Fullstack web applications