import axios from 'axios';

const state = {
  productSchema: null,
  products: null,
  product: null
};

const getters = {
  stateProductSchema: state => state.productSchema,
  stateProducts: state => state.products,
  stateProduct: state => id => state.products[id],
  stateProductTemplate: state => state.product,
};

const actions = {
  async optionsProducts({commit}) {
    let {data} = await axios.options('products');
    commit('optionsProducts', data);
  },
  async getProducts({commit}) {
    let {data} = await axios.get('products');
    commit('setProducts', data);
  },
  async viewProduct({commit}, id) {
    let {data} = await axios.get(`products/${id}`);
    commit('setProduct', data);
  },
  async saveProduct({commit, dispatch}, product) {
    if (product.id) {
      await axios.patch(`products/${product.id}`, product);
      commit('setProduct', product);
    } else {
      await axios.post('products', product);
      await dispatch('getProducts');
    }
  },
  async deleteProduct({dispatch}, id) {
    await axios.delete(`products/${id}`);
    await dispatch('getProducts');
  },
};

const mutations = {
  optionsProducts(state, options) {
    state.productSchema = options;
    if (!state.product) {
      let product = {};
      for (let option of options) {
        product[option.key] = null;
      }
      state.product = product;
    }
  },
  setProducts(state, products) {
    state.products = {};
    for (let product of products) {
      state.products[product.id] = product;
    }
  },
  setProduct(state, product) {
    state.products[product.id] = product;
  },
};

export default {
  state,
  getters,
  actions,
  mutations
};
