<template>
  <select :name="'select-' + blueprint.id" :required="blueprint.is_optional ? false : true" class="form-control">
    <option value="">Please select</option>
    <template v-for="product in relatedProducts" :key="product.id">
      <option :value="product.id">
        {{ product.name }}
      </option>
    </template>    
  </select>
</template>

<script>
  export default {
    name: 'ItemSelect',
    props: ['blueprint'],
    computed: {
      relatedProducts() {
        return this.getRelatedProducts(parseInt(this.$route.params.id), this.blueprint.id);
      },
    },
    methods: {
      getRelatedProducts(parent_id, blueprint_id) {
        let products = [];
        // eslint-disable-next-line no-empty-pattern
        for (let [{}, product] of Object.entries(this.$store.getters.stateProducts)) {
          if (product.parent_id.includes(parent_id) && product.blueprint_id == blueprint_id) {
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
