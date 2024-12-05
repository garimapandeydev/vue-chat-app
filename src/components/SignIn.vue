<template>
  <div>
    <h2>Sign In</h2>
    <form @submit.prevent="signIn">
      <div>
        <input
          type="email"
          v-model="email"
          placeholder="Enter your email"
          required
        />
      </div>
      <div>
        <input
          type="password"
          v-model="password"
          placeholder="Enter your password"
          required
        />
      </div>
      <div>
        <button type="submit">Sign In</button>
      </div>
    </form>
    <p v-if="errorMessage" style="color: red;">{{ errorMessage }}</p>
    <p>Don't have an account? <router-link to="/signup">Sign Up</router-link></p>
    <p><router-link to="/ForgotPassword">Forgot your password?</router-link></p> <!-- Link to ForgotPassword page -->

  </div>
</template>

<script>
import { auth } from '../firebase'; // Import the Firebase authentication instance
import { signInWithEmailAndPassword } from "firebase/auth"; // Import Firebase method for sign in

export default {
  data() {
    return {
      email: '',
      password: '',
      errorMessage: ''
    };
  },
  methods: {
    async signIn() {
      try {
        await signInWithEmailAndPassword(auth, this.email, this.password);
        
        this.$router.push('/');       } catch (error) {
        this.errorMessage = error.message; 
      }
    }
  }
};
</script>

<style scoped>

form {
  max-width: 400px;
  margin: 0 auto;
}

input {
  width: 100%;
  padding: 10px;
  margin: 5px 0;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
}

button:hover {
  background-color: #45a049;
}

p {
  text-align: center;
}

a {
  text-decoration: none;
  color: #4CAF50;
}
</style>
