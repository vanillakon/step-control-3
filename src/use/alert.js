import { ref } from "vue";

export function useAlert(visibility = false) {
  const alert = ref(visibility);

  const toggle = () => {
    alert.value = !alert.value;
    setTimeout(() => {
      alert.value = !alert.value;
    }, 1500);
  };

  return { alert, toggle };
}
