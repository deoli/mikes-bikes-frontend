<template>
  <div class="blueprint">
    <h1>This is a form for blueprints</h1>
    <OptionsForm 
      :resource-options="blueprintOptions" 
      :resource-values="blueprintValues"
    />
  </div>
</template>

<script>
  import OptionsForm from '@/components/OptionsForm.vue';
  export default {
    name: 'BlueprintForm',
    components: {
      OptionsForm
    },
    computed: {
      blueprintOptions() {
        return this.$store.getters.stateBlueprintSchema;
      },
      blueprintValues() {
        return this.$route.params.id ? this.$store.getters.stateBlueprint(this.$route.params.id) : this.$store.getters.stateBlueprintTemplate;
      }
    },
    beforeCreate() {
      this.$store.getters.stateBlueprintSchema || this.$store.dispatch('optionsBlueprints');
    }
  };
</script>
