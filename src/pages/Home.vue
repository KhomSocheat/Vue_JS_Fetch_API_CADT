<template>
  <main class="bg-gray-100">

    <div class="p-6 max-w-3xl mx-auto ">
      <div class="flex gap-4 mb-6">
        <button @click="page = 'users'" class="text-white bg-blue-500 p-2 px-4 rounded-md cursor-pointer">Users</button>
        <button @click="page = 'articles'"
          class="text-white bg-pink-500 p-2 px-4 rounded-md cursor-pointer">Article</button>
      </div>

      <!-- Page user form -->

      <!-- end editing user form -->


    </div>
  </main>
</template>

<script>
import axios from 'axios';
const API = "https://68648e915b5d8d03397d8138.mockapi.io/api/v1";
export default {
  data() {
    return {
      page: 'users',
      page: 'articles',

      //users data that will be fetched from API
      users: [],
      //end users data

      //create user form data
      formUser: { name: '', email: '', age: '', major: '', salary: '' },
      //end create user form data

      //editing user id
      editingUser: null,
      //end editing user id

      //edit form data
      editForm: {},
      //end edit form data

      //articles data
      articles: [],
      //end articles data

      loading: false,
      formArticle: { text: '', byUser: '' },
      editingArticle: null,
      editFormArticle: {},
    }
  },
  methods: {
    //fetch users
    async fetchUsers() {
      this.loading = true;
      try {
        const res = await axios.get(`${API}/users`);
        this.users = res.data;
      } catch {
        console.error(err);
      }
      this.loading = false;
    },
    //end fetch users




    //create user
    async createUser(){
      //create user
      await axios.post(`${API}/users`,this.formUser);
      //end create user

      //reset form
        this.formUser = { name: '', email: '', age: '', major: '', salary: '' };
      //end reset form

      //refresh user list
       this.fetchUsers();
      //end refresh user list
    },
    //end create user

    //edit user
    editUser(u){
      //set editing user id
      this.editingUser = u.id;
      //end set editing user id

      //populate edit form with user data
      this.editForm = { ...u };
      //end populate edit form with user data
    },
    //end edit user

    //update user
      async updateUser() {
      await axios.put(`${API}/users/${this.editingUser}`, this.editForm);
      this.editingUser = null;
      this.fetchUsers();
    },
    //end update user

    //delete user
    async deleteUser(id) {
      await axios.delete(`${API}/users/${id}`);
      this.fetchUsers();
    },
    //end delete user

       getUserName(userId) {
      const user = this.users.find(u => u.id === userId);
      return user ? user.name : 'Unknown User';
    },

   

  },

  mounted() {
    this.fetchUsers();
    this.fetchArticle();
  }

}
</script>
