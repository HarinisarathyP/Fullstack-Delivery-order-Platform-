# 🍔 QuickGrab: Food Delivery Platform

---
## 🌐 Live Demo

View the deployed version of the project here:

https://frontend-pe93.onrender.com/

***

## 💡 About

QuickGrab is a full-stack, real-time food delivery application that replicates the core functionality and user experience of popular platforms like Swiggy or Zomato.


The project serves as a comprehensive demonstration of integrating a TypeScript-based React frontend with a TypeScript Node/Express API backed by a MongoDB database, including advanced features like Cloudinary image hosting, dynamic searching, and complex filtering.

---

## ✨ Functions
* **Dynamic Restaurant Listing:**Displays a grid of available restaurants with ratings, offers, and delivery details.
* **Filtering & Sorting:** Users can search for restaurants by name, cuisine, or dish, and sort the results by:1)Relevance  2) Delivery Time  3)Rating (Highest)
4)Cost (Low to High)  5)Rating Filter
* **Menu Viewing:** Clicking a restaurant card navigates to a dedicated menu page where dishes are grouped by category.
* **Visual Cart Counter:** When a menu item is clicked and added to the cart, the cart icon in the header dynamically updates to display the total item count.

---

## 💻 Tech Stack
* This is a full-stack MERN-like application built on TypeScript.

* **Frontend:** 
* **Framework:** React (with Vite)	Building the component-based Single Page Application (SPA).
* **Language** TypeScript	Enhancing code quality and maintainability with static type checking.
* **Routing** React Router DOM	Managing client-side navigation between pages (Home, Menu, Cart).
* **State:** React Context / Hooks	Global state management for filtering and the visual cart counter.

* **Backend & Database** 
* **Server:** **Node.js / Express js**	Handling API routing and business logic.
* **Database** **MongoDB**(via Mongoose)	Persistent data storage for restaurants and menus.
* **Language** **TypeScript**	Type checking on the server-side logic.
* **Deployment:** **Render**	Used for continuous deployment of both the Web Service (Backend) and Static Site (Frontend).
* **Storage:**	**Cloudinary**	Used for hosting and serving optimized restaurant and dish images. make this good looking  with this context
---

Terminal 1: Start the Mock API Server
npx json-server --watch Instagram\db\db.json --port 3000
# Navigate to the specific React app directory
cd Instagram 
# Start the React development server
npm run dev
