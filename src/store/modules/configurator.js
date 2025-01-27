const state = {
  configurator: {},
};

const getters = {
  stateConfigurator: state => state.configurator,
};

const actions = {
};

const mutations = {
  setConfigurator(state, configurator) {
    state.configurator = configurator;
  },
  addConfigurator(state, configurator) {
    for (let [key, value] of Object.entries(configurator)) {
      state.configurator[key] = value;
    }
  },
};

export default {
  state,
  getters,
  actions,
  mutations
};
