import axios from 'axios'

const VUE_APP_APIKEY = process.env.VUE_APP_APIKEY

const END_POINT = 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos'
const headers = {
  'Content-Type': 'application/json',
  apikey: VUE_APP_APIKEY,
  username: 'KDT2_KimHwiLin'
}

export default {
  namespaced: true,

  state: () =>  {
    return {
      todos: [],
      order: 0,
      title: [],
      loading: false,
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
    updateType(state, payload) {
      state.type = payload;
    },
    loading(state, payload) {
      state.loading = payload
    }
  },
  actions: {
    async readTodos({ state, commit }) {
      if (state.loading) return
      
      try {
        commit('loading', true)
        
        const res = await axios({
          url: END_POINT,
          method: 'GET',
          headers: headers
        })
        commit('readTodos', res.data)
      } catch(err) {
        alert(err)
      } finally {
        commit('loading', false)
      }
    },
    async createTodo({ commit }, { title }) {
      try {
        const res = await axios({
          url: END_POINT,
          method: 'POST',
          headers: headers,
          data: {
            title: title
          }
        })
        commit('createTodo', res.data)
      } catch(err) {
        alert(err)
      }
    },
    async updateTodo({ commit }, {id, title, done, order = 0}) {
      try {
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
      } catch(err) {
        alert(err)
      }
    },
    async deleteTodo({ commit }, { id }) {
      try {
        await axios({
          url: END_POINT + '/' + id,
          method: 'DELETE',
          headers: headers
        })
        commit('deleteTodo', id)
      } catch(err) {
        alert(err)
      }
    },
    deleteAll({ dispatch }, ids) {
      try {
        ids.map(todo =>{
          const id = todo.id
          dispatch('deleteTodo', { id })
        })
      } catch{
        console.log('failed')
      }
    },
    updateType({ commit }, type) {
      commit('updateType', type)
    },
  }
}
