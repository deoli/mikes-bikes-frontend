<template>
  <div class="product">
    <h1>This is a form for products</h1>
    <OptionsForm 
      :resource-options="productOptions" 
      :resource-values="productValues"
      @save-form="saveForm"
      @cancel-form="cancelForm"
    />
    <div v-show="parentFilter" class="card">
      <ul class="list-group list-group-flush">
        <TreeView :root-id="productValues.blueprint_id" />
      </ul>
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
      productOptions() {
        return this.$store.getters.stateProductSchema;
      },
      productValues() {
        if (this.$route.params.id) {
          return this.$store.getters.stateProduct(this.$route.params.id);
        }

        let template = this.$store.getters.stateProductTemplate;
        template.parent_id = this.$route.params.parent_id || null;
        template.blueprint_id = this.$route.params.blueprint_id || null;
        return template;
      },
      productList() {
        return this.$store.getters.stateProducts;
      },
      parentFilter() {
        return this.$route.params.id || null;
      }
    },
    methods: {
      saveForm(data) {
        this.$store.dispatch('saveProduct', data);
      },
      cancelForm() {
        this.$router.push({path: '/products'});
      },
      addChild() {
        this.$router.push({path: '/product/' + this.$route.params.id + '/new'});
      }
    }
  };
</script>
