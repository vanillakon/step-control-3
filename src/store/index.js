import { createStore } from "vuex";
import fb from "./modules/fb.module";
import tasks from "./modules/tasks.module";
export default createStore({
  modules: {
    fb,
    tasks,
  },
  state() {
    return {
      loading: true,
    };
  },
});
