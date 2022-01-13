<template>
  <div class="pt-5">
    <v-dialog
      v-model="showDethi"
      :width="$vuetify.breakpoint.mobile ? '' : '50%'"
      scrollable
    >
      <bai-thi :dethi="JSON.parse(dethi)" :readonly="true" />
    </v-dialog>
    <v-dialog
      v-if="thisinh"
      v-model="showBai"
      :width="$vuetify.breakpoint.mobile ? '' : '50%'"
      scrollable
    >
      <div class="white">
        <div class="d-flex align-center pa-4">
          <v-img
            class="rounded"
            src="../assets/avatar.jpeg"
            max-width="100"
            height="100"
            contain
          ></v-img>
          <div class="pl-4">
            <div>
              <span class="font-weight-medium">Tên: </span> {{ thisinh.name }}
            </div>
            <div>
              <span class="font-weight-medium">MSSV: </span> {{ thisinh.phone }}
            </div>
            <div>
              <span class="font-weight-medium">Số lần thi: </span>
              {{ thisinh.solanthi }}
            </div>
            <div v-if="thisinh.bainop">
              <span class="font-weight-medium">Điểm: </span>
              {{ thisinh.diem }}
            </div>
            <div v-if="thisinh.vipham">
              <span class="font-weight-medium">Vi phạm: </span>
              {{ thisinh.vipham }}
            </div>
          </div>
        </div>
        <bai-thi :dethi="JSON.parse(thisinh.bainop)" :readonly="true" />
      </div>
    </v-dialog>
    <v-toolbar flat outlined rounded dense>
      <div class="text-center text-subtitle-2">
        <span class="px-5 py-1 primary rounded mr-1"></span> Chưa thi
        <span class="mx-3"></span>
        <span class="px-5 py-1 warning rounded mr-1"></span> Chưa nộp bài
        <span class="mx-3"></span>
        <span class="px-5 py-1 success rounded mr-1"></span> Đã nộp bài
      </div>
      <v-spacer></v-spacer>
      <v-btn @click="showDe" class="mr-2" color="primary" text
        >Xem đề thi</v-btn
      >
      <v-btn @click="exportXLS" color="primary" text>Xuất điểm</v-btn>
    </v-toolbar>

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
          <v-card-text class="font-weight-medium text-start white--text">
            <div>{{ thisinh.name }}</div>
            <div>{{ thisinh.phone }}</div>
            <div>Số lần thi: {{ thisinh.solanthi }}</div>
            <div v-if="thisinh.bainop">Điểm: {{ thisinh.diem }}</div>
            <div v-if="thisinh.vipham">Vi phạm: {{ thisinh.vipham }}</div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import phongthiApi from "../api/phongthi.api";
import dethiApi from "../api/dethi.api";
import BaiThi from "../components/subcomponents/BaiThi.vue";
import XlsExport from "../utils/xls-export";
export default {
  components: { BaiThi },
  data: () => ({
    phongthi: [],
    showDethi: false,
    showBai: false,
    dethi: null,
    thisinh: null,
  }),

  methods: {
    showDe() {
      if (this.dethi) {
        this.showDethi = true;
      }
    },
    async XemBaiThi(thisinh) {
      if (!thisinh.bainop) return;
      this.showBai = true;
      this.thisinh = thisinh;
    },
    async getDethi(id) {
      try {
        const { data } = await dethiApi.layThongTinDeThi(id);
        // this.$showAlert("Lấy thành công!", "success");
        this.dethi = data.noidung;
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
    async getThongTinPhongThi() {
      try {
        const { data } = await phongthiApi.layThongTinPhongThi(
          this.$route.params.id
        );
        // this.$showAlert("Lấy thành công!", "success");
        this.phongthi = data;
        this.getDethi(data.dethiid);
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
    exportXLS() {
      const renew = this.phongthi.danhsachthisinh.map(
        ({ name, phone, diem, solanthi, vipham }) => ({
          name,
          phone,
          diem,
          solanthi,
          vipham,
        })
      );
      const xls = new XlsExport(renew, "Example WB");
      xls.exportToXLS(`${this.phongthi.ten}.xls`);
    },
  },
  created() {
    this.getThongTinPhongThi();
  },
  mounted() {
    setInterval(async () => {
      await this.getThongTinPhongThi();
    }, 5000);
  },
  watch: {
    showBai() {
      if (!this.showBai) {
        this.thisinh = null;
      }
    },
  },
};
</script>

<style>
</style>