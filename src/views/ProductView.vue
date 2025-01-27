<template>
  <div class="product">
    <h1>These are our products</h1>
    <ProductList
      :resource-list="productList"
      :resource-type="'product'"
      :parent-filter="null"
    />
  </div>
</template>

<script>
  import ProductList from '@/components/ProductList.vue';
  export default {
    name: 'ProductView',
    components: {
      ProductList
    },
    computed: {
      productList() {
        return this.$store.getters.stateProducts;
      }
    },
  };
</script>
