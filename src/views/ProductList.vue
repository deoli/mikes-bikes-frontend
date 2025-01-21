<template>
  <div class="product">
    <h1>These are the products</h1>
    <div class="row">
      <template v-for="product in $store.getters.stateProducts" :key="product.id">
        <div v-show="!product.parent_id" class="card col-sm m-3">
          <img class="card-img-top" src="../assets/logo.png" alt="Card image cap">
          <div class="card-body">
            <h5 class="card-title">{{ product.name }}</h5>
            <p class="card-text">The item's description would go here if we had one.</p>
            <router-link :to="'/product/' + product.id" class="btn btn-primary">
              Modify
            </router-link>
          </div>
        </div>
      </template>
      <router-link to="/product/new" class="btn btn-primary">Add new product</router-link>
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
