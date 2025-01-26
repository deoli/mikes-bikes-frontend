<template>
  <div class="blueprint">
    <div class="row">
      <div class="col">
        <h1>Product blueprint form</h1>
        <OptionsForm 
          :resource-type="'blueprints'" 
          :resource-values="blueprintValues"
          @save-form="saveForm"
          @cancel-form="cancelForm"
        />        
      </div>
      <div class="col">
        <div v-show="parentFilter" class="card">
          <ul class="list-group list-group-flush">
            <TreeView :root-id="$route.params.id" :nodeAction="'editor'" />
            <button class="list-group-item list-group-item-action active" @click="addChild">Add child</button>
          </ul>
        </div>        
      </div>
    </div>
  </div>
</template>

<script>
  import OptionsForm from '@/components/OptionsForm.vue';
  import TreeView from '@/components/TreeView.vue';
  export default {
    name: 'BlueprintForm',
    components: {
      OptionsForm,
      TreeView
    },
    computed: {
      blueprintValues() {
        if (this.$route.params.id) {
          return this.$store.getters.stateBlueprint(this.$route.params.id);
        }

        let template = this.$store.getters.stateBlueprintTemplate;
        template.parent_id = parseInt(this.$route.params.parent_id) || null;
        return template;
      },
      blueprintList() {
        return this.$store.getters.stateBlueprints;
      },
      parentFilter() {
        return parseInt(this.$route.params.id) || null;
      }
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
