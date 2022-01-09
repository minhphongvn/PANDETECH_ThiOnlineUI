<template>
  <div id="app">
    <v-app>
      <nprogress-container></nprogress-container>
      <router-view />
      <v-snackbar
        :color="$store.state.alertType"
        top
        v-model="showAlert"
        :timeout="2000"
      >
        <strong>{{ $store.state.alertMsg }}</strong>
      </v-snackbar>
      <v-overlay :value="overlay">
        <v-progress-circular indeterminate size="48"></v-progress-circular>
      </v-overlay>
    </v-app>
  </div>
</template>

<script>
import NprogressContainer from "vue-nprogress/src/NprogressContainer";
export default {
  components: {
    NprogressContainer,
  },
  watch: {
    $route: {
      immediate: true,
      handler(to) {
        document.title = to.meta.title || "PANDETECH - Hệ thống thi online";
      },
    },
  },
  computed: {
    showAlert: {
      get() {
        return this.$store.state.alertOn;
      },
      set(value) {
        this.$store.state.alertOn = value;
      },
    },
    overlay() {
      return this.$store.state.loading;
    },
  },
};
</script>

<style lang="scss">
// html {
//   scroll-behavior: smooth;
// }
</style>
