<template>
  <div class="blueprint">
    <h1>This is a form for blueprints</h1>
    <OptionsForm 
      :resource-options="blueprintOptions" 
      :resource-values="blueprintValues"
      @save-form="saveForm"
      @cancel-form="cancelForm"
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
    },
    methods: {
      saveForm(data) {
        this.$store.dispatch('saveBlueprint', data);
      },
      cancelForm() {
        this.$router.push({path: '/blueprints'});
      }
    }
  };
</script>
