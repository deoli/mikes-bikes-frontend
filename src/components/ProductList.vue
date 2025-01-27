<template>
  <div class="row products-list-vue">
    <template v-for="item in resourceList" :key="item.id">
      <div v-show="(parentFilter && item.parent_id.includes(parentFilter)) || (!parentFilter && !item.parent_id.length)" class="card col-sm m-3" style="min-width: 16rem; max-width: 16rem;">
        <img class="card-img-top" src="../assets/logo.png" alt="Product image">
        <div class="card-body">
          <h5 class="card-title">{{ item.name }}</h5>
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
    name: 'ProductList',
    props: ['resourceList', 'resourceType', 'parentFilter'],
  };
</script>
