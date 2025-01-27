<template>
  <div class="row parts-list-vue">
    <template v-for="item in resourceList" :key="item.id">
      <div class="card col-sm m-3" style="min-width: 16rem; max-width: 16rem;">
        <img class="card-img-top" src="../assets/logo.png" alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title" v-if="item.parent_product">{{ item.parent_product.name }} [{{ item.product.name }}]</h5>
          <h5 class="card-title" v-else>{{ item.product.name }}</h5>
          <p class="card-text" style="font-size: .9rem;">The item's description would go here if we had one.</p>
          <div class="form-group mb-3">
            <label class="text-left">Stock</label>
            <input type="number" class="form-control form-control-lg" placeholder="0" v-model="item.stock_count" :data-unique_key="item.unique_key" @change="stockChange" />
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
  export default {
    name: 'PartsList',
    props: ['resourceList', 'resourceType', 'parentFilter'],
    methods: {
      stockChange(event) {
        let stock_count = event.target.value;
        let [product_id, parent_id] = event.target.dataset.unique_key.split('-');
        let relations = this.$store.getters.stateProductRelations.filter(relation => relation.product_id == product_id);
        if (parent_id) {
          relations = relations.filter(relation => relation.parent_id == parent_id);
        }
        for (let relation of relations) {
          relation.stock_count = stock_count;
        }
        this.$store.dispatch('saveProductRelations', relations);
      }
    },
  };
</script>
