<template>
  <div class="product">
    <div class="row">
      <div class="col">
        <h1>Product form</h1>
        <OptionsForm 
          :resource-options="productOptions" 
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
      productOptions() {
        return this.$store.getters.stateProductSchema;
      },
      productValues() {
        if (this.$route.params.id) {
          let product = this.$store.getters.stateProduct(this.$route.params.id);
          product.parent_id = [];
          product.blueprint_id = null;
          for (let relation of this.$store.getters.stateProductRelations) {
            if (relation.product_id == product.id) {
              if (relation.parent_id) {
                product.parent_id.push(relation.parent_id);
              }
              product.blueprint_id = relation.blueprint_id;
            }
          }
          return product;
        }

        let template = this.$store.getters.stateProductTemplate;
        template.parent_id = this.$route.params.parent_id? [this.$route.params.parent_id] : [];
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
