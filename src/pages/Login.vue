<template>
  <v-app>
    <v-main class="grey lighten-4">
      <v-container class="pt-10">
        <v-row justify="center" align="center" no-gutters>
          <v-col class="text-center" cols="12" md="4">
            <div
              class="text-h4 py-5 font-weight-bold justify-center primary--text"
            >
              PANDETECH
            </div>
            <v-card class="pa-4">
              <v-card-subtitle class="text-h6">Đăng nhập</v-card-subtitle>
              <v-card-text>
                <v-form ref="form" v-model="valid">
                  <v-text-field
                    required
                    v-model="phonenumber"
                    :rules="[rules.required, rules.phone]"
                    placeholder="Số điện thoại"
                    type="text"
                    prepend-inner-icon="mdi-phone"
                    outlined
                    dense
                  ></v-text-field>
                  <v-text-field
                    required
                    v-model="password"
                    :rules="[rules.required, rules.min]"
                    placeholder="Password"
                    :type="showPass ? 'text' : 'password'"
                    prepend-inner-icon="mdi-lock"
                    outlined
                    dense
                    :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="showPass = !showPass"
                  ></v-text-field>
                  <v-btn
                    :loading="loading"
                    :disabled="!valid"
                    @click.prevent="login"
                    color="primary"
                    block
                    >Đăng nhập</v-btn
                  >
                </v-form>
                <div class="mt-4 text-center">
                  <div>Bạn chưa có tài khoản?</div>
                  <router-link to="/register" class="text-decoration-none"
                    >Tạo tài khoản mới</router-link
                  >
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-snackbar
          :color="snackbarColor"
          top
          v-model="snackbar"
          :timeout="2000"
        >
          {{ snackbarMessage }}
        </v-snackbar>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import auth from "../api/auth.api";
export default {
  data: () => ({
    loading: false,
    phonenumber: "",
    password: "",
    showPass: false,
    valid: true,
    rules: {
      required: (value) => !!value || "Yêu cầu nhập.",
      min: (v) => v.length >= 8 || "Ít nhất 8 ký tự",
      emailMatch: () => `The email and password you entered don't match`,
      phone: (v) => v.length >= 10 || "Số điện thoại chỉ 10 số.",
    },
    snackbar: false,
    snackbarMessage: "",
    snackbarColor: "",
  }),
  methods: {
    validate() {
      return this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    showAlert(msg, color) {
      this.snackbar = true;
      this.snackbarColor = color;
      this.snackbarMessage = msg;
    },
    async login() {
      if (this.validate) {
        try {
          this.loading = true;
          // submit form to server/API here...
          const { hoten, phonenumber, type, token } = await auth.login({
            phonenumber: this.phonenumber,
            password: this.password,
          });
          localStorage.setItem("awt", JSON.stringify(token));
          localStorage.setItem(
            "userInfo",
            JSON.stringify({ hoten, phonenumber, type })
          );
          this.$store.commit("setUser", { hoten, phonenumber, type });
          this.$store.commit("setToken", token);
          this.showAlert("Đăng nhập thành công!", "success");
          setTimeout(() => this.$router.push({ name: "Admin" }), 1000);
        } catch (error) {
          if (error.response) {
            this.loading = false;
            this.showAlert(error.response.data.error, "error");
          }
        }
      }
    },
  },
};
</script>

<style>
</style>