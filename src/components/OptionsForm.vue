<template>
  <form>
    <template v-for="resourceOption in resourceOptions" :key="resourceOption.key">
      <div class="form-group">
        <label>{{ resourceOption.key }}</label>
        <input v-if="resourceOption.type == 'string'" type="text" class="form-control" v-model="localModel[resourceOption.key]" />
        <input v-else-if="resourceOption.type == 'boolean'" type="checkbox" class="form-check-input" v-model="localModel[resourceOption.key]" />
        <textarea v-else-if="resourceOption.type == 'text'" class="form-control" v-model="localModel[resourceOption.key]">
        </textarea>
        <select v-else-if="resourceOption.type == 'integer'" class="form-control" v-model="localModel[resourceOption.key]">
        </select>
      </div>
    </template>
  </form>
</template>

<script>
  export default {
    name: 'OptionsForm',
    props: ['resourceOptions', 'resourceValues'],
    computed: {
      localModel() {
        return this.resourceValues;
      },
    }
  };
</script>
