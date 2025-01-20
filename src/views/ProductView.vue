<template>
  <div class="product">
    <h1>This is a form for products</h1>
    <OptionsForm :resource-options="this.$store.getters.stateProductSchema" />
  </div>
</template>

<script>
  import OptionsForm from '@/components/OptionsForm.vue';
  export default {
    name: 'HomeView',
    components: {
      OptionsForm
    },
    created() {
      this.$store.getters.stateProductSchema || this.$store.dispatch('optionsProducts');
    }
  };
</script>
