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
    </v-app-bar>
    <v-main class="bg-main px-5">
      <div class="text-center py-6">
        <span class="text-h5 text-uppercase font-weight-light primary--text"
          >Kỳ thi của bạn</span
        >
      </div>
      <v-row class="py-3">
        <v-col cols="12" md="3" v-for="kythi in danhsachkythi" :key="kythi.id">
          <v-card :to="`thi/${kythi.id}`" :ripple="false" flat outlined>
            <v-card-text class="text-start">
              <div class="text-end">
                <span
                  v-if="
                    kythi.trangthai &&
                    $moment().isBetween(kythi.ngaybatdau, kythi.ngayketthuc)
                  "
                  class="success--text font-weight-medium"
                  ><v-icon color="success" small>mdi-circle</v-icon> Đang
                  thi</span
                >
                <span
                  v-else-if="
                    kythi.trangthai && $moment().isAfter(kythi.ngayketthuc)
                  "
                  class="purple--text font-weight-medium"
                  ><v-icon color="purple" small>mdi-circle</v-icon> Đã kết
                  thúc</span
                >
                <span
                  v-else-if="kythi.trangthai"
                  class="warning--text font-weight-medium"
                  ><v-icon color="warning" small>mdi-circle</v-icon> Đã mở</span
                >
                <span class="grey--text" v-else
                  ><v-icon color="grey" small>mdi-circle</v-icon> Đang
                  đóng</span
                >
              </div>
              <div class="font-weight-bold">{{ kythi.ten }}</div>

              <div>
                <span class="font-weight-medium"> Ngày thi: </span>
                <span>{{ $moment(kythi.ngaybatdau).format("LLLL") }}</span>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-main>
  </v-app>
</template>

<script>
import UserAvatar from "../components/UserAvatar.vue";
import hocsinApi from "../api/hocsinh.api";
export default {
  components: { UserAvatar },
  data: () => ({
    danhsachkythi: [],
  }),
  methods: {
    async layDanhSachPhongThi() {
      try {
        this.$store.commit("setLoading", true);
        const { data } = await hocsinApi.layDanhSach();
        this.danhsachkythi = data;
        this.$store.commit("setLoading", false);
      } catch (error) {
        if (error.response) {
          this.loading = false;
          this.$showAlert(error.response.data.error, "error");
        }
      }
    },
  },
  created() {
    this.layDanhSachPhongThi();
  },
};
</script>

<style lang="scss" scoped>
.bg-main {
  background-color: #ecf0f5;
}
</style>