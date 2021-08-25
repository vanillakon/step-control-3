<template>
  <div class="list-filter"></div>
  <ul class="list">
    <li class="list-item" v-for="(item, i) in list" :key="item.id">
      <div class="list-item-title">
        <div>{{ item.text }}</div>
        <div>
          <the-status :status="item.status"></the-status>
        </div>
      </div>
      <hr />
      <div>
        <span>
          <button
            class="btn waves-effect waves-light btn-small purple lighten-2"
            @click="openItem(item.id)"
          >
            More
          </button>
          <button
            class="btn waves-effect waves-light btn-small red lighten-2"
            @click="deleteItem(item.id)"
          >
            Delete
          </button>
        </span>
      </div>
    </li>
  </ul>
</template>
<script>
import { inject } from "vue";
import { useRouter } from "vue-router";
import TheStatus from "./Status.vue";
export default {
  emits: ["action", "open"],
  props: ["list"],
  setup(props, context) {
    const router = useRouter();
    const deleteItem = (id) => {
      context.emit("action", id);
    };
    const openItem = (id) => {
      context.emit("open", id);
    };
    return {
      deleteItem,
      openItem,

      /*  list: inject("list"), */
    };
  },
  components: {
    TheStatus,
  },
};
</script>
