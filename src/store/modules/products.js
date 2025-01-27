import axios from 'axios';

const state = {
  productSchema: null,
  products: null,
  productTemplate: null,
  productRelations: null,
};

const getters = {
  stateProductSchema: state => state.productSchema,
  stateProducts: state => state.products,
  stateProduct: state => id => state.products[id],
  stateProductTemplate: state => state.productTemplate,
  stateProductRelations: state => state.productRelations,
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
  async getProductRelations({commit}) {
    let {data} = await axios.get('blueprint_products');
    commit('setProductRelations', data);
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
      let {data} = await axios.post('products', product);
      product.id = data.id;
      await dispatch('getProducts');
    }
    if (product.blueprint_id) {
      let relation = {'blueprint_id': product.blueprint_id, 'product_id': product.id};
      if (product.parent_id && product.parent_id.length) {
        for (let parent_id of product.parent_id) {
          relation.parent_id = parent_id;
          await axios.post('blueprint_products', relation);
        }
      } else {
        await axios.post('blueprint_products', relation);
      }
    }
    await dispatch('getProductRelations');
  },
  async deleteProduct({dispatch}, id) {
    await axios.delete(`products/${id}`);
    await dispatch('getProducts');
  },
};

const mutations = {
  optionsProducts(state, options) {
    options.push({key: 'parent_id', type: 'ref#products'});
    options.push({key: 'blueprint_id', type: 'ref#blueprints'});
    state.productSchema = options;
    if (!state.productTemplate) {
      let product = {};
      for (let option of options) {
        product[option.key] = null;
      }
      state.productTemplate = product;
    }
  },
  setProducts(state, products) {
    state.products = {};
    for (let product of products) {
      mutations.setProduct(state, product);
    }
  },
  setProductRelations(state, relations) {
    state.productRelations = relations;
    if (!state.products) {
      return;
    }
    
    // eslint-disable-next-line no-empty-pattern
    for (let [{}, product] of Object.entries(state.products)) {
      product.parent_id = [];
      product.blueprint_id = null;
      for (let relation of relations) {
        if (relation.product_id == product.id) {
          if (relation.parent_id) {
            product.parent_id.push(relation.parent_id);
          }
          product.blueprint_id = relation.blueprint_id;
        }
      }
      state.products[product.id] = product;
    }
    
    // eslint-disable-next-line no-empty-pattern
    for (let [{}, product] of Object.entries(state.products)) {
      product.ancestor_id = getAncestorIds(product.id);
      state.products[product.id] = product;
    }
    
    function getAncestorIds(productId) {
      let parent = state.products[productId];
      let ancestorIds = parent.parent_id;
      for (let ancestorId of ancestorIds) {
        ancestorIds = ancestorIds.concat(getAncestorIds(ancestorId));
      }
      return ancestorIds;
    }
    
    // eslint-disable-next-line no-empty-pattern
    for (let [{}, product] of Object.entries(state.products)) {
      product.descendant_id = getDescendantIds(product.id);
      state.products[product.id] = product;
    }
    
    function getDescendantIds(productId) {
      let descendantIds = [];
      // eslint-disable-next-line no-empty-pattern
      for (let [{}, child] of Object.entries(state.products)) {
        if (child.parent_id.includes(productId)) {
          descendantIds.push(child.id);
        }
      }
      for (let descendantId of descendantIds) {
        descendantIds = descendantIds.concat(getDescendantIds(descendantId));
      }
      return descendantIds;
    }
  },
  setProduct(state, product) {
    if (!product.descendant_id) {
      product.descendant_id = [];
    }
    if (!product.ancestor_id) {
      product.ancestor_id = [];
    }
    if (!product.parent_id) {
      product.parent_id = [];
    }
    if (!product.blueprint_id) {
      product.blueprint_id = null;
    }
    state.products[product.id] = product;
  },
};

export default {
  state,
  getters,
  actions,
  mutations
};
