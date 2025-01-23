<template>
  <div class="card" :style="'margin-left:' + level + 'rem'">
    <div class="card-body">
      {{ node.name }}
    </div>
  </div>
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
