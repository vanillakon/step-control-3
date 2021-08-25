import firebase from "firebase/app";
import "firebase/firestore";

firebase.initializeApp({
  apiKey: "AIzaSyBlkI_vFzvA8gylzVXu7X1XBz-kRFqoR3c",
  authDomain: "vue-todo-app-a37ac.firebaseapp.com",
  projectId: "vue-todo-app-a37ac",
  storageBucket: "vue-todo-app-a37ac.appspot.com",
  messagingSenderId: "167452491033",
  appId: "1:167452491033:web:c39000b33c316659871988",
});

export default {
  namespaced: true,
  state() {
    return {
      db: firebase.firestore(),
    };
  },
  getters: {
    getDB: (state) => state.db,
  },
};
