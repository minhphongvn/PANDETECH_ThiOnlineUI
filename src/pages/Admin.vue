<template>
  <v-app>
    <v-app-bar color="white" flat dense fixed app>
      <v-app-bar-title class="primary--text font-weight-bold"
        ><router-link class="text-decoration-none" to="/admin"
          >PANDETECH</router-link
        ></v-app-bar-title
      >
      <v-spacer />
      <v-btn icon><v-icon>mdi-bell-outline</v-icon></v-btn>
      <user-avatar />
      <quick-menu />
    </v-app-bar>
    <v-main class="bg-main px-5">
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import QuickMenu from "../components/QuickMenu.vue";
import UserAvatar from "../components/UserAvatar.vue";
export default {
  components: { UserAvatar, QuickMenu },
  methods: {},
};
</script>

<style lang="scss" scoped>
.bg-main {
  background-color: #ecf0f5;
}
</style>