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
        let inStock = true;
        if (!product.descendant_id.length) {
          let relations = this.$store.getters.stateProductRelations.filter(relation => relation.product_id == product.id && relation.blueprint_id == this.blueprint.id);
          if (selectedParent) {
            relations = relations.filter(relation => relation.parent_id == selectedParent.id);
          }
          if (!relations.length || !relations[0].stock_count) {
            inStock = false;
          }
        }
        if (selectedParent && product.parent_id.includes(selectedParent.id) && inStock) {
          return true;
        }
        return false;
      },
      productSelected(product) {
        let configurator = {};
        configurator['select-' + this.blueprint.id] = product;
        this.$store.commit('addConfigurator', configurator);
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
