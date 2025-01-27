<template>
  <div class="blueprint">
    <h1>Product blueprints</h1>
    <BlueprintList
      :resource-list="blueprintList"
      :resource-type="'blueprint'"
      :parent-filter="null"
    />
    <router-link to="/blueprint/new" class="btn btn-primary d-block">New blueprint</router-link>
  </div>
</template>

<script>
  import BlueprintList from '@/components/BlueprintList.vue';
  export default {
    name: 'BlueprintView',
    components: {
      BlueprintList
    },
    computed: {
      blueprintList() {
        return this.$store.getters.stateBlueprints;
      }
    },
  };
</script>
