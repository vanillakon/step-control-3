<template>
  <div class="container">
    <app-alert v-if="!alert" :title="gfdgfdgdf" type="primary"></app-alert>
    <div class="inputs">
      <p>{{ task.text }}</p>
      <input type="text" v-model="newTaskMess" />
    </div>
    <div class="btns">
      <button
        class="btn waves-effect waves-light btn-small purple lighten-2"
        @click.prevent="changeItem"
        @click="toggle"
        :disabled="isEmpty"
      >
        Change
      </button>
      <button
        class="btn waves-effect waves-light btn-small purple lighten-2"
        @click.prevent="doneItem"
        @click="toggle"
      >
        Done
      </button>
      <button
        class="btn waves-effect waves-light btn-small purple lighten-2"
        @click.prevent="disabledItem"
        @click="toggle"
      >
        Cancelled
      </button>
      <router-link
        to="/"
        class="btn waves-effect waves-light btn-small red lighten-2"
        >Home</router-link
      >
    </div>
  </div>
</template>
<script>
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { onMounted, computed, ref } from "vue";
import AppAlert from "../components/AppAlert.vue";
import { useAlert } from "../use/alert";
export default {
  setup() {
    const store = useStore();
    const route = useRoute();
    const id = route.params.id;
    const newTaskMess = ref("");
    const alert = ref(false);
    onMounted(() => {
      store.dispatch("tasks/getTasks");
    });
    const task = computed(() => {
      return store.getters["tasks/getTasks"].find((item) => item.id == id);
    });
    const disabledItem = async () => {
      await store.dispatch("tasks/updateTask", {
        id,
        obj: { status: "Canceled" },
      });
    };
    const doneItem = async () => {
      await store.dispatch("tasks/updateTask", {
        id,
        obj: { status: "Done" },
      });
    };
    const changeItem = async () => {
      await store.dispatch("tasks/updateTask", {
        id,
        obj: { text: newTaskMess.value.toUpperCase() },
      });
      newTaskMess.value = "";
    };
    const isEmpty = computed(() => !newTaskMess.value.trim().length);
    return {
      id,
      task,
      disabledItem,
      doneItem,
      newTaskMess,
      changeItem,
      isEmpty,
      alert,
      ...useAlert(true),
    };
  },
  components: {
    AppAlert,
  },
};
</script>
