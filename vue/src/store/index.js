import { createStore } from "vuex";

const store = createStore({
  state: {
    user: {
      data: {
        //name: 'Tom Cook',
        //email: 'tom@example.com',
        //imageUrl:
        //  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      token: sessionStorage.getItem('TOKEN'),
    }
  },
  getters: {
    users(state) {
      return state.user.data;
    },
  },
  actions: {
    register({ commit }, user) {
      return fetch(`http://localhost:3000/register`, {
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        method: "POST",
        body: JSON.stringify(user),
      })
        .then((res) => res.json())
        .then((res) => {
          commit('setUser', res);
          return res;
        });
    },
  },
  mutations: {
    logout: (state) => {
      state.user.token = null;
      state.user.data = {};
    },
    setUser: (state, userData) => {
      state.user.token = userData.token;
      state.user.data = userData.user;
      sessionStorage.setItem('TOKEN', userData.token);
    },
  },
  modules: {}
});

export default store;
