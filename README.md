# Remedium Health Market

Remedium Health Market is a healthcare marketplace prototype developed as the Penn State IST 440W Capstone Project.

The application provides a centralized platform where patients can:

- Compare estimated treatment prices
- Browse healthcare providers
- Schedule appointments
- Manage patient profiles
- Upload and verify medical records
- View healthcare information through a personalized dashboard

The project was built using **React**, **Firebase Authentication**, and **Cloud Firestore** to demonstrate a modern, secure healthcare web application.

---

## Technologies

- React
- Vite
- JavaScript
- Firebase Authentication
- Cloud Firestore
- React Router
- HTML/CSS

---

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/discountcheese18/Project-1-440w.git
```

### 2. Navigate into the project

```bash
cd Project-1-440w
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure Firebase

Create a `.env` file in the project root and add your Firebase configuration values:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

---

## Run the Project

Start the development server:

```bash
npm run dev
```

Open your browser and navigate to the local URL displayed in the terminal (typically `http://localhost:5173`).

---

## Features

- Secure user authentication
- Patient dashboard
- Healthcare provider search
- Treatment price comparison
- Appointment scheduling
- Patient profile management
- Medical record verification (SHA-256 demo)

---

## Author

**Robert Bleecker**

Penn State University

IST 440W Senior Capstone Project
