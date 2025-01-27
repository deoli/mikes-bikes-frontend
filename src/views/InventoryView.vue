<template>
  <div class="part">
    <h1>This is your inventory of parts</h1>
    <PartsList
      :resource-list="inventoryList"
      :resource-type="'inventory'"
    />
  </div>
</template>

<script>
  import PartsList from '@/components/PartsList.vue';
  export default {
    name: 'InventoryView',
    components: {
      PartsList
    },
    computed: {
      inventoryList() {
        return this.getLeafProducts();
      }
    },
    methods: {
      getLeafProducts() {
        let relations = {};
        // eslint-disable-next-line no-empty-pattern
        for (let relation of this.$store.getters.stateProductRelations) {
          let product = this.$store.getters.stateProducts[relation.product_id];
          if (product.descendant_id.length === 0) {
            relation.product = product;
            let unique_key = relation.product_id;

            let blueprint = this.$store.getters.stateBlueprints[relation.blueprint_id];
            if (blueprint.is_attribute) {
              relation.parent_product = this.$store.getters.stateProducts[relation.parent_id];
              unique_key += '-' + relation.parent_id;
            }
            relation.unique_key = unique_key;
            relations[unique_key] = relation;
          }
        }
        return relations;
      },
    },
  };
</script>
