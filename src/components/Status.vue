<template>
  <p :class="color" class="status">{{ status }}</p>
</template>
<script>
import { computed } from "vue";
export default {
  props: ["status"],
  setup(props) {
    let status = props.status;
    const color = computed(() => status.toLowerCase());
    return { status, color };
  },
};
</script>
