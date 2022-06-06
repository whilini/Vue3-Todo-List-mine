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
      todoDate: [],
      todos: []
    }
  },
  mutations: {
    setTodos(state, payload) {
      console.log(payload)
    }
  },
  actions: {
    async readTodos({ commit }) {
      const res = await axios({
        url: END_POINT,
        method: 'GET',
        headers: headers
      })
      console.log(res)
      commit('setTodos', res.data)
    },
    async createTodo(context, {done, order, title}) {
      await axios({
        url: END_POINT,
        method: 'POST',
        headers: headers,
        data: {
          done: done,
          order: order,
          title: title,
        }
      })
    }
  }
}
