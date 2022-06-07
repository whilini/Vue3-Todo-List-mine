import axios from 'axios'

const apikey = process.env.VUE_APP_APIKEY

const END_POINT = 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos'
const headers = {
  'Content-Type': 'application/json',
  apikey: apikey,
  username: 'KDT2_KimHwiLin'
}

export default {
  namespaced: true,

  state: () =>  {
    return {
      todos: [],
      order: 0,
      title: []
    }
  },
  mutations: {
    setTodos(state, payload) {
      state.todos = payload
    },
    deleteTodo(state, payload) {
      const idx = state.todos.findIndex(todo => todo.id === payload)
      state.todos.splice(idx, 1)
    },
    changeOrderTodos(state, payload) {
      state.todos = payload
    },
    createTodo(state, payload) {
      state.todos.push(payload)
    }
  },
  actions: {
    async readTodos({ commit }) {
      const res = await axios({
        url: END_POINT,
        method: 'GET',
        headers: headers
      })
      commit('setTodos', res.data)
    },
    async createTodo({ commit }, { title }) {
      console.log(title)
      const res = await axios({
        url: END_POINT,
        method: 'POST',
        headers: headers,
        data: {
          title: title
        }
      })
      commit('createTodo', res.data)
    },
    async changeOrderTodos(context, todoIds) {
      await axios({
        url: END_POINT + '/reorder',
        method: 'PUT',
        headers: headers,
        data: todoIds
      })
    },
    async deleteTodo(context, {id}) {
      await axios({
        url: END_POINT + '/' + id,
        method: 'DELETE',
        headers: headers
      })
      context.commit('deleteTodo', id)
    }
  }
}
