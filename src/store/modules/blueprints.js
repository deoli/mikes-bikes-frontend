import axios from 'axios';

const state = {
  blueprintSchema: null,
  blueprints: null,
  blueprint: null
};

const getters = {
  stateBlueprintSchema: state => state.blueprintSchema,
  stateBlueprints: state => state.blueprints,
  stateBlueprint: state => id => state.blueprints[id],
  stateBlueprintTemplate: state => state.blueprint,
};

const actions = {
  async optionsBlueprints({commit}) {
    let {data} = await axios.options('blueprints');
    commit('optionsBlueprints', data);
  },
  async getBlueprints({commit}) {
    let {data} = await axios.get('blueprints');
    commit('setBlueprints', data);
  },
  async viewBlueprint({commit}, id) {
    let {data} = await axios.get(`blueprints/${id}`);
    commit('setBlueprint', data);
  },
  async createBlueprint({dispatch}, blueprint) {
    await axios.post('blueprints', blueprint);
    await dispatch('getBlueprints');
  },
  // eslint-disable-next-line no-empty-pattern
  async updateBlueprint({}, blueprint) {
    await axios.patch(`blueprints/${blueprint.id}`, blueprint.form);
  },
  // eslint-disable-next-line no-empty-pattern
  async deleteBlueprint({}, id) {
    await axios.delete(`blueprints/${id}`);
  },
  initBlueprint({commit}) {
    commit('initBlueprint');
  },
};

const mutations = {
  optionsBlueprints(state, options) {
    state.blueprintSchema = options;
    if (!state.blueprint) {
      let blueprint = {};
      for (let option of options) {
        blueprint[option.key] = null;
      }
      state.blueprint = blueprint;
    }
  },
  setBlueprints(state, blueprints) {
    state.blueprints = {};
    for (let blueprint of blueprints) {
      state.blueprints[blueprint.id] = blueprint;
    }
  },
  setBlueprint(state, blueprint) {
    state.blueprint = blueprint;
  },
  initBlueprint(state) {
    let blueprint = {};
    for (let option of state.blueprintSchema) {
      blueprint[option.key] = null;
    }
    state.blueprint = blueprint;
  },
};

export default {
  state,
  getters,
  actions,
  mutations
};
