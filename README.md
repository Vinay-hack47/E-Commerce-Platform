# E-Commerce-Platform

## Overview

**E-Commerce-Platform** is a full-stack MERN (MongoDB, Express, React, Node.js) e-commerce application featuring robust admin controls, JWT authentication, Cloudinary image uploads, and a professional UI/UX built with Tailwind CSS. The platform supports product and category management, secure authentication, and seamless category-product association, all wrapped in a modern, responsive interface.

## Live Demo

[View Live Demo](https://your-demo-link.com)

## Features

- **Admin Product Management:**
  - Create, update, and delete products (with Cloudinary image upload/removal).
  - Product images are stored with both `url` and `public_id` in the database.
  - All product actions are protected by JWT authentication.
- **Admin Category Management:**
  - Create, update, and delete categories.
  - View and manage products by category.
  - Admin-only access for all category endpoints.
- **Category-Product Association:**
  - Fetch and display products by category.
  - UI for viewing products under each category.
- **Authentication:**
  - JWT-based authentication for all protected/admin routes.
  - Secure login/logout flows.
- **UI/UX:**
  - Professional, responsive design using Tailwind CSS.
  - User-friendly admin forms and lists.
  - Clear, styled buttons and navigation.

## Tech Stack

- **Frontend:** React, Tailwind CSS, Vite
- **Backend:** Node.js, Express
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Token)
- **Image Uploads:** Cloudinary

## Screenshots

### Admin Product Management


<!-- Add more screenshots as needed -->

## Getting Started

### Prerequisites

- Node.js & npm
- MongoDB instance (local or cloud)
- Cloudinary account (for image uploads)

### Backend Setup

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd "E-Commerce Website"
   ```
2. Install dependencies:
   ```bash
   cd server
   npm install
   ```
3. Create a `.env` file in the `server` directory and add your environment variables:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```
4. Start the backend server:
   ```bash
   npm start
   ```

### Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   npm install
   ```
2. Start the frontend development server:
   ```bash
   npm run dev
   ```

The app will be available at `http://localhost:5173` (or as specified by Vite).

## Usage

- Register or log in as an admin to access product and category management features.
- Use the navigation bar to switch between products, categories, and admin features.
- Add, edit, or delete products and categories as needed.

## Folder Structure

- `frontend/` — React app (components, pages, API calls, styles)
- `server/` — Express backend (routes, controllers, models, middleware)

## License

This project is licensed under the MIT License.

---

*Replace the live demo link and add more screenshots as needed!*
