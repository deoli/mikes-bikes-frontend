<template>
  <div class="product">
    <h1>These are the products</h1>
    <ItemsList
      :resource-list="productList"
      :resource-type="'product'"
      :parent-filter="null"
    />
    <router-link to="/product/new" class="btn btn-primary d-block">Add new product</router-link>
  </div>
</template>

<script>
  import ItemsList from '@/components/ItemsList.vue';
  export default {
    name: 'ProductList',
    components: {
      ItemsList
    },
    computed: {
      productList() {
        return this.$store.getters.stateProducts;
      }
    },
    beforeCreate() {
      this.$store.getters.stateProducts || this.$store.dispatch('getProducts');
    }
  };
</script>
