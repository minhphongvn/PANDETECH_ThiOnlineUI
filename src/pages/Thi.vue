<template>
  <div>
    <v-dialog v-model="showInputPassword" width="300" persistent>
      <v-card>
        <v-card-title class="grey lighten-4 justify-center"
          >Nhập mật khẩu</v-card-title
        >
        <v-card-text>
          <v-text-field
            v-model="password"
            type="password"
            class="mt-3"
            hide-details="auto"
            :rules="[(v) => !!v || 'Nhập mật khẩu vào!']"
            required
            outlined
            dense
            autofocus
            @keyup.enter="VaoPhongThi"
          ></v-text-field>
        </v-card-text>
        <v-card-actions class="grey lighten-4">
          <v-btn
            :disabled="!password"
            color="primary"
            block
            depressed
            @click="VaoPhongThi"
            >Vào phòng</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <div v-if="phongthi.danhsachthisinh.length > 0 && !dethi">
      <div class="d-flex justify-center rounded grey lighten-4 pa-5">
        <div>
          <div><strong>Kỳ thi:</strong> {{ phongthi.ten }}</div>
          <div><strong>Lớp:</strong> {{ phongthi.lop }}</div>
          <div>
            <strong>Ngày bắt đầu:</strong>
            {{ $moment(phongthi.ngaybatdau).format("LLLL") }}
          </div>
          <div>
            <strong>Thời gian thi:</strong>
            {{ thoigianthi.asMinutes() }} phút
          </div>
          <div><strong>Số lần thi:</strong> {{ phongthi.solanthi }}</div>
        </div>
      </div>
      <div class="text-h5 text-center py-5">
        Vui lòng chọn <strong class="success--text">đúng tên</strong>
        để điểm danh và Bắt đầu thi!
      </div>
      <v-row class="px-4">
        <v-col
          cols="12"
          md="2"
          v-for="thisinh in phongthi.danhsachthisinh"
          :key="thisinh.phone"
        >
          <v-card
            color="primary"
            class="py-3"
            flat
            :disabled="phongthi.solanthi <= thisinh.solanthi"
            :ripple="false"
            @click="DiemDanh(thisinh)"
          >
            <v-card-text class="font-weight-medium text-center white--text">
              <div>{{ thisinh.name }}</div>
              <div>{{ thisinh.phone }}</div>
              <div>Số lần thi: {{ thisinh.solanthi }}</div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>
    <div v-if="dethi && !diem">
      <render-bai-thi
        :batloi="batloi"
        :password="password"
        :thisinh="thisinh"
        :baithi="dethi"
        :time="thoigianthi.asSeconds()"
        @done="getDone"
      />
    </div>
    <div v-if="diem">
      <div
        style="height: 100vh"
        class="d-flex flex-column justify-center align-center"
      >
        <div class="text-h5 font-weight-bold success--text text-center mb-5">
          <v-icon class="mr-2" color="success">mdi-check-circle</v-icon
          ><span>Bài thi đã được nộp </span>
        </div>
        <v-card v-if="diem" class="pa-5" flat outlined>
          <v-card-text class="text-center">
            <div class="text-h6 mb-5">Số câu đúng: {{ socaudung }}</div>
            <div class="text-h3 font-weight-bold success--text">
              {{ diem }} điểm
            </div>
          </v-card-text>
          <v-card-actions class="justify-center">
            <v-btn
              href="#result"
              color="primary"
              @click="viewResult = true"
              text
              >Xem kết quả</v-btn
            >
          </v-card-actions>
        </v-card>
        <div class="mt-5">
          <v-btn to="/" color="grey" outlined icon
            ><v-icon>mdi-arrow-left</v-icon></v-btn
          >
        </div>
      </div>
      <v-row v-if="degoc && viewResult" id="result" justify="center" no-gutters>
        <v-col cols="12" md="6">
          <bai-thi :dethi="JSON.parse(degoc)" :readonly="true" />
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import thiApi from "../api/thi.api";
import RenderBaiThi from "../components/RenderBaiThi.vue";
import BaiThi from "../components/subcomponents/BaiThi.vue";
export default {
  components: { RenderBaiThi, BaiThi },
  data: () => ({
    password: "",
    showInputPassword: false,
    dethi: null,
    thisinh: null,
    diem: 0,
    batloi: false,
    socaudung: "",
    viewResult: false,
    phongthi: {
      solanthi: 0,
      ten: "",
      lop: "",
      ngaybatdau: "",
      ngayketthuc: "",
      danhsachthisinh: [],
      degoc: null,
    },
  }),
  methods: {
    Verify() {
      this.verify_dialog = true;

      this.verify_dialog = false;
    },
    async KiemTraTrangThai() {
      try {
        const { data } = await thiApi.KiemTraTrangThai(this.$route.params.id);
        this.$showAlert(data, "success");
        this.showInputPassword = true;
      } catch (error) {
        if (error.response) {
          this.$showAlert(error.response.data.error, "error");
        }
      }
    },
    async VaoPhongThi() {
      if (!this.password) return;
      try {
        const { data } = await thiApi.VaoPhongThi({
          id: this.$route.params.id,
          password: this.password,
        });
        console.log(data);
        this.phongthi = {
          ...this.phongthi,
          ...data,
        };
        console.log(this.phongthi);
        this.showInputPassword = false;
        this.$showAlert("Đã vào phòng!", "success");
      } catch (error) {
        if (error.response) {
          this.$showAlert(error.response.data.error, "error");
        }
      }
    },
    async DiemDanh(thisinh) {
      try {
        const { data } = await thiApi.DiemDanh({
          id: this.$route.params.id,
          password: this.password,
          phone: thisinh.phone,
        });
        this.thisinh = data.thisinh;
        console.log(this.thisinh);
        this.dethi = JSON.parse(data.dethi);
        this.batloi = data.batloi;
        this.$showAlert("Bắt đầu thi!", "success");
      } catch (error) {
        if (error.response) {
          this.$showAlert(error.response.data.error, "error");
        }
      }
    },
    getDone(data) {
      this.diem = data.diem;
      this.socaudung = data.per;
      this.degoc = data.degoc;
    },
  },
  computed: {
    thoigianthi() {
      return this.$moment.duration(
        this.$moment(this.phongthi.ngayketthuc).diff(
          this.$moment(this.phongthi.ngaybatdau)
        )
      );
    },
  },
  created() {
    this.KiemTraTrangThai();
  },
};
</script>

<style>
</style>