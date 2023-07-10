import { createStore } from 'vuex'

// Create a new store instance.
const store = createStore({
  state () {
    return {
      user: null,
      authorized: false
    }
  },
  mutations: {
    setUser (state, payload) {
      console.log('heree!!', payload)
      state.user = payload
    },
    setAuthorized (state, payload) {
      state.authorized = payload
    }
  },
  getters: {
    userRole: (state) => state.user?.role,
    getUser: (state) => state.user
  }
})

export default store