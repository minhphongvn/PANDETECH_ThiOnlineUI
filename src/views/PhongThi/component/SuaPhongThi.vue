<template>
  <v-dialog
    v-model="dialog"
    :width="550"
    persistent
    transition="slide-y-reverse-transition"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn v-bind="attrs" v-on="on" color="orange" small depressed icon
        ><v-icon>mdi-pencil</v-icon></v-btn
      >
    </template>

    <v-card>
      <v-card-title class="text-h6 grey lighten-4">
        Sửa phòng thi
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
            v-model="phongthi.batloi"
            label="Bắt lỗi cảnh cáo"
            class="mt-0 pt-0"
            dense
            inset
          ></v-switch>
          <v-switch
            v-model="phongthi.trangthai"
            :label="phongthi.trangthai ? 'Kỳ thi đã mở' : 'Kỳ thi đang đóng'"
            dense
            inset
            hide-details="auto"
          ></v-switch>
        </v-form>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          :disabled="!valid"
          color="primary"
          depressed
          @click="CapNhatPhongThi"
        >
          Cập nhật
        </v-btn>
        <v-btn color="grey" depressed outlined @click="dialog = false">
          Huỷ
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import DatePicker from "../../../components/DatePicker.vue";
import phongthiApi from "../../../api/phongthi.api";
export default {
  components: { DatePicker },
  props: ["value"],
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
      batloi: false,
    },
    dsNamHoc: [],
    rules: {
      required: (value) => !!value || "Yêu cầu nhập.",
    },
    valid: true,
  }),
  methods: {
    reset() {
      Object.assign(this.$data, this.$options.data.apply(this));
    },
    async CapNhatPhongThi() {
      try {
        this.$store.commit("setLoading", true);
        // console.log({ user: this.user });
        const body = {
          ...this.phongthi,
          phonenumber: this.user.phonenumber,
        };
        // console.log(body);
        await phongthiApi.UpdatePhongThi(this.value, body);
        this.$showAlert("Cập nhật thành công!", "success");
        // this.tenLop = "";
        // this.$store.commit("setAlert", {
        //   type: "success",
        //   msg: data,
        // });
        this.$store.commit("setLoading", false);
        this.$emit("done");
        this.dialog = false;
      } catch (error) {
        if (error.response) {
          this.$showAlert(error.response.data.error, "error");
        }
        console.log(error);
      }
    },
  },
  watch: {
    namhoc: function (val) {
      this.namhoc = `${parseInt(val)} - ${parseInt(val) + 1}`;
    },
  },
  async created() {
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
    const { data } = await phongthiApi.layThongTinPhongThi(this.value);
    this.phongthi = {
      ...this.phongthi,
      ...data,
    };
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