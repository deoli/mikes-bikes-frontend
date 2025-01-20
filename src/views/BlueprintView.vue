<template>
  <div class="blueprint">
    <h1>This is a form for blueprints</h1>
    <OptionsForm :resource-options="this.$store.getters.stateBlueprintSchema" />
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
      this.$store.getters.stateBlueprintSchema || this.$store.dispatch('optionsBlueprints');
    }
  };
</script>
