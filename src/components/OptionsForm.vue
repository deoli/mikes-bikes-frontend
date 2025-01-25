<template>
  <form v-on:submit.prevent="saveItem">
    <template v-for="resourceOption in resourceOptions" :key="resourceOption.key">
      <template v-if="resourceOption.type == 'string'">
        <div class="form-group mb-3">
          <label class="text-left">{{ resourceOption.key }}</label>
          <input type="text" class="form-control form-control-lg" v-model="localModel[resourceOption.key]" />
        </div>
      </template>
      <template v-else-if="resourceOption.type == 'text'">
        <div class="form-group mb-3">
          <label class="text-left">{{ resourceOption.key }}</label>
          <textarea class="form-control form-control-lg" v-model="localModel[resourceOption.key]">
          </textarea>
        </div>
      </template>
      <template v-else-if="resourceOption.type == 'boolean'">
        <div class="form-check mb-3" v-show="localModel['parent_id']">
          <label class="text-left">{{ resourceOption.key }}</label>
          <input type="checkbox" class="form-check-input" v-model="localModel[resourceOption.key]" />
        </div>
      </template>
      <template v-else-if="resourceOption.type.startsWith('ref')">
        <div class="form-group mb-3" v-show="localModel['parent_id']">
          <label class="text-left">{{ resourceOption.key }}</label>
          <select class="form-control form-control-lg" disabled v-model="localModel[resourceOption.key]">
            <option v-for="item in getList(resourceOption.type.slice(4))" :key="item.id" :value="item.id">{{ item.name }}</option>
          </select>
        </div>
      </template>
    </template>
    <button class="btn btn-primary m-1" type="submit">Save</button>
    <button class="btn btn-secondary m-1" @click.prevent="cancelForm">Cancel</button>
  </form>
</template>

<script>
  export default {
    name: 'OptionsForm',
    props: ['resourceOptions', 'resourceValues'],
    computed: {
      localModel() {
        return Object.assign({}, this.resourceValues);
      },
    },
    methods: {
      getList(resource) {
        if (resource === 'blueprints') {
          return this.$store.getters.stateBlueprints || this.$store.dispatch('getBlueprints');
        }
        if (resource === 'products') {
          return this.$store.getters.stateProducts || this.$store.dispatch('getProducts');
        }
      },
      saveItem() {
        this.$emit('save-form', this.localModel);
      },
      cancelForm() {
        this.$emit('cancel-form');
      }
    }
  };
</script>
