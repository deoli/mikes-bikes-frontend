<template>
  <header>
    <nav class="navbar navbar-expand-md navbar-dark bg-dark">
      <div class="container">
        <a class="navbar-brand" href="/">Mike's Bikes</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarCollapse">
          <ul class="navbar-nav me-auto mb-2 mb-md-0">
            <li class="nav-item">
              <router-link class="nav-link" to="/blueprints">Admin</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/products">Shop</router-link>
            </li>
          </ul>

          <ul class="navbar-nav me-auto mb-2 mb-md-0">
            <li class="nav-item">
              <router-link :class="cartCount ? 'btn btn-warning' : 'nav-link'" to="/cart">Cart <span class="badge badge-light">{{ cartCount }}</span></router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>
  
<script>
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    name: 'NavBar',
    computed: {
      cartCount: function() {
        return this.$store.getters.stateCart.length;
      }
    },
  });
</script>
  
<style scoped>
  a {
    cursor: pointer;
  }
</style>
