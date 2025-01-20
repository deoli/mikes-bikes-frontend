import { createStore } from "vuex";

import blueprints from './modules/blueprints';
import products from './modules/products';

export default createStore({
  modules: {
    blueprints,
    products,
  }
});
