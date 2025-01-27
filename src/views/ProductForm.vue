<template>
  <div class="product">
    <div class="row">
      <div class="col">
        <h1>Product form</h1>
        <OptionsForm 
          :resource-type="'products'" 
          :resource-values="productValues"
          @save-form="saveForm"
          @cancel-form="cancelForm"
        />
      </div>
      <div class="col">
        <div v-show="parentFilter" class="card">
          <ul class="list-group list-group-flush">
            <TreeView :root-id="productValues.blueprint_id" />
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
    name: 'ProductForm',
    components: {
      OptionsForm,
      TreeView,
    },
    computed: {
      productValues() {
        if (this.$route.params.id) {
          return this.$store.getters.stateProduct(this.$route.params.id);
        }

        let template = this.$store.getters.stateProductTemplate;
        template.parent_id = this.$route.params.parent_id ? [parseInt(this.$route.params.parent_id)] : [];
        template.blueprint_id = parseInt(this.$route.params.blueprint_id) || null;
        return template;
      },
      productList() {
        return this.$store.getters.stateProducts;
      },
      parentFilter() {
        return parseInt(this.$route.params.id) || null;
      }
    },
    methods: {
      saveForm(data) {
        this.$store.dispatch('saveProduct', data);
        this.cancelForm();
      },
      cancelForm() {
        this.$router.push(this.$router.options.history.state.back);
      },
      addChild() {
        this.$router.push({path: '/product/' + this.$route.params.id + '/new'});
      }
    }
  };
</script>
