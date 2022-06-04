import { createRouter, createWebHistory } from 'vue-router'
import Todo from './Todo'
import About from './About'
import TodoListAll from './TodoListAll'

export default createRouter({
  history: createWebHistory(),
  scrollBehavior: () => ({ top: 0 }),
  routes: [
    {
      path: '/',
      component: Todo
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
