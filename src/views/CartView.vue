<template>
  <div class="cart">
    <h1>This is your cart</h1>
    <div>
      <template v-for="order in cartOrders" :key="order.id">
        <OrderItem :order="order" />
      </template>
    </div>
  </div>
</template>

<script>
  import OrderItem from '@/components/OrderItem.vue';
  export default {
    name: 'CartView',
    components: {
      OrderItem
    },
    computed: {
      cartOrders() {
        return this.$store.getters.stateCart;
      }
    }
  };
</script>
