<template>
  <v-select
    label="name"
    :options="relatedProducts"
    :name="'select-' + blueprint.id"
    :placeholder="'Please select'"
    :selectable="checkSelectable"
    @option:selected="productSelected"
    v-model="selected">
      <template #search="{attributes, events}">
        <input
          class="vs__search"
          :required="!selected && !blueprint.is_optional"
          v-bind="attributes"
          v-on="events"
        />
      </template>
  </v-select>
</template>

<script>
  export default {
    name: 'ItemSelect',
    props: ['blueprint'],
    computed: {
      relatedProducts() {
        return this.getRelatedProducts(parseInt(this.$route.params.id), this.blueprint.id);
      },
    },
    methods: {
      getRelatedProducts(parent_id, blueprint_id) {
        let products = [];
        // eslint-disable-next-line no-empty-pattern
        for (let [{}, product] of Object.entries(this.$store.getters.stateProducts)) {
          if (product.ancestor_id.includes(parent_id) && product.blueprint_id == blueprint_id) {
            products.push(product);
          }
        }
        return products;
      },
      deleteProduct(item) {
        if (confirm('Are you sure you want to delete this Product?')) {
          this.$store.dispatch('deleteProduct', item.id);
        }
      },
      checkSelectable(product) {
        let selectedParent = this.$store.getters.stateConfigurator['select-' + this.blueprint.parent_id];
        if (selectedParent && product.parent_id.includes(selectedParent.id)) {
          return true;
        }
        return false;
      },
      productSelected(product) {
        this.$store.getters.stateConfigurator['select-' + this.blueprint.id] = product;
      },
    },
  };
</script>

<style>
  .item-pill-delete {
    color: white;
    cursor: pointer;
  }
</style>
