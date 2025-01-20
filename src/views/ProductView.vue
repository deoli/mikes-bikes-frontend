<template>
  <div class="product">
    <h1>This is a form for products</h1>
    <OptionsForm :resource-options="this.$store.getters.stateProductSchema" :resource-values="this.$store.getters.stateProduct" />
  </div>
</template>

<script>
  import OptionsForm from '@/components/OptionsForm.vue';
  export default {
    name: 'ProductView',
    components: {
      OptionsForm
    },
    beforeCreate() {
      this.$store.getters.stateProductSchema || this.$store.dispatch('optionsProducts');
    }
  };
</script>
