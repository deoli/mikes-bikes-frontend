<template>
  <form>
    <ul class="list-group list-group-flush">
        <TreeView :root-id="getBlueprintId" :nodeAction="'configurator'" />
    </ul>
  </form>
</template>

<script>
  import TreeView from '@/components/TreeView.vue';
  export default {
    name: 'ProductConfig',
    components: {
      TreeView,
    },
    props: ['resourceList', 'resourceType', 'parentFilter'],
    computed: {
      getBlueprintId() {
        let product = this.$store.getters.stateProduct(this.$route.params.id);
        return product.blueprint_id;
      }
    },
    beforeCreate() {
      this.$store.getters.stateBlueprints || this.$store.dispatch('getBlueprints');
      this.$store.getters.stateProducts || this.$store.dispatch('getProducts');
    }
  };
</script>
