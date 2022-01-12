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
          <v-spacer />
          <verify-dialog
            msg="Xác nhận xoá lớp này!"
            iconsrc="mdi-delete"
            class="mr-2"
            color="grey"
            icon
          >
            <v-btn color="error" text @click="deleteLop">Xoá lớp</v-btn>
          </verify-dialog>
          <them-hoc-sinh @change="layThongTinLop" />
        </v-card-title>
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
              :loading="loading"
              loading-text="Đang tải... vui lòng chờ!"
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
import VerifyDialog from "../../components/VerifyDialog.vue";
export default {
  components: { ThemHocSinh, VerifyDialog },
  data: () => ({
    idLop: "",
    headers: [
      { text: "Họ và tên", value: "name" },
      { text: "Số điện thoại", value: "phone" },
    ],
    search: "",
    tenlop: "",
    danhsachhocsinh: [],
    loading: false,
  }),
  methods: {
    async layThongTinLop() {
      try {
        this.loading = true;
        const { data } = await lopApi.layThongTinLop(this.$route.params.id);
        this.danhsachhocsinh = data.danhsachhocsinh;
        this.tenlop = data.tenlop;
        this.loading = false;
      } catch (error) {
        console.log(error);
      }
    },
    async deleteLop() {
      try {
        this.loading = true;
        await lopApi.xoaLop(this.$route.params.id);
        this.$showAlert("Đã xoá thành công!", "success");
        this.loading = false;
        this.$router.go(-1);
      } catch (error) {
        if (error.response) {
          this.$showAlert(error.response.data.error, "error");
        }
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