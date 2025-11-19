<script >
</script>

<template>
    <div class="p-6 max-w-4xl mx-auto">
        <div class="flex gap-4 mb-2">
          <router-link to="/" class="text-white bg-blue-500 p-2 px-4 rounded-md cursor-pointer">Users</router-link>
          <router-link :to="{ name: 'Article' }" class="text-white bg-pink-500 p-2 px-4 rounded-md cursor-pointer">Article</router-link>
      </div>
    </div>
</template>
