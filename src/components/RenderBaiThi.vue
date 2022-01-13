<template>
  <!-- <v-row justify="center" no-gutters>
    <v-col cols="12" md="3" order-md="2" order-sm="1">
      
    </v-col>
    <v-col>
      <pre>{{ baithi }}</pre>
    </v-col>
  </v-row> -->
  <v-app>
    <v-app-bar v-if="$vuetify.breakpoint.mobile" app>
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <v-spacer></v-spacer>
      <count-down
        class="text-center font-weight-bold"
        :count="time"
        @timeEnd="NopBai"
        format="HH:mm:ss"
      />
      <v-spacer></v-spacer>
      <v-btn color="primary" :loading="loading" @click="NopBai">Nộp bài</v-btn>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      :permanent="!$vuetify.breakpoint.mobile"
      width="300"
      right
      app
    >
      <v-card class="ma-2" flat>
        <div class="d-flex justify-end mb-1" v-if="$vuetify.breakpoint.mobile">
          <v-btn @click="drawer = !drawer" icon
            ><v-icon>mdi-close</v-icon></v-btn
          >
        </div>
        <div class="d-flex justify-center py-3 primary white--text">
          <div class="text-center">
            <div>Thời gian còn lại</div>
            <count-down
              class="text-h4 text-center font-weight-bold"
              :count="time"
              @timeEnd="NopBai"
              format="HH:mm:ss"
            />
          </div>
        </div>
        <div class="pa-3" :class="solanvipham ? 'error--text' : ''">
          Phát hiện vi phạm: {{ solanvipham }}
        </div>
        <v-divider></v-divider>
        <div class="pa-2">
          <div class="d-flex flex-wrap">
            <div
              class="ma-1"
              v-for="(cauhoi, i) in checkDalam"
              :key="cauhoi.id"
            >
              <v-btn
                :href="`#${cauhoi.id}`"
                :class="cauhoi.checked ? 'primary white--text' : ''"
                :outlined="!cauhoi.checked"
                icon
                >{{ i + 1 }}</v-btn
              >
            </div>
          </div>
        </div>
        <v-divider></v-divider>
        <div class="text-center pa-2 text-center">
          <v-btn color="primary" :loading="loading" block @click="NopBai"
            >Nộp bài</v-btn
          >
        </div>
      </v-card>
    </v-navigation-drawer>
    <v-main>
      <v-row justify="center" no-gutters>
        <v-col cols="12" md="6">
          <bai-thi v-model="bailam" :dethi="dethi" :check="checkDalam" />
        </v-col>
      </v-row>
    </v-main>
  </v-app>
</template>

<script>
import CountDown from "./CountDown.vue";
import BaiThi from "./subcomponents/BaiThi.vue";
import thiApi from "../api/thi.api";
export default {
  components: { CountDown, BaiThi },
  props: ["password", "baithi", "time", "thisinh", "batloi"],
  data: () => ({
    loading: false,
    drawer: false,
    checkDalam: [],
    dethi: {},
    bailam: {},
    solanvipham: 0,
    isNopbai: false,
  }),
  methods: {
    async NopBai() {
      try {
        const body = {
          id: this.$route.params.id,
          phone: this.thisinh.phone,
          password: this.password,
          bainop: JSON.stringify(this.bailam),
        };
        this.isNopbai = true;
        const { data } = await thiApi.NopBai(body);
        this.$emit("done", data);
        this.$showAlert("Đã nộp bài!", "success");
      } catch (error) {
        if (error.response) {
          this.$showAlert(error.response.data.error, "error");
        }
      }
    },
    async BatLoi() {
      try {
        const body = {
          id: this.$route.params.id,
          phone: this.thisinh.phone,
          password: this.password,
        };
        const { data } = await thiApi.BatLoi(body);
        this.$showAlert(data, "error");
      } catch (error) {
        if (error.response) {
          this.$showAlert(error.response.data.error, "error");
        }
      }
    },
    handlingBatLoi() {
      this.BatLoi();
      this.solanvipham++;
    },
  },
  mounted() {
    // document.addEventListener("visibilitychange", () => {
    //   if (document.hidden) {
    //     this.$router.replace({ name: "ViPham" });
    //   }
    // });
    if (this.batloi) {
      window.addEventListener("blur", this.handlingBatLoi, false);
    }
  },
  watch: {
    solanvipham: async function () {
      if (this.solanvipham === 3) {
        await this.NopBai();
        this.$router.replace({ name: "ViPham" });
      }
      return;
    },
    isNopbai: function () {
      console.log(this.isNopbai);
      if (this.isNopbai == true) {
        window.removeEventListener("blur", this.handlingBatLoi, false);
      }
    },
  },
  created() {
    console.log(this.isNopbai);
    this.dethi = {
      ...this.baithi,
      part: this.baithi.part.map((part) => ({
        ...part,
        questions: part.questions.map((cauhoi) => ({
          ...cauhoi,
        })),
      })),
    };
    this.dethi.part.map((part) => {
      part.questions.map((cauhoi) =>
        this.checkDalam.push({ id: cauhoi.id, checked: false })
      );
    });
  },
};
</script>

<style>
</style>