<template>
  <div class="blueprint">
    <h1>These are the blueprints</h1>
    <ItemsList
      :resource-list="blueprintList"
      :resource-type="'blueprint'"
      :parent-filter="null"
    />
    <router-link to="/blueprint/new" class="btn btn-primary d-block">Add new blueprint</router-link>
  </div>
</template>

<script>
  import ItemsList from '@/components/ItemsList.vue';
  export default {
    name: 'BlueprintList',
    components: {
      ItemsList
    },
    computed: {
      blueprintList() {
        return this.$store.getters.stateBlueprints;
      }
    },
    beforeCreate() {
      this.$store.getters.stateBlueprints || this.$store.dispatch('getBlueprints');
    }
  };
</script>
