import { createRouter, createWebHistory } from 'vue-router'
import Todo from './Todo'
import About from './About'

export default createRouter({
  history: createWebHistory(),
  scrollBehavior: () => ({ top: 0 }),
  routes: [
    {
      name: 'todo',
      path: '/',
      component: Todo,
    },
    {
      path: '/about',
      component: About
    },
  ]
})
