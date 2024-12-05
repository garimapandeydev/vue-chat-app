<template>
  <div>
    <div class="view login" v-if="!user">
      <div class="login-form">
        <h1 class="login-title">Welcome to FireChat</h1>
        <div v-if="isSignUpForm" class="form-section">
          <h2 class="form-header">Sign Up</h2>
          <form @submit.prevent="signUp" class="auth-form">
            <input v-model="email" class="input-field" placeholder="Enter your email" type="email" required />
            <input v-model="password" class="input-field" placeholder="Enter your password" type="password" required />
            <button type="submit" class="submit-btn">Sign Up</button>
          </form>
          <p class="toggle-form-text">Already have an account? <button @click="toggleForm" class="toggle-form-btn">Sign In</button></p>
        </div>
        
        <div v-if="!isSignUpForm" class="form-section">
          <h2 class="form-header">Sign In</h2>
          <form @submit.prevent="signIn" class="auth-form">
            <input v-model="email" class="input-field" placeholder="Enter your email" type="email" required />
            <section />
            <input v-model="password" class="input-field" placeholder="Enter your password" type="password" required />
            <section/>
            <button type="submit" class="submit-btn">Sign In</button>
          </form>
          <p class="toggle-form-text">Don't have an account? <button @click="toggleForm" class="toggle-form-btn">Sign Up</button></p>
          <p><button @click="forgotPassword" class="forgot-password-btn">Forgot Password?</button></p>
        </div>

        <button @click="googleSignIn" class="google-login-btn">Sign In with Google</button>
      </div>
    </div>
    
    <div v-else class="chat-view">
      <header class="chat-header">
        <h2>Welcome, {{ user.displayName }}</h2>
        <button @click="logout" class="logout-btn">Logout</button>
      </header>

      <section class="chat-box">
        <div v-for="message in messages" :key="message.key" class="message">
          <div class="message-content">{{ message.username }}: {{ message.content }}</div>
        </div>
      </section>

      <footer class="chat-footer">
        <input v-model="message" placeholder="Type a message..." @keyup.enter="sendMessage" class="message-input" />
        <button @click="sendMessage" class="send-btn">Send</button>
      </footer>
    </div>
  </div>
</template>

<script>
import { db, auth, googleProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signOut, push, ref as firebaseRef, onValue } from "./db";

export default {
  data() {
    return {
      email: "",
      password: "",
      message: "",
      user: null,
      messages: [],
      isSignUpForm: false,
    };
  },
  methods: {
    toggleForm() {
      this.isSignUpForm = !this.isSignUpForm;
    },

    async signUp() {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, this.email, this.password);
        this.user = userCredential.user;
        this.email = "";
        this.password = "";
      } catch (error) {
        console.error("Sign Up Error: ", error.message);
      }
    },

    async signIn() {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, this.email, this.password);
        this.user = userCredential.user;
        this.email = "";
        this.password = "";
      } catch (error) {
        console.error("Sign In Error: ", error.message);
      }
    },

    forgotPassword() {
      sendPasswordResetEmail(auth, this.email)
        .then(() => {
          alert("Password reset email sent!");
        })
        .catch((error) => {
          console.error("Reset Error: ", error.message);
        });
    },

    async googleSignIn() {
      try {
        const result = await signInWithPopup(auth, googleProvider);
        this.user = result.user;
      } catch (error) {
        console.error("Google Sign-In Error: ", error.message);
      }
    },

    logout() {
      signOut(auth)
        .then(() => {
          this.user = null;
        })
        .catch((error) => {
          console.error("Logout Error: ", error.message);
        });
    },

    sendMessage() {
      if (this.message.trim()) {
        push(firebaseRef(db, "messages"), {
          username: this.user.displayName || this.user.email,
          content: this.message,
        });
        this.message = "";
      }
    },
  },
  mounted() {
    const messagesRef = firebaseRef(db, "messages");
    onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      const loadedMessages = [];
      if (data) {
        Object.keys(data).forEach((key) => {
          loadedMessages.push({
            key,
            username: data[key].username,
            content: data[key].content,
          });
        });
      }
      this.messages = loadedMessages;
    });

    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        this.user = currentUser;
      } else {
        this.user = null;
      }
    });
  },
};
</script>

<style lang="scss">
* {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.view {
  display: flex;
  justify-content: center;
  min-height: 100vh;
  flex-direction: column;
  background-color: #ea526f;

  &.login {
    align-items: center;
  }

  &.chat {
    background-color: #fafafa;
    max-width: 900px;
    margin: 0 auto;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    flex-direction: column;
  }
}

h1, h2 {
  color: #fff;
}

h1.login-title {
  text-align: center;
  margin-bottom: 20px;
}

h2.form-header {
  margin-bottom: 15px;
  font-size: 24px;
}

.form-section {
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  margin-bottom: 20px;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}


.input-field {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  color: #333;
  background-color: #f9f9f9;
}

.input-field:focus {
  border-color: #ea526f;
  outline: none;
}

.submit-btn {
  padding: 10px;
  background-color: #ea526f;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-btn:hover {
  background-color: #f76c8f;
}

.toggle-form-text {
    text-align: center;
    color: #350c0c;
    border:none;
}
.forgot-password-btn {
    text-align: center;
    color: #fb1b1b;
    border: none;
    background-color: white;
    padding-top: 10px;
}

.toggle-form-btn {
  background-color: transparent;
  border: none;
  color: #ea526f;
  cursor: pointer;
  text-decoration: underline;
}

.google-login-btn {
  background-color: #4285f4;
  color: white;
  font-size: 16px;
  font-weight: 600;
  padding: 10px 20px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  width: 100%;
  transition: background-color 0.3s;
}

.google-login-btn:hover {
  background-color: #357ae8;
}

.chat-view {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
}

.chat-header {
  background-color: #ea526f;
  color: #fff;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logout-btn {
  background-color: transparent;
  border: none;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: color 0.3s;
}

.logout-btn:hover {
  color: #f76c8f;
}

.chat-box {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  background-color: #fff;
  border-top: 1px solid #f1f1f1;
  max-height: 500px;
}

.message {
  display: flex;
  margin-bottom: 15px;
}

.message-content {
  max-width: 80%;
  background-color: #f3f3f3;
  padding: 12px 18px;
  border-radius: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  color: #333;
}

.chat-footer {
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);
  position: sticky;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.message-input {
  flex: 1;
  padding: 10px 15px;
  border: 1px solid #ddd;
  border-radius: 8px 0 0 8px;
  font-size: 16px;
  color: #333;
  background-color: #f9f9f9;
  outline: none;
}

.message-input:focus {
  border-color: #ea526f;
}

.send-btn {
  padding: 10px 15px;
  background-color: #ea526f;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 0 8px 8px 0;
  cursor: pointer;
  transition: background-color 0.3s;
}

.send-btn:hover {
  background-color: #f76c8f;
}

@media (max-width: 768px) {
  .view.chat {
    max-width: 100%;
    margin: 0;
  }

  .chat-header h2 {
    font-size: 20px;
  }

  .message-input {
    font-size: 14px;
  }

  .send-btn {
    font-size: 14px;
  }

  .input-field, .message-input {
    font-size: 14px;
  }
}
</style>
