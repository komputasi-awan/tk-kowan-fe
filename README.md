# 🚀 CV Scorer Frontend
This is the client-side application built with Next.js (Client Components) designed to provide users with an interface to analyze their resume (CV) against job descriptions using AI. This application was built for a Cloud Computing Group Assignment.

## ✨ Key Features
* **Service Layer Architecture:** Business Logic (Authentication, API Calls) is strictly separated from UI Logic (Components) for improved maintainability and testability.
* **Secure Authentication:** Utilizes Firebase Authentication (Email/Password & Google OAuth) for robust user session management.
* **AI-Powered Analysis:** Sends CV PDF files and job descriptions to the dedicated FastAPI backend service for AI matching.
* **User Experience:** Modern, *responsive*, and engaging user interface built with Tailwind CSS.
* **Auth Guards:** Implements redirect logic to secure the main application route (`/dashboard`) and prevent authenticated users from accessing public authentication pages (`/login`, `/register`).

## 🛠️ Tech Stack
* **Framework:** Next.js (App Router, Client Components)
* **Language:** TypeScript
* **Styling:** Tailwind CSS
* **Authentication:** Firebase Authentication
* **API Client:** Axios
* **Backend:** [https://github.com/komputasi-awan/tk-kowan/blob/main/app/routers/cv.py] (FastAPI, Python, Gemini API)

## ⚙️ Setup & Installation
### 1. Cloning the Repository
```bash
git clone https://github.com/anjanianadya/tk-kowan-fe

```

### 2. Installing Dependencies
```bash
npm install 
# or yarn install / pnpm install

```

### 3. Environment Variables Configuration
You must create a `.env.local` file in the project root folder and populate it with the necessary configuration details for Firebase and the Backend API URL. Contact us for the file content.

### 4. Running the Development ServerExecute the following command to start the server:

```bash
npm run dev

```

Open [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) in your browser to view the application.

## 📚 Learn MoreTo learn more about Next.js and the technologies used:

* [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API.
* [Tailwind CSS Docs](https://tailwindcss.com/docs) - Reference for utility-first CSS.