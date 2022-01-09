<template>
  <div>
    <v-toolbar color="transparent" flat>
      <v-spacer></v-spacer>
      <tao-lop @change="getDanhSachLop" />
    </v-toolbar>
    <v-divider></v-divider>
    <v-row class="py-3">
      <v-col cols="12" md="3" v-for="lop in danhSachLop" :key="lop.id">
        <v-card :to="`class-details/${lop.id}`" :ripple="false" flat outlined>
          <v-card-text class="text-start">
            <div class="font-weight-bold">{{ lop.name }}</div>
            <div>Sĩ số: {{ lop.siso }}</div>
            <div>Năm học: {{ lop.namhoc }}</div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import lopApi from "../../api/lop.api";
import TaoLop from "./component/TaoLop.vue";
export default {
  components: { TaoLop },
  data: () => ({
    danhSachLop: [],
  }),
  methods: {
    async getDanhSachLop() {
      try {
        this.$store.commit("setLoading", true);
        const { data } = await lopApi.layDanhSach();
        this.$store.commit("setLoading", false);
        this.danhSachLop = data;
      } catch (error) {
        this.$store.commit("setAlert", {
          type: "error",
          msg: error.response.data.error,
        });
      }
    },
  },
  created() {
    this.getDanhSachLop();
  },
};
</script>

<style>
</style>