<template>
  <div class="blueprint">
    <h1>These are the blueprints</h1>
    <div class="list-group">
      <router-link v-for="blueprint in $store.getters.stateBlueprints" :key="blueprint.id" :to="'/blueprint/' + blueprint.id" class="list-group-item list-group-item-action">
        {{ blueprint.name }}
      </router-link>
      <router-link to="/blueprint/new" class="list-group-item list-group-item-action list-group-item-primary">Add new blueprint</router-link>
    </div>
  </div>
</template>

<script>
  // import OptionsForm from '@/components/OptionsForm.vue';
  export default {
    name: 'BlueprintList',
    // components: {
    //   OptionsForm
    // },
    beforeCreate() {
      this.$store.getters.stateBlueprints || this.$store.dispatch('getBlueprints');
    }
  };
</script>
