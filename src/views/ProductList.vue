<template>
  <div class="product">
    <h1>These are our products</h1>
    <ProductsList
      :resource-list="productList"
      :resource-type="'product'"
      :parent-filter="null"
    />
  </div>
</template>

<script>
  import ProductsList from '@/components/ProductsList.vue';
  export default {
    name: 'ProductList',
    components: {
      ProductsList
    },
    computed: {
      productList() {
        return this.$store.getters.stateProducts;
      }
    },
  };
</script>
