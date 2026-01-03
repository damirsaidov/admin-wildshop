🛒 Admin WildShop

Admin WildShop is a production-ready administrative dashboard built to manage the WildShop e-commerce platform.
The project is designed as a real-world business solution, focused on scalability, usability, and clean architecture.

This admin panel allows full control over products, categories, subcategories, colors, images, and pricing — all from a single interface.

🚀 Features
📦 Product Management

Create, update, and delete products

Upload multiple images per product

Manage pricing, discounts, and stock quantity

Detailed product page with image gallery

Add / remove images without page reload

🗂 Categories & Subcategories

Full CRUD for categories

Image upload for categories

Subcategory–category relations

Editing via modal dialogs

Clean and structured data flow

🎨 Color Management

Manage product color variants

Visual color preview

Fast editing and deletion

🔐 Authentication & Access Control

Admin authentication (JWT)

Protected routes

Role validation

Automatic redirect if user is not authorized

📱 Responsive Design

Fully responsive layout

Mobile-friendly admin panel

Hamburger navigation for small screens

Optimized UI for screens ≤ 520px

Desktop layout remains unchanged

🧱 Tech Stack

Frontend

React + TypeScript

React Router

Tailwind CSS

Ant Design (Modal, Upload, UI components)

React Icons

Backend (API)

REST API

JWT authentication

Multipart/form-data for image uploads

🗂 Project Structure
src/
├─ pages/
│ ├─ Home.tsx
│ ├─ Categories.tsx
│ ├─ SubCategories.tsx
│ ├─ Colors.tsx
│ ├─ AboutProduct.tsx
│ ├─ Login.tsx
│
├─ layout/
│ └─ Layout.tsx
│
├─ components/
│ ├─ Loader.tsx
│ ├─ Error.tsx
│
├─ styles/
│ └─ global.css

🧭 Routes

/ — Products

/categories — Categories

/subCategories — Subcategories

/colors — Colors

/products/:id — Product details

/login — Admin login

/profile — Admin profile

🖼 Media & Image Handling

Upload images using multipart/form-data

Multiple images per product

Remove images individually

Edit content without full page reload

📦 Installation & Run
npm install
npm run dev

or

yarn install
yarn dev

🛡 Security

JWT stored in localStorage

Protected admin routes

Role-based access check

Auto logout on missing or invalid token

📈 Project Status

✅ Active development
✅ Production-ready
🔜 Scalable architecture
🔜 Ready for analytics & logging

👨‍💻 Author

Damir Saidov
GitHub: damirsaidov

This project was built as a real business admin dashboard, focusing on:

clean UI/UX

maintainable codebase

scalability

real-world API integration

📄 License

This project is part of the WildShop ecosystem and intended for internal and commercial use.
