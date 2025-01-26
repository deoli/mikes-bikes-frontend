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
  stateBlueprintTemplate: state => state.blueprintTemplate,
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
  async saveBlueprint({commit, dispatch}, blueprint) {
    if (blueprint.id) {
      await axios.patch(`blueprints/${blueprint.id}`, blueprint);
      commit('setBlueprint', blueprint);
    } else {
      await axios.post('blueprints', blueprint);
      await dispatch('getBlueprints');
    }
  },
  async deleteBlueprint({dispatch}, id) {
    await axios.delete(`blueprints/${id}`);
    await dispatch('getBlueprints');
  },
};

const mutations = {
  optionsBlueprints(state, options) {
    state.blueprintSchema = options;
    if (!state.blueprintTemplate) {
      let blueprint = {};
      for (let option of options) {
        blueprint[option.key] = null;
      }
      state.blueprintTemplate = blueprint;
    }
  },
  setBlueprints(state, blueprints) {
    state.blueprints = {};
    for (let blueprint of blueprints) {
      state.blueprints[blueprint.id] = blueprint;
    }
  },
  setBlueprint(state, blueprint) {
    state.blueprints[blueprint.id] = blueprint;
  },
};

export default {
  state,
  getters,
  actions,
  mutations
};
