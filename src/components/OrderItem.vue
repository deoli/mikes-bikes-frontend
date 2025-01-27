<template>
  <div class="card">
    <div class="card-body">
      <h5 class="card-title">Order Nº {{ order.id }}</h5>
      <ul class="card-text" style="font-size: .9rem;">
        <li v-for="item in order.items" :key="item.id">{{ item.name }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'OrderItem',
    props: ['order'],
  };
</script>
