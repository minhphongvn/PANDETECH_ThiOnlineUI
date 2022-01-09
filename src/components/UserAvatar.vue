<template>
  <v-menu
    bottom
    min-width="200px"
    rounded
    offset-y
    transition="slide-y-transition"
  >
    <template v-slot:activator="{ on }">
      <v-btn icon v-on="on">
        <v-avatar color="brown" size="28">
          <span class="white--text">{{ avatar() }}</span>
        </v-avatar>
      </v-btn>
    </template>
    <v-card>
      <v-list-item-content class="justify-center">
        <div class="mx-auto text-center">
          <v-avatar color="brown">
            <span class="white--text text-h5">{{ avatar() }}</span>
          </v-avatar>
          <div class="mt-3 font-weight-medium">{{ user.hoten }}</div>
          <p class="mt-1">
            {{ user.phonenumber }}
          </p>
          <p class="indigo--text text-center font-weight-medium">
            {{ user.type === "giaovien" ? "Giáo viên" : "Học sinh" }}
          </p>
          <v-divider class="my-3"></v-divider>
          <v-btn @click="DangXuat" outlined depressed text> Đăng xuất </v-btn>
        </div>
      </v-list-item-content>
    </v-card>
  </v-menu>
</template>

<script>
export default {
  methods: {
    avatar() {
      const user = this.user.hoten.split(" ");
      return user[user.length - 1][0] + user[0][0];
    },
    DangXuat() {
      localStorage.removeItem("awt");
      this.$store.commit("setToken", null);
      this.$router.push({ name: "Login" });
    },
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
};
</script>

<style>
</style>