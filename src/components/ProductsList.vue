<template>
  <div class="row products-list-vue">
    <template v-for="item in resourceList" :key="item.id">
      <div v-show="item.parent_id == parentFilter" class="card col-sm m-3" style="min-width: 12rem; max-width: 12rem;">
        <img class="card-img-top" src="../assets/logo.png" alt="Card image cap">
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
    name: 'ItemsList',
    props: ['resourceList', 'resourceType', 'parentFilter'],
  };
</script>
