<template>
  <div id="app">
    <NavBar />
    <div class="main container">
      <router-view/>
    </div>
  </div>
</template>

<script>
  import NavBar from '@/components/NavBar.vue';
  export default {
    components: {
      NavBar
    },
    beforeCreate() {
      this.$store.dispatch('getBlueprints');
      this.$store.dispatch('getProducts');
      this.$store.dispatch('getProductRelations');
      this.$store.dispatch('optionsBlueprints');
      this.$store.dispatch('optionsProducts');
    },
  };
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }
  .main {
    padding-top: 3em;
    padding-bottom: 3em;
  }
</style>
