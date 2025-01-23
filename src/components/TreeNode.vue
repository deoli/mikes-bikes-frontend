<template>
  <div v-if="level == 0" class="list-group-item list-group-item-action disabled">
    {{ node.name }}
  </div>
  <router-link v-else :to="'/blueprint/' + node.id" class="list-group-item list-group-item-action" :style="'padding-left:' + (1 + (level * 2)) + 'rem'">
    <span style="top: -.5rem; position: relative;">|__</span>
    {{ node.name }}
  </router-link>
  <template v-for="child in node.children" :key="child.id">
    <TreeNode :node="child" :level="level + 1" />
  </template>
</template>

<script>
  import TreeNode from '@/components/TreeNode.vue';
  export default {
    name: 'TreeNode',
    components: {
      TreeNode
    },
    props: ['node', 'level'],
  }
</script>
