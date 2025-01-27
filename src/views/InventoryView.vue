<template>
  <div class="part">
    <h1>This is your inventory of parts</h1>
    <PartsList
      :resource-list="partList"
      :resource-type="'part'"
      :parent-filter="null"
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
      partList() {
        return this.getLeafProducts();
      }
    },
    methods: {
      getLeafProducts() {
        let products = [];
        // eslint-disable-next-line no-empty-pattern
        for (let [{}, product] of Object.entries(this.$store.getters.stateProducts)) {
          if (product.descendant_id.length === 0) {
            products.push(product);
          }
        }
        return products;
      },
    },
  };
</script>
