<template>
  <div class="blueprint">
    <h1>These are the blueprints</h1>
    <div class="row">
      <template v-for="blueprint in $store.getters.stateBlueprints" :key="blueprint.id">
        <div v-show="!blueprint.parent_id" class="card col-sm m-3">
          <img class="card-img-top" src="../assets/logo.png" alt="Card image cap">
          <div class="card-body">
            <h5 class="card-title">{{ blueprint.name }}</h5>
            <p class="card-text">The item's description would go here if we had one.</p>
            <router-link :to="'/blueprint/' + blueprint.id" class="btn btn-primary">
              Modify
            </router-link>
          </div>
        </div>
      </template>
      <router-link to="/blueprint/new" class="btn btn-primary">Add new blueprint</router-link>
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
