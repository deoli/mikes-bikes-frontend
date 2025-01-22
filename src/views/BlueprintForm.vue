<template>
  <div class="blueprint">
    <h1>This is a form for blueprints</h1>
    <OptionsForm 
      :resource-options="blueprintOptions" 
      :resource-values="blueprintValues"
      @save-form="saveForm"
      @cancel-form="cancelForm"
    />
    <div v-show="parentFilter">
      <ItemsList
        :resource-list="blueprintList"
        :resource-type="'blueprint'"
        :parent-filter="parentFilter"
      />
      <button class="btn btn-primary m-1" @click="addChild">Add child</button>
    </div>
  </div>
</template>

<script>
  import OptionsForm from '@/components/OptionsForm.vue';
  import ItemsList from '@/components/ItemsList.vue';
  export default {
    name: 'BlueprintForm',
    components: {
      OptionsForm,
      ItemsList
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
        this.$router.push({path: '/blueprints'});
      },
      addChild() {
        this.$router.push({path: '/blueprint/' + this.$route.params.id + '/new'});
      }
    }
  };
</script>
