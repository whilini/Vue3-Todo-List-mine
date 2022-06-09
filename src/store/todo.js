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
      title: [],
      type: 'all',
    }
  },
  mutations: {
    readTodos(state, payload) {
      state.todos = payload
    },
    createTodo(state, payload) {
      state.todos.unshift(payload)
    },
    updateTodo(state, payload) {
      const idx = state.todos.findIndex(todo => todo.id === payload.id)
      state.todos.splice(idx, 1, payload)
    },
    deleteTodo(state, payload) {
      const idx = state.todos.findIndex(todo => todo.id === payload)
      state.todos.splice(idx, 1)
    },
    filterTodos(state, payload) {
      state.todos = state.todos.filter(todo => {
        todo.done === payload
      })
    },
    updateType(state, payload) {
      state.type = payload;
    }
  },
  actions: {
    async readTodos({ commit }) {
      const res = await axios({
        url: END_POINT,
        method: 'GET',
        headers: headers
      })
      commit('readTodos', res.data)
    },
    async createTodo({ commit }, { title }) {
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
    async updateTodo({ commit }, {id, title, done, order = 0}) {
      const res = await axios({
        url: END_POINT + '/' + id,
        method: 'PUT',
        headers: headers,
        data: {
          title: title,
          done: done,
          order: order
        }
      })
      commit('updateTodo', res.data)
    },
    async deleteTodo(context, {id}) {
      await axios({
        url: END_POINT + '/' + id,
        method: 'DELETE',
        headers: headers
      })
      context.commit('deleteTodo', id)
    },
    async filterTodos({ commit, dispatch }, { boolean }) {
      await dispatch('readTodos')
      commit('readTodos', boolean)
    },
    updateType({commit}, type) {
      commit('updateType', type)
    }
  }
}
