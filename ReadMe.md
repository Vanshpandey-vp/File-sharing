## ⚙️ Prerequisites

Before running this project locally, make sure you have the following tools installed:

- [Node.js](https://nodejs.org/) (LTS version recommended)
- [MongoDB Community Server](https://www.mongodb.com/try/download/community) – for local database setup
- [VS Code](https://code.visualstudio.com/) – or any preferred code editor

---

## 🚀 How to Run This Project Locally

Follow these steps to set up and run the project on your local system:

### 📂 Step 1: Open the Project in VS Code

You can either open the folder manually or use the following command if VS Code is added to your system's PATH:

Step 2: Start the Frontend
Open a terminal in VS Code and run the following commands:


cd frontend
npm i (for first time only)
npm run dev

This will start the React frontend on http://localhost:5173 or http://localhost:3000.

🔧 Step 3: Start the Backend
Open a new terminal in VS Code (don’t close the frontend terminal), and run the following commands:

cd backend
npm i (for first time only)
npm start
If everything is working correctly, you should see console messages like:

Server is running...
MongoDB Connected...
This confirms that your backend server is working perfectly.
