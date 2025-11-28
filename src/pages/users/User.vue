<template>
    <div>
      <div class="max-w-4xl mx-auto p-6">
           <h1 class="font-bold text-4xl mb-5">User Management</h1>

        <div class="bg-white p-4 rounded shadow mb-6">
          <h2 class="font-semibold mb-2">Create User</h2>

          <!-- save user form -->
           <div>
             <div class="grid grid-cols-2 gap-4">
               <!-- create user form and bind to formUser object -->
               <input v-model="formUser.name" placeholder="Name" class="p-2 border rounded" />
               <input v-model="formUser.email" placeholder="Email" class="p-2 border rounded" />
               <input v-model="formUser.age" type="number" placeholder="Age" class="p-2 border rounded" />
               <input v-model="formUser.major" placeholder="Major" class="p-2 border rounded" />
               <input v-model="formUser.salary" placeholder="Salary" class="p-2 border rounded" />
             </div>
             <button @click="createUser" class="mt-3 px-4 py-2 bg-blue-600 text-white rounded">Create</button>
           </div>
           </div>
        <!-- end save user form -->
        <h1 class="text-2xl font-bold mb-4 ">User Info</h1>
        <div v-if="loading" class="text-gray-400">Loading...</div>

        <!-- user list -->
        <div class="grid gap-4">

          <div  v-for="u in users" :key="u.id" class="p-4 bg-white shadow rounded">
                  <p><strong>Name: </strong> {{ u.name }}</p>
                  <p><strong>Email: </strong> {{ u.email }}</p>
                  <p><strong>Age:</strong> {{ u.age }}</p>
                  <p><strong>Major:</strong> {{ u.major }}</p>
                  <p><strong>Salary:</strong> ${{ u.salary }}</p>
                  <div class="gap-2 flex">
                    <button @click="navigateToUser(u.id)" class="mt-3 px-4 py-2 bg-green-600 text-white rounded">View</button>
                    <button @click="editUser(u)" class="mt-3 px-4 py-2 bg-green-600 text-white rounded">Edit</button>
                    <button @click="deleteUser(u.id)" class="mt-3 px-4 py-2 bg-red-600 text-white rounded">Delete</button>
                  </div>
           </div>
        </div>
        <!-- end user list -->
      </div>


      <!-- this is editing user form -->
       <div v-if="editingUser" class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
        <div class="bg-white p-6 rounded shadow max-w-md w-full">
          <h2 class="font-bold mb-3">Update User</h2>

          <input v-model="editForm.name" placeholder="Name" class="p-2 border rounded w-full mb-2" />
          <input v-model="editForm.email" placeholder="Email" class="p-2 border rounded w-full mb-2" />
          <input v-model="editForm.age" type="number" placeholder="Age" class="p-2 border rounded w-full mb-2" />
          <input v-model="editForm.major" placeholder="Major" class="p-2 border rounded w-full mb-2" />
          <input v-model="editForm.salary" placeholder="Salary" class="p-2 border rounded w-full mb-2" />

          <div class="flex gap-2 mt-3">
            <button @click.prevent="updateUser" class="px-4 py-2 bg-green-600 text-white rounded">Save</button>
            <button @click.prevent="editingUser=null" class="px-4 py-2 bg-gray-400 text-white rounded">Cancel</button>
          </div>
        </div>
      </div>
    </div>
</template>
<script setup>
import axios from 'axios';
import { useUsersStore } from '@/Store/usersStore';

import { useRouter } from 'vue-router';
import { ref,onMounted } from 'vue';
import { storeToRefs } from 'pinia';
const API = "https://68648e915b5d8d03397d8138.mockapi.io/api/v1";
// const loading = ref(false);
const editingUser = ref(null);
const formUser = ref({ name: '', email: '', age: '', major: '', salary: '' });
const editForm = ref({});
const router = useRouter();


const usersStore = useUsersStore();
const {fetchUsers} = usersStore;
const {getLoading : loading ,getUsers: users} = storeToRefs(usersStore);

const navigateToUser = (id) => {
    router.push(`/users/${id}`)
}
const createUser = async () =>{
  await axios.post(`${API}/users`,formUser.value);
  formUser.value = { name: '', email: '', age: '', major: '', salary: '' };
}
const editUser = (u) =>{
  editingUser.value = u.id;
  editForm.value = { ...u };
}
const updateUser = async () =>{
  await axios.put(`${API}/users/${editingUser.value}`,editForm.value);
  editingUser.value = null;
  await fetchUsers();
}

const deleteUser = async (id) =>{
  await axios.delete(`${API}/users/${id}`);
  await fetchUsers();
}
onMounted( async() =>{
  await fetchUsers();
});

// export default {
//   data() {
//     return {

//       //users data that will be fetched from API

//       //end users data

//       //create user form data
//       formUser: { name: '', email: '', age: '', major: '', salary: '' },
//       //end create user form data

//       //editing user id
//       editingUser: null,
//       //end editing user id

//       //edit form data
//       editForm: {},
//       //end edit form data

//       //articles data
//       articles: [],
//       //end articles data

//       loading: false,
//       formArticle: { text: '', byUser: '' },
//       editingArticle: null,
//       editFormArticle: {},
//     }
//   },
//   computed:{
//     ...mapState(useUsersStore,{users: 'getUsers',loading: 'isLoading'})
//   },
//   methods: {
//     //fetch users
//     ...mapActions(useUsersStore,['fetchUsers']),
//     // async fetchUsers() {
//     //   this.loading = true;
//     //   try {
//     //     const res = await axios.get(`${API}/users`);
//     //     this.users = res.data;
//     //   } catch {
//     //     console.error(err);
//     //   }
//     //   this.loading = false;
//     // },
//     //end fetch users
//     //create user
//     async createUser(){
//       //create user
//       await axios.post(`${API}/users`,this.formUser);
//       //end create user

//       //reset form
//         this.formUser = { name: '', email: '', age: '', major: '', salary: '' };
//       //end reset form

//       //refresh user list
//        this.fetchUsers();
//       //end refresh user list
//     },
//     //end create user

//     //edit user
//     editUser(u){
//       //set editing user id
//       this.editingUser = u.id;
//       //end set editing user id

//       //populate edit form with user data
//       this.editForm = { ...u };
//       //end populate edit form with user data
//     },
//     //end edit user

//     //update user
//       async updateUser() {
//       await axios.put(`${API}/users/${this.editingUser}`, this.editForm);
//       this.editingUser = null;
//       this.fetchUsers();
//     },
//     //end update user

//     //delete user
//     async deleteUser(id) {
//       await axios.delete(`${API}/users/${id}`);
//       this.fetchUsers();
//     },
//     //end delete user

//     //navigate to user detail page
//     navigateToUser(id) {
//       this.$router.push({ name: 'UserDetail', params: { id: id } });
//     },
//     //end navigate to user detail page
//   },
//   mounted() {
//     //fetch users when component is mounted
//     this.fetchUsers();
//   }
// }


</script>
