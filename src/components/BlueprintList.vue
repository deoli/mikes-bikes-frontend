<template>
  <div class="row items-list-vue">
    <template v-for="item in resourceList" :key="item.id">
      <div v-show="item.parent_id == parentFilter" class="card col-sm m-3" style="min-width: 16rem; max-width: 16rem;">
        <img class="card-img-top" src="../assets/logo.png" alt="Product blueprint image">
        <div class="card-body">
          <h5 class="card-title">{{ item.name }}</h5>
          <p class="card-text" style="font-size: .9rem;">The item's description would go here if we had one.</p>
          <router-link :to="'/' + resourceType + '/' + item.id" class="btn btn-primary m-1">
            Modify
          </router-link>
          <button @click.prevent="deleteItem(item)" class="btn btn-danger m-1">
            X
          </button>
        </div>
        <template v-if="resourceType === 'blueprint'">
          <ul class="list-group list-group-flush">
            <template v-for="product in productList[item.id]" :key="product.id">
              <router-link :to="'/blueprint/' + item.id + '/product/' + product.id" class="list-group-item list-group-item-action">
                  {{ product.name }}
              </router-link>
            </template>
            <router-link :to="'/' + resourceType + '/' + item.id + '/product/new'" class="list-group-item list-group-item-action active">
              Add product
            </router-link>
          </ul>
        </template>
      </div>
    </template>
  </div>
</template>

<script>
  export default {
    name: 'BlueprintList',
    props: ['resourceList', 'resourceType', 'parentFilter'],
    computed: {
      productList() {
        let products = {};
        for (let relation of this.$store.getters.stateProductRelations) {
          if (!products[relation.blueprint_id]) {
            products[relation.blueprint_id] = [];
          }
          products[relation.blueprint_id].push(this.$store.getters.stateProduct(relation.product_id));
        }
        return products;
      }
    },
    methods: {
      deleteItem(item) {
        if (this.resourceType === 'blueprint') {
          if (confirm('Are you sure you want to delete this Blueprint?')) {
            this.$store.dispatch('deleteBlueprint', item.id);
          }
        }
        if (this.resourceType === 'product') {
          if (confirm('Are you sure you want to delete this Product?')) {
            this.$store.dispatch('deleteProduct', item.id);
          }
        }
      }
    }
  };
</script>

<style>
  .items-list-vue .list-group-flush {
    margin-left: calc(var(--bs-gutter-x) * -0.5);
    margin-right: calc(var(--bs-gutter-x) * -0.5);
  }
  .items-list-vue .list-group-item {
    padding-left: calc(var(--bs-list-group-item-padding-x) + var(--bs-gutter-x) * 0.5);
    padding-right: calc(var(--bs-list-group-item-padding-x) + var(--bs-gutter-x) * 0.5);
  }
</style>
