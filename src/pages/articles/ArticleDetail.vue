<template>
    <main class="p-6 max-w-3xl mx-auto bg-gray-100 min-h-screen">
      <button @click="$router.push('/articles')" class="mb-4 px-4 py-2 bg-gray-500 text-white rounded">
        ← Back to Articles
      </button>

      <div v-if="loading" class="text-gray-600">Loading article details...</div>

      <div v-else-if="error" class="text-red-600">{{ error }}</div>

      <div v-else-if="article" class="bg-white p-6 rounded shadow">
        <h1 class="text-3xl font-bold mb-4">Article Details</h1>

        <div class="space-y-4">
          <div>
            <span class="font-semibold">Article ID:</span>
            <span class="ml-2">{{ article.id }}</span>
          </div>

          <div>
            <span class="font-semibold">Content:</span>
            <p class="ml-2 mt-2 whitespace-pre-line text-gray-700">{{ article.text }}</p>
          </div>

          <div>
            <span class="font-semibold">Written By:</span>
            <span class="ml-2">{{ getUserName(article.byUser) }}</span>
          </div>

          <div>
            <span class="font-semibold">Author ID:</span>
            <span class="ml-2">{{ article.byUser }}</span>
          </div>

          <div v-if="article.createdAt">
            <span class="font-semibold">Created At:</span>
            <span class="ml-2">{{ new Date(article.createdAt).toLocaleString() }}</span>
          </div>
        </div>

        <div class="mt-6 flex gap-3">
          <button @click="$router.push('/articles')" class="px-4 py-2 bg-blue-600 text-white rounded">
            View All Articles
          </button>
          <button @click="viewAuthor" class="px-4 py-2 bg-purple-600 text-white rounded">
            View Author Profile
          </button>
        </div>
      </div>
    </main>
</template>

<script>
import axios from 'axios';

const API = "https://68648e915b5d8d03397d8138.mockapi.io/api/v1";

export default {
  name: 'ArticleDetail',
  props: ['id'],

  data() {
    return {
      article: null,
      users: [],
      loading: false,
      error: null
    }
  },

  methods: {
    async fetchArticleDetail() {
      this.loading = true;
      this.error = null;

      try {
        const response = await axios.get(`${API}/articles/${this.id}`);
        this.article = response.data;
      } catch (err) {
        console.error('Error fetching article:', err);
        this.error = 'Failed to load article details. Article may not exist.';
      } finally {
        this.loading = false;
      }
    },

    async fetchUsers() {
      try {
        const response = await axios.get(`${API}/users`);
        this.users = response.data;
      } catch (err) {
        console.error('Error fetching users:', err);
      }
    },

    getUserName(userId) {
      const user = this.users.find(u => u.id === userId);
      return user ? user.name : 'Unknown User';
    },

    viewAuthor() {
      if (this.article && this.article.byUser) {
        this.$router.push({ name: 'UserDetail', params: { id: this.article.byUser } });
      }
    }
  },

  async mounted() {
    await this.fetchUsers();
    await this.fetchArticleDetail();
  },


}
</script>
