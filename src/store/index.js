import { createStore } from 'vuex'
import about from './about'
import todo from './todo'

export default createStore({
  modules: {
    about: about,
    todo: todo
  }
})
