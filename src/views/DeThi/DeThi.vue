<template>
  <div>
    <v-toolbar color="transparent" flat>
      <v-spacer></v-spacer>
      <tao-de-thi @done="layDanhSachDeThi" />
    </v-toolbar>
    <v-divider></v-divider>
    <v-row class="py-3" justify="center">
      <v-col cols="12">
        <v-card flat outlined>
          <v-card-text class="text-start">
            <div>
              <div class="d-flex">
                <v-spacer></v-spacer>
                <v-text-field
                  v-model="search"
                  class="mb-3"
                  style="max-width: 300px"
                  append-icon="mdi-magnify"
                  label="Tìm kiếm"
                  single-line
                  clearable
                  hide-details
                ></v-text-field>
              </div>
              <v-divider></v-divider>
              <v-data-table
                :headers="headers"
                :items="danhSachDeThi"
                :search="search"
                no-data-text="Chưa có dữ liệu"
                no-results-text="Chưa có dữ liệu"
                :loading="loading"
                loading-text="Đang tải... vui lòng chờ!"
              >
                <template v-slot:item.ten="{ item }">
                  <span class="font-weight-medium">{{ item.ten }}</span>
                </template>
                <template v-slot:item.tools="{}">
                  <div class="d-flex justify-start align-center">
                    <v-btn small color="warning" class="mr-1" icon
                      ><v-icon>mdi-pencil</v-icon></v-btn
                    >
                    <v-btn small color="error" class="mr-1" icon
                      ><v-icon>mdi-delete</v-icon></v-btn
                    >
                  </div>
                </template>
                <template v-slot:item.ngaytao="{ item }">
                  <span>{{ $moment(item.ngaytao).format("LLL") }}</span>
                </template>
              </v-data-table>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import TaoDeThi from "./component/TaoDeThi.vue";
import dethiApi from "../../api/dethi.api";
export default {
  components: { TaoDeThi },
  data: () => ({
    danhSachDeThi: [],
    headers: [
      { text: "Tên", value: "ten" },
      // { text: "Trạng thái", value: "trangthai" },
      { text: "Ngày tạo", value: "ngaytao" },
      { text: "Công cụ", value: "tools" },
    ],
    search: "",
    loading: false,
  }),
  methods: {
    async layDanhSachDeThi() {
      try {
        this.loading = true;
        const { data } = await dethiApi.layDanhSach();
        this.danhSachDeThi = data;
        this.loading = false;
      } catch (error) {
        if (error.response) {
          this.loading = false;
          this.$showAlert(error.response.data.error, "error");
        }
      }
    },
  },
  created() {
    this.layDanhSachDeThi();
  },
};
</script>

<style>
</style>