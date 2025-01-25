<template>
  <template v-for="product in relatedProducts" :key="product.id">
    <span class="badge bg-secondary m-1">
      {{ product.name }}
      <a @click.prevent="deleteProduct(product)" class="item-pill-delete">X</a>
    </span>
  </template>
  <router-link :to="'/blueprint/' + blueprintId + '/product/' + this.$route.params.id + '/new'" class="badge bg-primary m-1">
    Add Product
  </router-link>
</template>

<script>
  export default {
    name: 'ItemPills',
    props: ['blueprintId'],
    computed: {
      relatedProducts() {
        return this.getRelatedProducts(this.$route.params.id, this.blueprintId);
      },
    },
    methods: {
      getRelatedProducts(parent_id, blueprint_id) {
        let products = [];
        // eslint-disable-next-line no-empty-pattern
        for (let [{}, product] of Object.entries(this.$store.getters.stateProducts)) {
          if (product.parent_id == parent_id && product.blueprint_id == blueprint_id) {
            products.push(product);
          }
        }
        return products;
      },
      deleteProduct(item) {
        if (confirm('Are you sure you want to delete this Product?')) {
          this.$store.dispatch('deleteProduct', item.id);
        }
      }
    }
  };
</script>

<style>
  .item-pill-delete {
    color: white;
    cursor: pointer;
  }
</style>
