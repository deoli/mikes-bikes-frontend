<template>
  <div class="row parts-list-vue">
    <template v-for="item in resourceList" :key="item.id">
      <div class="card col-sm m-3" style="min-width: 16rem; max-width: 16rem;">
        <img class="card-img-top" src="../assets/logo.png" alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title" v-if="item.parent_product">{{ item.parent_product.name }} [{{ item.product.name }}]</h5>
          <h5 class="card-title" v-else>{{ item.product.name }}</h5>
          <p class="card-text" style="font-size: .9rem;">The item's description would go here if we had one.</p>
          <router-link :to="'/' + resourceType + '/' + item.id" class="btn btn-primary m-1">
            Configure
          </router-link>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
  export default {
    name: 'PartsList',
    props: ['resourceList', 'resourceType', 'parentFilter'],
  };
</script>
