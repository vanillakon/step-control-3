<template>
  <div class="modal-backdrop" @click="$emit('close')"></div>
  <div class="modal-div">
    <div class="icon-container">
      <i class="material-icons small" @click="$emit('close')">close</i>
    </div>
    <div class="delete-form">
      <div class="delete-form-body">
        <p>Are you sure you want to permanently remove this task?</p>
      </div>
      <div class="delete-form-footer">
        <button
          class="btn btn-small waves-effect waves-dark grey lighten-1 black-text delete-ok"
          type="button"
          :disabled="disabled"
          @click.prevent="$emit('delete')"
        >
          Ok
        </button>
        <button
          class="btn btn-small waves-effect waves-dark grey lighten-1 black-text"
          type="button"
          @click.prevent="$emit('close')"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  emits: ["close", "delete"],
};
</script>
