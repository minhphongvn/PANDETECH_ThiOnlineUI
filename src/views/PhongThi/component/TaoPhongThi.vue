<template>
  <v-dialog
    v-model="dialog"
    :width="550"
    persistent
    transition="slide-y-reverse-transition"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn v-bind="attrs" v-on="on" color="primary" depressed
        >+ Tạo phòng thi</v-btn
      >
    </template>

    <v-card>
      <v-card-title class="text-h6 grey lighten-4">
        Tạo phòng thi
      </v-card-title>

      <v-card-text class="pt-3">
        <v-form ref="taophong" v-model="valid">
          <v-text-field
            required
            v-model="phongthi.ten"
            :rules="[rules.required]"
            label="Tên phòng"
            type="text"
            outlined
            dense
          ></v-text-field>
          <date-picker
            v-model="phongthi.ngaybatdau"
            label="Thời gian bắt đầu"
          />
          <date-picker
            v-model="phongthi.ngayketthuc"
            label="Thời gian kết thúc"
          />
          <v-text-field
            required
            v-model="phongthi.password"
            :rules="[rules.required]"
            label="Mật khẩu"
            type="text"
            outlined
            dense
          ></v-text-field>
          <v-text-field
            required
            v-model="phongthi.solanthi"
            :rules="[
              rules.required,
              (v) => (v >= 1 && v <= 5) || 'Số lần thi chỉ từ 1~5 lần',
            ]"
            label="Số lần thi"
            type="number"
            outlined
            dense
          ></v-text-field>
          <v-switch
            v-model="phongthi.trangthai"
            label="Xuất bản"
            class="mt-0 pt-0"
            dense
            inset
          ></v-switch>
          <v-combobox
            v-model="phongthi.danhsachthisinh"
            :rules="[rules.required]"
            :items="danhSachLop"
            item-text="name"
            label="Lớp"
            dense
            outlined
          ></v-combobox>
          <v-combobox
            v-model="phongthi.dethi"
            :rules="[rules.required]"
            :items="danhSachDeThi"
            item-text="ten"
            label="Đề thi"
            dense
            outlined
          ></v-combobox>
        </v-form>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          :disabled="!valid"
          color="primary"
          depressed
          @click="TaoPhongThi"
        >
          Tạo phòng
        </v-btn>
        <v-btn color="grey" depressed outlined @click="dialog = false">
          Huỷ
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import lopApi from "../../../api/lop.api";
import dethiApi from "../../../api/dethi.api";
import DatePicker from "../../../components/DatePicker.vue";
import phongthiApi from "../../../api/phongthi.api";
export default {
  components: { DatePicker },
  data: () => ({
    dialog: false,
    menuDate: false,
    date: "",
    phongthi: {
      ten: "",
      ngaybatdau: "",
      ngayketthuc: "",
      solanthi: 1,
      password: "",
      trangthai: false,
      danhsachthisinh: "",
      dethi: "",
    },
    dsNamHoc: [],
    rules: {
      required: (value) => !!value || "Yêu cầu nhập.",
    },
    danhSachDeThi: [],
    danhSachLop: [],
    valid: true,
  }),
  methods: {
    reset() {
      Object.assign(this.$data, this.$options.data.apply(this));
      this.layDanhSachDeThi();
      this.layDanhSachLop();
    },
    async TaoPhongThi() {
      try {
        // console.log({ user: this.user });
        this.$store.commit("setLoading", true);
        const body = {
          ...this.phongthi,
          danhsachthisinh: this.phongthi.danhsachthisinh?.id,
          dethi: this.phongthi.dethi?.id,
          phonenumber: this.user.phonenumber,
        };
        // console.log(body);
        const { data } = await phongthiApi.TaoPhongThi(body);
        this.reset();
        this.$store.commit("setLoading", false);
        this.$showAlert(data, "success");
        // this.tenLop = "";
        // this.$store.commit("setAlert", {
        //   type: "success",
        //   msg: data,
        // });
        this.$emit("done");
        // this.dialog = false;
      } catch (error) {
        if (error.response) {
          this.$showAlert(error.response.data.error, "error");
        }
        console.log(error);
      }
    },
    async layDanhSachDeThi() {
      try {
        console.log("layDanhSachDeThi");
        const { data } = await dethiApi.layDanhSach();
        console.log(data);
        this.danhSachDeThi = data;
      } catch (error) {
        if (error.response) {
          this.$showAlert(error.response.data.error, "error");
        }
      }
    },
    async layDanhSachLop() {
      try {
        console.log("layDanhSachLop");
        const { data } = await lopApi.layDanhSach();
        console.log(data);
        this.danhSachLop = data;
      } catch (error) {
        if (error.response) {
          this.$showAlert(error.response.data.error, "error");
        }
      }
    },
  },
  watch: {
    namhoc: function (val) {
      this.namhoc = `${parseInt(val)} - ${parseInt(val) + 1}`;
    },
  },
  created() {
    if (!(this.phongthi.ngaybatdau && this.phongthi.ngayketthuc)) {
      const date =
        new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
          .toISOString()
          .substr(0, 10) +
        " " +
        this.$moment().format("HH:mm");

      this.phongthi.ngaybatdau = date;
      this.phongthi.ngayketthuc = date;
    }
    this.layDanhSachDeThi();
    this.layDanhSachLop();
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