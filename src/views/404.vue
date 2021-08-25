<template> </template>
<script>
import { useRouter } from "vue-router";
export default {
  setup() {
    const router = useRouter();
    const back = () => router.push("./");
    return {
      back,
    };
  },
};
</script>
