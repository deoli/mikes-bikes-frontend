<template>
  <form v-on:submit.prevent="addToCart">
    <div class="card">
      <ul class="list-group list-group-flush">
          <TreeView :root-id="getBlueprintId" :nodeAction="'configurator'" />
      </ul>
      <button class="btn btn-primary m-1" type="submit">Add to cart</button>  
    </div>
    <button class="btn btn-secondary m-1" @click.prevent="cancelForm">Cancel</button>
  </form>
</template>

<script>
  import TreeView from '@/components/TreeView.vue';
  export default {
    name: 'ProductConfig',
    components: {
      TreeView,
    },
    props: ['resourceList', 'resourceType', 'parentFilter'],
    computed: {
      getBlueprintId() {
        let product = this.$store.getters.stateProduct(this.$route.params.id);
        return product.blueprint_id;
      }
    },
    methods: {
      addToCart() {
        let order = {};
        order.id = crypto.randomUUID();
        order.items = [];
        // eslint-disable-next-line no-empty-pattern
        for (let [{}, product] of Object.entries(this.$store.getters.stateConfigurator)) {
          order.items.push(product);
        }
        this.$store.dispatch('addToCart', order);
      },
      cancelForm() {
        this.$router.push(this.$router.options.history.state.back);
      }
    },
  };
</script>
