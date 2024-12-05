# FireChat Vue.js App

FireChat is a real-time chat application built with Vue.js and Firebase. Users can sign up, sign in, send messages, and communicate in real-time. It supports Google sign-in and has a user-friendly interface for managing authentication and messaging.

## Features

- **User Authentication**: 
  - Sign up and sign in with email/password.
  - Google sign-in for quick authentication.
  - Password reset functionality.
  
- **Real-time Messaging**:
  - Send and receive messages instantly.
  - Display messages with usernames.
  
- **Responsive Design**:
  - Fully responsive design for mobile and desktop views.
  
## Technology Stack

- **Frontend**: Vue.js
- **Backend**: Firebase (Authentication, Firestore, Realtime Database)
- **Styling**: SCSS, BEM (Block, Element, Modifier)

## Installation

### Prerequisites
Before running this app, make sure you have the following installed:

- Node.js
- Vue CLI
- Firebase account

### Steps

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/firechat.git
   cd firechat
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up Firebase:**

   - Go to [Firebase Console](https://console.firebase.google.com/), create a new Firebase project.
   - Enable Firebase Authentication (Email/Password and Google Sign-In).
   - Set up Firebase Realtime Database or Firestore.
   - Replace the Firebase configuration in the `db.js` file with your Firebase project's credentials.

4. **Run the app:**

   ```bash
   npm run serve
   ```

   The app should now be running at `http://localhost:8080`.

## File Structure

```
├── src/
│   ├── assets/                # Static assets (images, icons, etc.)
│   ├── components/            # Reusable Vue components
│   ├── views/                 # Vue views (Login, Chat)
│   ├── db.js                  # Firebase initialization and utility functions
│   ├── App.vue                # Main Vue component
│   ├── main.js                # Entry point of the application
├── public/                    # Public folder for static files
├── package.json               # Project dependencies and configuration
└── README.md                  # Project documentation
```

## Usage

- **Sign Up**: Create a new account by entering an email and password. Click the "Sign Up" button to register.
- **Sign In**: Use your email and password to log in. If you don't have an account, use the "Sign Up" link.
- **Google Sign-In**: Log in quickly using your Google account with the "Sign In with Google" button.
- **Forgot Password**: If you've forgotten your password, use the "Forgot Password?" link to reset it.
- **Send Messages**: Once logged in, you can send messages by typing in the input box at the bottom and hitting Enter or clicking the "Send" button.
- **Logout**: Click the "Logout" button in the chat header to sign out of the app.

## Components

- **Login Form**: Contains the authentication form (Sign In / Sign Up) with input fields for email and password.
- **Chat View**: The main interface for sending and receiving messages. Displays a list of messages and includes an input field for new messages.
- **Header**: Shows the logged-in user's display name and a logout button.
- **Message Display**: A list of messages that updates in real-time.

## Firebase Setup

### Firebase Authentication
To enable Firebase authentication:
1. Go to Firebase Console > Authentication > Sign-In Method.
2. Enable Email/Password and Google as authentication methods.

### Firebase Database
You can use either Firestore or Firebase Realtime Database for storing messages:
1. Go to Firebase Console > Database > Realtime Database or Firestore.
2. Set up rules and ensure that the database is accessible to authenticated users.

## Known Issues

- If messages are not loading instantly, try refreshing the page or checking Firebase rules.

## Future Improvements

- Implement message deletion and editing features.
- Add support for direct messaging between users.
- Introduce message notification functionality.

