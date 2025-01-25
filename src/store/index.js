import { createStore } from "vuex";

import blueprints from './modules/blueprints';
import products from './modules/products';
import cart from './modules/cart';

export default createStore({
  modules: {
    blueprints,
    products,
    cart,
  }
});
