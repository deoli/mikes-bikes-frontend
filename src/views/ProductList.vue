<template>
  <div class="product">
    <h1>These are the products</h1>
    <div class="list-group">
      <router-link v-for="product in $store.getters.stateProducts" :key="product.id" :to="'/product/' + product.id" class="list-group-item list-group-item-action">
        {{ product.name }}
      </router-link>
      <router-link to="/product/new" class="list-group-item list-group-item-action list-group-item-primary">Add new product</router-link>
    </div>
  </div>
</template>

<script>
  // import OptionsForm from '@/components/OptionsForm.vue';
  export default {
    name: 'ProductList',
    // components: {
    //   OptionsForm
    // },
    beforeCreate() {
      this.$store.getters.stateProducts || this.$store.dispatch('getProducts');
    }
  };
</script>
