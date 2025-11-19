<template>
    <main class=" max-w-4xl mx-auto  rounded shadow mb-6">
      <!-- Back button to return to home page -->
      <button @click="$router.push('/')" class="mb-5 px-4 py-2 bg-gray-500 text-white rounded">
        ← Back to Home
      </button>

      <!-- Show loading state while fetching data -->
      <div v-if="loading" class="text-gray-600">Loading user details...</div>

      <!-- Show error if user not found -->
      <div v-else-if="error" class="text-red-600">{{ error }}</div>

      <!-- Display user details when loaded -->
      <div v-else-if="user" class="bg-white p-6 rounded shadow">
        <h1 class="text-3xl font-bold mb-4">{{ user.name }}</h1>

        <div class="space-y-3">
          <div>
            <span class="font-semibold">Email:</span>
            <span class="ml-2">{{ user.email }}</span>
          </div>

          <div>
            <span class="font-semibold">Salary:</span>
            <span class="ml-2">{{ user.salary }} $</span>
          </div>

          <div>
            <span class="font-semibold">Major:</span>
            <span class="ml-2">{{ user.major }}</span>
          </div>

          <div>
            <span class="font-semibold">User ID:</span>
            <span class="ml-2">{{ user.id }}</span>
          </div>
        </div>

        <!-- Optional: Show user's avatar if available -->

      </div>
    </main>
</template>

<script>
import axios from 'axios';

// API base URL - same as your Home.vue
const API = "https://68648e915b5d8d03397d8138.mockapi.io/api/v1";

export default {
  name: 'UserDetail',
  // Receive the user ID from route params
  props: ['id'],

  data() {
    return {
      user: null,      // Store the user data
      loading: false,  // Loading state
      error: null      // Error message
    }
  },

  methods: {
    // Fetch user details by ID from the API
    async fetchUserDetail() {
      this.loading = true;
      this.error = null;

      try {
        // Make API call to get specific user by ID
        const response = await axios.get(`${API}/users/${this.id}`);
        this.user = response.data;
      } catch (err) {
        // Handle errors (user not found, network error, etc.)
        console.error('Error fetching user:', err);
        this.error = 'Failed to load user details. User may not exist.';
      } finally {
        this.loading = false;
      }
    }
  },

  // Fetch user data when component is mounted
  mounted() {
    this.fetchUserDetail();
  }
}
</script>
