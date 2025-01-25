<template>
  <TreeNode :node="getNode" :level="0" :action="nodeAction" />
</template>

<script>
  import TreeNode from '@/components/TreeNode.vue';
  export default {
    name: 'TreeView',
    props: ['rootId', 'nodeAction'],
    components: {
      TreeNode,
    },
    computed: {
      getNode() {
        return this.getNodeWithChildren(this.rootId);
      },
    },
    methods: {
      getNodeWithChildren(id) {
        if (id === undefined) {
          return {};
        }

        let parentNode = this.$store.getters.stateBlueprint(id);
        parentNode.children = [];
        for (let [child_id, blueprint] of Object.entries(this.$store.getters.stateBlueprints)) {
          if (blueprint.parent_id == id) {
            parentNode.children.push(this.getNodeWithChildren(child_id));
          }
        }
        return parentNode;
      }
    },
  };
</script>
  