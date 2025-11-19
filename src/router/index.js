
import Article from '@/pages/articles/Article.vue'
import User from '@/pages/users/User.vue'
import UserDetail from '@/pages/users/UserDetail.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
      {
        path: '/',
        name: 'User',
        component: User
      },
      {
        path: '/user-details/:id',
        name: 'UserDetail',
        component: UserDetail,
        props: true
      },
      {
        path: '/articles',
        name: 'Article',
        component: Article
      },
      {
        path: '/articles-details/:id',
        name: 'ArticleDetail',
        component: Article,
        props: true
      }

  ],
})

export default router
