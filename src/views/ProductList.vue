<template>
  <div class="product">
    <h1>These are the products</h1>
    <div class="list-group">
      <a v-for="product in $store.getters.stateProducts" :key="product.id" :href="'/product/' + product.id" class="list-group-item list-group-item-action">
        {{ product.name }}
      </a>
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
