<template>
  <div class="blueprint">
    <h1>This is a form for blueprints</h1>
    <OptionsForm 
      :resource-options="blueprintOptions" 
      :resource-values="blueprintValues"
      @save-form="saveForm"
      @cancel-form="cancelForm"
    />
    <div v-show="parentFilter" class="card">
      <ul class="list-group list-group-flush">
        <TreeEdit :root-id="$route.params.id" />
        <button class="list-group-item list-group-item-action active" @click="addChild">Add child</button>
      </ul>
    </div>
  </div>
</template>

<script>
  import OptionsForm from '@/components/OptionsForm.vue';
  import TreeEdit from '@/components/TreeEdit.vue';
  export default {
    name: 'BlueprintForm',
    components: {
      OptionsForm,
      TreeEdit
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
      },
      blueprintList() {
        return this.$store.getters.stateBlueprints;
      },
      parentFilter() {
        return this.$route.params.id || null;
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
        if (this.blueprintValues.parent_id) {
          this.$router.push({path: '/blueprint/' + this.blueprintValues.parent_id});
        } else {
          this.$router.push({path: '/blueprints'});
        }
      },
      addChild() {
        this.$router.push({path: '/blueprint/' + this.$route.params.id + '/new'});
      }
    }
  };
</script>
