import { createStore } from "vuex";

import blueprints from './modules/blueprints';
import products from './modules/products';
import cart from './modules/cart';
import configurator from './modules/configurator';

export default createStore({
  modules: {
    blueprints,
    products,
    cart,
    configurator,
  }
});
