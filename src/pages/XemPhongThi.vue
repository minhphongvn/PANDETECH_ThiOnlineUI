<template>
  <div class="pt-5">
    <div class="text-center text-subtitle-2">
      <span class="px-5 py-1 primary rounded mr-1"></span> Chưa thi
      <span class="mx-3"></span>
      <span class="px-5 py-1 warning rounded mr-1"></span> Chưa nộp bài
      <span class="mx-3"></span>
      <span class="px-5 py-1 success rounded mr-1"></span> Đã nộp bài
    </div>
    <v-row class="pa-4 mt-2">
      <v-col
        cols="12"
        md="2"
        v-for="thisinh in phongthi.danhsachthisinh"
        :key="thisinh.phone"
      >
        <v-card
          :color="
            thisinh.solanthi > 0
              ? !thisinh.bainop
                ? 'warning'
                : 'success'
              : 'primary'
          "
          class="py-3"
          flat
          @click="XemBaiThi(thisinh)"
          :ripple="false"
        >
          <v-card-text class="font-weight-medium text-center white--text">
            <!-- <div>Chan</div>
            <div>0987654321</div>
            <div>Số lần thi: 2</div> -->
            <div>{{ thisinh.name }}</div>
            <div>{{ thisinh.phone }}</div>
            <div>Số lần thi: {{ thisinh.solanthi }}</div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import phongthiApi from "../api/phongthi.api";
import XlsExport from "../utils/xls-export";
export default {
  data: () => ({
    phongthi: [],
  }),
  methods: {
    async XemBaiThi(thisinh) {
      if (!thisinh.bainop) return;
      console.log(thisinh);
    },
    async getThongTinPhongThi() {
      try {
        const { data } = await phongthiApi.layThongTinPhongThi(
          this.$route.params.id
        );
        // this.$showAlert("Lấy thành công!", "success");
        console.log(data);
        this.phongthi = data;
        // const ds = data.danhsachthisinh;
        // delete ds.bainop;
        // console.log(ds);
        // this.exportXLS(ds);
      } catch (error) {
        if (error.response) {
          this.$showAlert(error.response.data.error, "error");
        }
      }
    },
    exportXLS(data) {
      const xls = new XlsExport(data, "Example WB");
      xls.exportToXLS(`${this.phongthi.ten}.xls`);
    },
  },
  created() {
    this.getThongTinPhongThi();
  },
};
</script>

<style>
</style>