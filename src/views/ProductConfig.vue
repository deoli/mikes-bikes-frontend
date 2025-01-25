<template>
  <form v-on:submit.prevent="addToCart">
    <div class="card">
      <ul class="list-group list-group-flush">
          <TreeView :root-id="getBlueprintId" :nodeAction="'configurator'" />
      </ul>
      <button class="btn btn-primary m-1" type="submit">Add to cart</button>  
    </div>
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
      addToCart(event) {
        let order = {};
        order.id = crypto.randomUUID();
        order.items = [];
        const formData = new FormData(event.target);
        // eslint-disable-next-line no-empty-pattern
        for (let [{}, value] of formData) {
          if (value) {
            order.items.push(value);
          }
        }
        this.$store.dispatch('addToCart', order);
      },
      cancelForm() {
        this.$emit('cancel-form');
      }
    },
  };
</script>
