<template>
  <div class="p-4 bg-[#282828] rounded-lg max-w-md mx-auto">
    <h2 class="text-2xl font-bold text-white mb-4">Login</h2>
    <form @submit.prevent="handleLogin">
      <div class="mb-4">
        <label for="username" class="block text-sm font-medium text-gray-300 mb-1">Username:</label>
        <input type="text" 
            v-model="credentials.username"
            required
            class="w-full px-3 py-2 bg-[#3E3D3D] text-white rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Username">
      </div>
      <div class="mb-4">
        <label for="password" class="block text-sm font-medium text-gray-300 mb-1">Password:</label>
        <input type="password" 
            v-model="credentials.password" 
            required
            class="w-full px-3 py-2 bg-[#3E3D3D] text-white rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Password">
      </div>
      <div class="mb-4">
        <button type="submit"
        class="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
      >
        Login
      </button>
      </div>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </form>
    <div class="mt-4">
      <p class="text-gray-300">Don't have an account?</p>
      <router-link to="/register">
        <button class="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
          Register
        </button>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { authService } from '../services/authService';

const credentials = ref({
  username: '',
  password: ''
});
const errorMessage = ref('');
const router = useRouter();

const handleLogin = async () => {
  errorMessage.value = '';
  try {
    const res = await authService.login(credentials.value);
    router.push({name: 'Home'});
  } catch (error) {
    errorMessage.value = 'Login failed!';
  }
};
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.error {
  color: red;
  font-size: 0.9em;
}
</style>
