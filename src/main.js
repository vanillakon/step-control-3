import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import Loader from "./components/AppLoader";
import "materialize-css/dist/js/materialize.min";
import "./style.css";

const app = createApp(App);
app.use(store);
app.use(router);
app.component("Loader", Loader);
app.mount("#app");
