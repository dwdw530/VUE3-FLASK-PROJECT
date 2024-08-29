import { createStore } from 'vuex'

const store = createStore({
  state: {
    user: null,
    token: localStorage.getItem('token') || ''
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    setToken(state, token) {
      state.token = token
      localStorage.setItem('token', token)
    },
    logout(state) {
      state.user = null
      state.token = ''
      localStorage.removeItem('token')
    }
  },
  actions: {
    async login({ commit }, credentials) {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      })
      const data = await response.json()
      if (response.ok) {
        commit('setToken', data.token)
        commit('setUser', data.user)
      } else {
        throw new Error(data.message)
      }
    },
    async register({ commit }, userInfo) {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userInfo)
      })
      const data = await response.json()
      if (response.ok) {
        commit('setToken', data.token)
        commit('setUser', data.user)
      } else {
        throw new Error(data.message)
      }
    },
    async fetchOrderList({ state }, reqData) {
      const response = await fetch('http://localhost:5000/tb_items/queryPage', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${state.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reqData)
      })
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.message)
      }
      return data.tb_items
    }
  },
  getters: {
    isAuthenticated: state => !!state.token,
    getUser: state => state.user
  }
})

export default store
