<template>
  <v-dialog v-model="dialog" width="500">
    <template v-slot:activator="{ on, attrs }">
      <v-btn v-bind="attrs" v-on="on" color="primary" depressed
        >+ Tạo lớp</v-btn
      >
    </template>

    <v-card>
      <v-card-title class="text-h6 grey lighten-4"> Thêm lớp học </v-card-title>

      <v-card-text class="pt-3">
        <v-text-field
          required
          v-model="tenLop"
          :rules="[rules.required]"
          label="Tên lớp"
          type="text"
          outlined
          dense
        ></v-text-field>
        <v-combobox
          v-model="namhoc"
          :rules="[rules.required]"
          :items="dsNamHoc"
          label="Năm học"
          dense
          outlined
        ></v-combobox>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="grey" depressed outlined @click="dialog = false">
          Huỷ
        </v-btn>
        <v-btn :disabled="!tenLop" color="primary" depressed @click="themLop">
          Thêm lớp
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import lopApi from "../../../api/lop.api";
export default {
  data: () => ({
    dialog: false,
    tenLop: "",
    namhoc: `${new Date().getFullYear() - 1} - ${new Date().getFullYear()}`,
    dsNamHoc: [],
    rules: {
      required: (value) => !!value || "Yêu cầu nhập.",
    },
  }),
  methods: {
    async themLop() {
      try {
        this.$store.commit("setLoading", true);
        const { data } = await lopApi.taoLop({
          tenlop: this.tenLop,
          phonenumber: this.user.phonenumber,
          namhoc: this.namhoc,
        });
        this.tenLop = "";
        this.$store.commit("setAlert", {
          type: "success",
          msg: data,
        });
        this.$emit("change");
        this.dialog = false;
        this.$store.commit("setLoading", false);
      } catch (error) {
        this.$store.commit("setAlert", {
          type: "error",
          msg: error.response.data.error,
        });
        console.log(error);
      }
    },
    initNamHoc() {
      for (let i = 1; i < 60; i++) {
        const nam = `20${("0" + i).slice(-2)}`;
        this.dsNamHoc.push(nam);
      }
    },
  },
  watch: {
    namhoc: function (val) {
      this.namhoc = `${parseInt(val)} - ${parseInt(val) + 1}`;
    },
  },
  created() {
    this.initNamHoc();
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