import axios from 'axios';

const state = {
  productSchema: null,
  products: null,
  product: null
};

const getters = {
  stateProductSchema: state => state.productSchema,
  stateProducts: state => state.products,
  stateProduct: state => state.product,
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
  async createProduct({dispatch}, product) {
    await axios.post('products', product);
    await dispatch('getProducts');
  },
  // eslint-disable-next-line no-empty-pattern
  async updateProduct({}, product) {
    await axios.patch(`products/${product.id}`, product.form);
  },
  // eslint-disable-next-line no-empty-pattern
  async deleteProduct({}, id) {
    await axios.delete(`products/${id}`);
  }
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
    state.products = products;
  },
  setProduct(state, product) {
    state.product = product;
  },
};

export default {
  state,
  getters,
  actions,
  mutations
};
