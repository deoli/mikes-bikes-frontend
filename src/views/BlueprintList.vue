<template>
  <div class="blueprint">
    <h1>These are the blueprints</h1>
    <div class="list-group">
      <a v-for="blueprint in $store.getters.stateBlueprints" :key="blueprint.id" :href="'/blueprint/' + blueprint.id" class="list-group-item list-group-item-action">
        {{ blueprint.name }}
      </a>
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
