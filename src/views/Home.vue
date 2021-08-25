<template>
  <div class="container">
    <div class="row">
      <form class="col s12" @keypress.enter="addTask">
        <div class="row">
          <div class="input-field col s9">
            <textarea
              id="icon_prefix2"
              class="materialize-textarea"
              v-model="inp"
            ></textarea>
          </div>
          <div class="input-field col s2">
            <button
              class="btn purple lighten-2 waves-effect waves-light btn-small"
              @click.prevent="addTask"
            >
              Add
            </button>
          </div>
        </div>
      </form>
      <the-filter v-model="filter"></the-filter>
      <loader />
    </div>
    <div v-if="isEmpty" class="no-tasks">No Tasks...</div>
    <the-list @open="openTask" @action="del" :list="list"></the-list>
  </div>
  <teleport to="#modal">
    <the-modal-delete
      v-if="isOpen"
      @close="isOpen = false"
      @delete="removeThisTask(delTaskId)"
    ></the-modal-delete>
  </teleport>
</template>
<script>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import TheModalDelete from "../components/ModalDelete.vue";
import TheList from "../components/List.vue";
import TheFilter from "../components/Filter.vue";
export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    const task = ref({});
    const inp = ref("");
    const delTaskId = ref("");
    const isOpen = ref(false);
    const filter = ref({});

    onMounted(() => {
      store.dispatch("tasks/getTasks");
    });

    let list = computed(() =>
      store.getters["tasks/getTasks"]
        .filter((elem) => {
          if (filter.value.search) {
            return elem["text"]
              .toLowerCase()
              .includes(filter.value.search.toLowerCase());
          }
          return elem;
        })
        .filter((elem) => {
          if (filter.value.selected) {
            return (
              elem["status"].toLowerCase() ==
              filter.value.selected.toLowerCase()
            );
          }
          return elem;
        })
    );
    const isEmpty = computed(() =>
      !store.state.loading && !list.value.length ? true : false
    );
    const load = computed(() => {
      return list.value.length ? true : false;
    });

    const addTask = () => {
      if (inp.value.trim().length) {
        store.dispatch("tasks/addTask", {
          idNum: list.value.length + 1,
          id: Date.now(),
          text: inp.value.toUpperCase(),
          status: "Active",
        });
        inp.value = "";
      }
    };
    const openTask = (id) => {
      router.push(`/home/${id}`);
    };
    const del = (id) => {
      delTaskId.value = id;
      isOpen.value = true;
    };
    const removeThisTask = async (val) => {
      await Promise.all([
        store.dispatch("tasks/deleteTask", val),
        (isOpen.value = false),
      ]);
    };

    return {
      addTask,
      removeThisTask,
      del,
      openTask,
      open,
      inp,
      list,
      task,
      delTaskId,
      isOpen,
      isEmpty,
      filter,
      load,
    };
  },
  components: {
    TheList,
    TheModalDelete,
    TheFilter,
  },
};
</script>
