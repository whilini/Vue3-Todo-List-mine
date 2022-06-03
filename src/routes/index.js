import { createRouter, createWebHistory } from 'vue-router'
import Home from './Home'
import About from './About'
import TodoListAll from './TodoListAll'

export default createRouter({
  history: createWebHistory(),
  scrollBehavior: () => ({ top: 0 }),
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/listall',
      component: TodoListAll
    },
    {
      path: '/about',
      component: About
    },
  ]
})
