<template>
  <TreeNode :node="getNode" :level="0" />
</template>

<script>
  import TreeNode from '@/components/TreeNode.vue';
  export default {
    name: 'TreeView',
    props: ['rootId'],
    components: {
      TreeNode,
    },
    computed: {
      getNode() {
        return this.getNodeWithChildren(this.rootId);
      },
    },
    beforeCreate() {
      this.$store.getters.stateBlueprints || this.$store.dispatch('getBlueprints');
    },
    methods: {
      getNodeWithChildren(id) {
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
  