<template>
  <div class="header_filters">
    <div class="filter_sorted">
      <p>Sort by:</p>
      <select class="browser-default" v-model="selected">
        <option value="active">Active</option>
        <option value="done">Done</option>
        <option value="canceled">Canceled</option>
      </select>
      <button
        v-if="filtered"
        class="btn purple lighten-2 waves-effect waves-light btn-small"
        @click="reset"
      >
        Reset
      </button>
    </div>
    <div class="filter_search">
      <p>Search:</p>
      <input
        type="text"
        id="inp_search"
        class="browser-default"
        v-model="search"
      />
    </div>
  </div>
</template>
<script>
import { ref, watch, computed } from "vue";

export default {
  emits: ["update:modelValue"],
  props: ["modelValue"],
  setup(_, { emit }) {
    const search = ref("");
    const selected = ref(null);

    watch([search, selected], (values) => {
      emit("update:modelValue", {
        search: values[0],
        selected: values[1],
      });
    });

    const isActive = computed(() => search.value || selected.value);
    const filtered = computed(
      () => search.value.length || selected.value !== null
    );
    return {
      search,
      selected,
      filtered,
      isActive,
      reset: () => {
        search.value = "";
        selected.value = null;
      },
    };
  },
};
</script>
