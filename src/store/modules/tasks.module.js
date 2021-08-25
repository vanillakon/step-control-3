import store from "../index";
import fb from "./fb.module";
export default {
  namespaced: true,
  state() {
    return {
      tasks: [],
    };
  },
  getters: {
    getTasks: (state) => state.tasks,
    getSortedTasks: (state) => state.sortedTasks,
  },
  mutations: {
    setTasks(state, tasks) {
      state.tasks = tasks;
      store.state.loading = false;
    },
  },
  actions: {
    async addTask({}, payload) {
      const db = store.getters["fb/getDB"];
      await db
        .collection("tasks")
        .doc(`${payload.id}`)
        .set(payload);
    },
    async getTasks({ commit }) {
      try {
        const db = store.getters["fb/getDB"];
        await db
          .collection("tasks")
          .orderBy("id", "asc")
          .onSnapshot((snap) => {
            const tasks = snap.docs.map((task) => task.data());
            commit("setTasks", tasks);
          });
      } catch (e) {
        console.log(e.message);
      }
    },

    async deleteTask({}, payload) {
      try {
        const db = store.getters["fb/getDB"];
        await db
          .collection("tasks")
          .doc(`${payload}`)
          .delete();
      } catch (e) {
        console.log(e.message);
      }
    },

    async updateTask({}, payload) {
      try {
        const db = store.getters["fb/getDB"];
        await db
          .collection("tasks")
          .doc(`${payload.id}`)
          .update(payload.obj);
      } catch (e) {
        console.log(e.message);
      }
    },
  },
};
