<template>
  <div class="alert" :class="type" @click="$emit('close')">
    <!--   <p class="alert-title"></p> -->
    <p>Changes were made successfully!</p>
  </div>
</template>

<script>
export default {
  emits: ["close"],
  props: ["title", "type"],
};
</script>
