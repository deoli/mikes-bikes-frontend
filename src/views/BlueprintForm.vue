<template>
  <div class="blueprint">
    <h1>This is a form for blueprints</h1>
    <OptionsForm 
      :resource-options="blueprintOptions" 
      :resource-values="blueprintValues"
      @save-form="saveForm"
      @cancel-form="cancelForm"
    />
    <button class="btn btn-primary m-1" @click="addChild">Add child</button>
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
        if (this.$route.params.id) {
          return this.$store.getters.stateBlueprint(this.$route.params.id);
        }

        let template = this.$store.getters.stateBlueprintTemplate;
        template.parent_id = this.$route.params.parent_id || null;
        return template;
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
      },
      addChild() {
        this.$router.push({path: '/blueprint/' + this.$route.params.id + '/new'});
      }
    }
  };
</script>
