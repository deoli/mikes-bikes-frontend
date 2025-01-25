// import axios from 'axios';

const state = {
  orders: []
};

const getters = {
  stateCart: state => state.orders,
};

const actions = {
  async addToCart({commit}, order) {
    // await axios.patch('addToCart', order);
    commit('addToCart', order);
  },
  async removeFromCart({commit}, order) {
    // await axios.patch('removeFromCart', order);
    commit('removeFromCart', order);

  },
};

const mutations = {
  addToCart(state, order) {
    state.orders.push(order);
  },
  removeFromCart(state, order) {
    let orders = [];
    for (let stateOrder of state.orders) {
      if (stateOrder.id !== order.id) {
        orders.push(stateOrder);
      }
    }
    state.orders = orders;
  },
};

export default {
  state,
  getters,
  actions,
  mutations
};
