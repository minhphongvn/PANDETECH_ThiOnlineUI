<template>
  <v-app>
    <v-main>
      <v-container fill-height>
        <v-row dense justify="center" align="center" no-gutters>
          <v-col class="text-center" cols="12" md="4">
            <v-card class="pa-4" flat>
              <v-card-title
                class="text-h4 font-weight-bold justify-center primary--text"
                >PANDETECH</v-card-title
              >
              <v-card-subtitle class="text-h6 font-weight-light"
                >Hệ thống tạo bài thi online</v-card-subtitle
              >
              <v-card-text class="mt-6">
                <v-btn to="/register" color="error" depressed rounded block
                  >Đăng ký</v-btn
                >
                <v-btn
                  to="/login"
                  class="mt-2"
                  color="primary"
                  depressed
                  rounded
                  block
                  >Đăng nhập</v-btn
                >
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <chan-trang></chan-trang>
  </v-app>
</template>

<script>
import ChanTrang from "../components/ChanTrang.vue";
export default {
  components: { ChanTrang },
  computed: {
    isMobile() {
      return this.$vuetify.breakpoint.mobile;
    },
  },
};
</script>

<style>
</style>