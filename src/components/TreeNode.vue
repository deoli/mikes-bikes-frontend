<template>
  <div v-if="level == 0" class="list-group-item list-group-item-action disabled">
    {{ node.name }}
  </div>
  <router-link v-else-if="action === 'editor'" :to="'/blueprint/' + node.id" class="list-group-item list-group-item-action" :style="'padding-left:' + (1 + (level * 2)) + 'rem'">
    <span style="top: -.5rem; position: relative;">|__</span>
    {{ node.name }}
  </router-link>
  <div v-else-if="action === 'configurator'" class="list-group-item" :style="'padding-left:' + (1 + (level * 2)) + 'rem'">
    <span style="top: -.5rem; position: relative;">|__</span>
    {{ node.name }}
    <ItemSelect :blueprint="node" />
  </div>
  <div v-else class="list-group-item" :style="'padding-left:' + (1 + (level * 2)) + 'rem'">
    <span style="top: -.5rem; position: relative;">|__</span>
    {{ node.name }}
    <ItemPills :blueprint-id="node.id" />
  </div>
  <template v-for="child in node.children" :key="child.id">
    <TreeNode :node="child" :level="level + 1" :action="action" />
  </template>
</template>

<script>
  import TreeNode from '@/components/TreeNode.vue';
  import ItemPills from '@/components/ItemPills.vue';
  import ItemSelect from '@/components/ItemSelect.vue';
  export default {
    name: 'TreeNode',
    components: {
      TreeNode,
      ItemPills,
      ItemSelect,
    },
    props: ['node', 'level', 'action'],
  }
</script>
