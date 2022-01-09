<template>
  <v-row class="py-3" justify="center">
    <v-col cols="12" md="6">
      <v-card flat outlined>
        <v-card-title class="text-body-1">
          <div>
            <div class="font-weight-medium">Lớp {{ tenlop }}</div>
            <div class="text-subtitle-2 font-weight-regular">
              Danh sách học sinh
            </div>
          </div>
          <v-spacer /><them-hoc-sinh @change="layThongTinLop"
        /></v-card-title>
        <v-divider></v-divider>
        <v-card-text class="text-start">
          <div>
            <!-- <hoc-sinh-card
              :name="hs.name"
              :phone="hs.phone"
              v-for="hs in danhsachhocsinh"
              :key="hs.phone"
            /> -->
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Tìm kiếm"
              single-line
              clearable
              hide-details
            ></v-text-field>
            <v-data-table
              :headers="headers"
              :items="danhsachhocsinh"
              :search="search"
              no-data-text="Chưa có dữ liệu"
              no-results-text="Chưa có dữ liệu"
            ></v-data-table>
          </div>
        </v-card-text>
        <!-- <v-card-actions class="grey lighten-4">
          <v-spacer></v-spacer>
        </v-card-actions> -->
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import ThemHocSinh from "./component/ThemHocSinh.vue";
import lopApi from "../../api/lop.api";
export default {
  components: { ThemHocSinh },
  data: () => ({
    idLop: "",
    headers: [
      { text: "Họ và tên", value: "name" },
      { text: "Số điện thoại", value: "phone" },
    ],
    search: "",
    tenlop: "",
    danhsachhocsinh: [],
  }),
  methods: {
    async layThongTinLop() {
      try {
        this.$store.commit("setLoading", true);
        const { data } = await lopApi.layThongTinLop(this.$route.params.id);
        this.danhsachhocsinh = data.danhsachhocsinh;
        this.tenlop = data.tenlop;
        this.$store.commit("setLoading", false);
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    this.idLop = this.$route.params.id;
    this.layThongTinLop();
  },
};
</script>

<style>
</style>