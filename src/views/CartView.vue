<template>
  <div class="cart">
    <h1>This is your cart</h1>
    <ul>
      <template v-for="order in cartOrders" :key="order.id">
        <li>{{ order.id }} : {{ order.items.join('-') }}</li>
      </template>
    </ul>
  </div>
</template>

<script>
  // import HelloWorld from '@/components/HelloWorld.vue';
  export default {
    name: 'CartView',
    components: {
      // HelloWorld
    },
    computed: {
      cartOrders() {
        return this.$store.getters.stateCart;
      }
    }
  };
</script>
