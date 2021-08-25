<template>
  <div class="preloader" v-if="$store.state.loading">
    <div class="progress">
      <div class="indeterminate"></div>
    </div>
  </div>
</template>
