<template>
  <div>
    <v-toolbar color="transparent" flat>
      <v-spacer></v-spacer>
      <tao-phong-thi @done="layDanhSachPhongThi" />
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
                :items="danhSachPhongThi"
                :search="search"
                no-data-text="Chưa có dữ liệu"
                no-results-text="Chưa có dữ liệu"
              >
                <template v-slot:item.ten="{ item }">
                  <span
                    ><router-link
                      class="text-decoration-none"
                      :to="`phongthi/${item.id}`"
                    >
                      <span class="font-weight-medium">{{
                        item.ten
                      }}</span></router-link
                    ></span
                  >
                </template>
                <template v-slot:item.link="{ item }">
                  <span
                    ><router-link
                      target="_blank"
                      class="text-decoration-none"
                      :to="`/thi/${item.id}`"
                      ><v-icon color="primary" class="mr-1" small
                        >mdi-open-in-new</v-icon
                      >Link</router-link
                    ></span
                  >
                </template>
                <template v-slot:item.trangthai="{ item }">
                  <span
                    v-if="
                      item.trangthai &&
                      $moment().isBetween(item.ngaybatdau, item.ngayketthuc)
                    "
                    class="success--text font-weight-medium"
                    ><v-icon color="success" small>mdi-circle</v-icon> Đang
                    thi</span
                  >
                  <span
                    v-else-if="
                      item.trangthai && $moment().isAfter(item.ngayketthuc)
                    "
                    class="purple--text font-weight-medium"
                    ><v-icon color="purple" small>mdi-circle</v-icon> Đã kết
                    thúc</span
                  >
                  <span
                    v-else-if="item.trangthai"
                    class="warning--text font-weight-medium"
                    ><v-icon color="warning" small>mdi-circle</v-icon> Đã
                    mở</span
                  >
                  <span class="grey--text" v-else
                    ><v-icon color="grey" small>mdi-circle</v-icon> Đang
                    đóng</span
                  >
                </template>
                <!-- <template v-slot:item.ngaytao="{ item }">
                  <span>{{ $moment(item.ngaytao).format("LLL") }}</span>
                </template> -->
                <template v-slot:item.ngaybatdau="{ item }">
                  <span>{{ $moment(item.ngaybatdau).format("LLL") }}</span>
                </template>
                <template v-slot:item.ngayketthuc="{ item }">
                  <span>{{ $moment(item.ngayketthuc).format("LLL") }}</span>
                </template>
                <template v-slot:item.thoiluong="{ item }">
                  <span
                    >{{
                      $moment
                        .duration(
                          $moment(item.ngayketthuc).diff(
                            $moment(item.ngaybatdau)
                          )
                        )
                        .asMinutes()
                    }}
                    phút</span
                  >
                </template>
                <template v-slot:item.tools="{ item }">
                  <div class="d-flex justify-start align-center">
                    <sua-phong-thi
                      v-model="item.id"
                      @done="layDanhSachPhongThi"
                    />
                    <v-btn small color="error" class="mr-1" icon
                      ><v-icon>mdi-delete</v-icon></v-btn
                    >
                  </div>
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
import phongthiApi from "../../api/phongthi.api";
import SuaPhongThi from "./component/SuaPhongThi.vue";
import TaoPhongThi from "./component/TaoPhongThi.vue";
export default {
  components: { TaoPhongThi, SuaPhongThi },
  data: () => ({
    danhSachPhongThi: [],
    headers: [
      { text: "Trạng thái", value: "trangthai" },
      { text: "Phòng", value: "ten" },
      { text: "Link", value: "link" },
      { text: "Lớp", value: "lop" },
      { text: "Bắt đầu", value: "ngaybatdau" },
      { text: "Kết thúc", value: "ngayketthuc" },
      { text: "Thời lượng", value: "thoiluong" },
      { text: "Công cụ", value: "tools" },
    ],
    search: "",
  }),
  methods: {
    async layDanhSachPhongThi() {
      try {
        this.$store.commit("setLoading", true);
        const { data } = await phongthiApi.layDanhSach();
        this.$store.commit("setLoading", false);
        this.danhSachPhongThi = data;
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    // setInterval(() => this.layDanhSachPhongThi(), 5000);
  },
  created() {
    this.layDanhSachPhongThi();
  },
};
</script>

<style>
</style>