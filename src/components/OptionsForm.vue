<template>
  <form v-on:submit.prevent="saveItem">
    <template v-for="resourceOption in resourceOptions" :key="resourceOption.key">
      <template v-if="resourceOption.type === 'string'">
        <div class="form-group mb-3">
          <label class="text-left">{{ resourceOption.key }}</label>
          <input ref="inputs" type="text" required class="form-control form-control-lg" v-model="localModel[resourceOption.key]" />
        </div>
      </template>
      <template v-else-if="resourceOption.type === 'text'">
        <div class="form-group mb-3">
          <label class="text-left">{{ resourceOption.key }}</label>
          <textarea ref="inputs" class="form-control form-control-lg" v-model="localModel[resourceOption.key]">
          </textarea>
        </div>
      </template>
      <template v-if="resourceOption.type === 'integer'">
        <div class="form-group mb-3"> <!-- should be hidden unless related blueprint is a leaf -->
          <label class="text-left">{{ resourceOption.key }}</label>
          <input ref="inputs" type="number" class="form-control form-control-lg" v-model="localModel[resourceOption.key]" />
        </div>
      </template>
      <template v-else-if="resourceOption.type === 'boolean'">
        <div class="form-check mb-3" v-show="localModel['parent_id'] && localModel['parent_id'].length">
          <label class="text-left">{{ resourceOption.key }}</label>
          <input ref="inputs" type="checkbox" class="form-check-input" v-model="localModel[resourceOption.key]" />
        </div>
      </template>
      <template v-else-if="resourceOption.type.startsWith('ref') && resourceOption.type.slice(4) === 'products'">
        <div class="form-group mb-3" v-show="localModel['parent_id'] && localModel['parent_id'].length">
          <label class="text-left">{{ resourceOption.key }}</label>
          <select ref="inputs" :required="localModel['parent_id'] && localModel['parent_id'].length" multiple class="form-control form-control-lg" v-model="localModel[resourceOption.key]">
            <option v-for="item in getProductParentList()" :key="item.id" :value="item.id">{{ item.name }}</option>
          </select>
        </div>
      </template>
      <template v-else-if="resourceOption.type.startsWith('ref')">
        <div class="form-group mb-3" v-show="localModel['parent_id'] && localModel['parent_id'].length">
          <label class="text-left">{{ resourceOption.key }}</label>
          <select ref="inputs" class="form-control form-control-lg" disabled v-model="localModel[resourceOption.key]">
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
    props: ['resourceType', 'resourceValues'],
    computed: {
      resourceOptions() {
        if (this.resourceType === 'blueprint') {
          return this.$store.getters.stateBlueprintSchema;
        }
        if (this.resourceType === 'product') {
          return this.$store.getters.stateProductSchema;
        }
        return null;
      },
      localModel() {
        return Object.assign({}, this.resourceValues);
      },
    },
    methods: {
      getList(resource) {
        if (resource === 'blueprints') {
          return this.$store.getters.stateBlueprints;
        }
        if (resource === 'products') {
          return this.$store.getters.stateProducts;
        }
      },
      getProductParentList() {
        let blueprintId = this.$route.params.blueprint_id || null;
        let blueprint = this.$store.getters.stateBlueprint(blueprintId);
        let products = [];
        // eslint-disable-next-line no-empty-pattern
        for (let [{}, product] of Object.entries(this.$store.getters.stateProducts)) {
          if (product.blueprint_id == blueprint.parent_id) {
            products.push(product);
          }
        }
        // if (products.length === 0) {
        //   let parent_id = this.$route.params.parent_id || null;
        //   products.push(this.$store.getters.stateProduct(parent_id));
        // }
        return products;
      },
      saveItem() {
        this.$emit('save-form', this.localModel);
      },
      cancelForm() {
        this.$emit('cancel-form');
      }
    },
    mounted() {
      this.$refs.inputs[0].focus();
    }
  };
</script>
