<template>
  <div class="blueprint">
    <h1>This is a form for blueprints</h1>
    <OptionsForm resource-name="blueprints" />
  </div>
</template>

<script>
  import OptionsForm from '@/components/OptionsForm.vue'

  export default {
    name: 'HomeView',
    components: {
      OptionsForm
    }
  }
</script>
