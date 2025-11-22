# 🍔 QuickGrab: Modern Food Delivery Platform

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
* **Filtering & Sorting:** Users can search for restaurants by name, cuisine, or dish, and sort the results by:



Relevance



Delivery Time



Rating (Highest)



Cost (Low to High)



Rating Filter: Users can filter listings based on a minimum rating (e.g., 4.0+).
* **User Customization:** Users are able to **change their profile name** and **update their profile picture** on the profile page, showcasing React's ability to manage dynamic user state.

---

## 💻 Tech Stack
* **React:** The main library for building the declarative UI.
* **HTML & CSS:** The foundational languages for application structure and custom styling.
* **Bootstrap:** Utilized for a responsive grid system and pre-styled components.
* **Axios:** A promise-based HTTP client used for fetching data from the mock API.
* **JSON:** Used as the local data source (`db.json`) to simulate a real-world API.
* **React Router DOM:** Essential for handling client-side routing and navigation between views.
---
## 🚀 How to Run the Project (VS Code Terminal)
To successfully run this project.
These commands clone the repository and install all the required packages.
```bash
# Clone the repository
git clone https://github.com/HarinisarathyP/Instagram_clone-using-react
# Navigate into the main project folder
cd Instagram
# Install all main dependencies (from package.json)
npm install
# Install necessary utility packages for data fetching (Axios) and routing (React Router DOM)
npm install axios
npm install react-router-dom
Terminal 1: Start the Mock API Server
npx json-server --watch Instagram\db\db.json --port 3000
# Navigate to the specific React app directory
cd Instagram 
# Start the React development server
npm run dev
