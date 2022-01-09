<template>
  <v-dialog
    v-model="dialog"
    fullscreen
    persistent
    scrollable
    transition="slide-y-reverse-transition"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn v-bind="attrs" v-on="on" color="primary" depressed>+ Tạo đề</v-btn>
    </template>

    <v-card>
      <v-card-title class="text-h6 grey lighten-4">
        <!-- <span>Tạo đề thi</span> -->
        <v-spacer></v-spacer>
        <v-text-field
          v-model="tendethi"
          class="mr-2"
          placeholder="Tên đề thi"
          dense
          outlined
          solo
          flat
          hide-details="auto"
          style="max-width: 300px"
          :rules="[(v) => !!v || '']"
          required
        ></v-text-field>
        <!-- <v-btn
          class="mr-2"
          color="grey"
          depressed
          outlined
          @click="dialog = false"
        >
          Huỷ
        </v-btn> -->
        <!-- <v-btn class="mr-2" color="primary" depressed @click="dialog = false">
          Tạo đề
        </v-btn>
        <v-spacer /> -->
        <!-- <v-btn @click="dialog = false" icon><v-icon>mdi-close</v-icon></v-btn> -->
        <v-btn
          :disabled="!tendethi"
          class="mr-2"
          color="primary"
          depressed
          @click="TaoDeThi"
        >
          Tạo đề thi
        </v-btn>
        <div>
          <v-btn
            v-if="!tendethi"
            color="grey lighten-4"
            depressed
            @click="dialog = false"
          >
            Huỷ
          </v-btn>
          <verify-dialog
            v-else
            text="Huỷ"
            color="error"
            msg="Đề thi sẽ không được lưu. Bạn có chắc muốn huỷ đề thi này?"
          >
            <v-btn color="error" depressed @click="done"> Chấp nhận huỷ </v-btn>
          </verify-dialog>
        </div>
      </v-card-title>
      <!-- <v-card-text class="pt-3" v-if="!coverted">
        <v-row justify="center">
          <v-col cols="12" md="6">
            <div class="text-center">
              <file-input-drag accept=".docx, .doc" @change="uploadFileDethi">
              </file-input-drag>
            </div>
          </v-col>
        </v-row>
      </v-card-text> -->
      <v-card-text class="pt-3">
        <v-row justify="center">
          <v-col cols="12" md="6">
            <!-- <div v-html="coverted"></div> -->
            <form-builder v-model="dethi" />
          </v-col>
          <!-- <v-col md="6">ss</v-col> -->
        </v-row>
      </v-card-text>

      <!-- <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
      </v-card-actions> -->
    </v-card>
  </v-dialog>
</template>

<script>
// import mammoth from "mammoth";
import FormBuilder from "../BaiThi/FormBuilder.vue";
import dethiApi from "../../../api/dethi.api";
import VerifyDialog from "../../../components/VerifyDialog.vue";
// import FileInputDrag from "../../../components/FileInputDrag.vue";
export default {
  components: { FormBuilder, VerifyDialog },
  // components: { FileInputDrag },
  data: () => ({
    dialog: false,
    fileInput: null,
    coverted: "",
    dethi: {
      title: "TIÊU ĐỀ BÀI THI",
      subject: "Môn",
      part: [
        {
          title: "TÊN PHẦN",
          questions: [],
        },
      ],
    },
    tendethi: "",
  }),
  methods: {
    // async uploadFileDethi(file) {
    //   if (!file) return;
    //   this.fileInput = file;
    //   const { value } = await mammoth.extractRawText({
    //     arrayBuffer: file,
    //   });
    //   const cauhoi = value.match(/^Câu .*/gm);
    //   const dapan = value.match(/^ .*/gm);
    //   console.log({ cauhoi, dapan });
    //   this.coverted = value;
    //   console.log(this.coverted);
    // },
    done() {
      this.dethi = {
        title: "TIÊU ĐỀ BÀI THI",
        subject: "Môn",
        part: [
          {
            title: "TÊN PHẦN",
            questions: [],
          },
        ],
      };
      this.tendethi = "";
      this.loading = false;
      this.dialog = false;
      this.$emit("done");
    },
    async TaoDeThi() {
      if (!this.tendethi) return;
      try {
        this.loading = true;
        const body = {
          ten: this.tendethi,
          phonenumber: this.user.phonenumber,
          noidung: JSON.stringify(this.dethi),
        };
        console.log(body);
        const { data } = await dethiApi.TaoDeThi(body);
        this.$showAlert(data, "success");
        this.done();
      } catch (error) {
        if (error.response) {
          this.loading = false;
          this.$showAlert(error.response.data.error, "error");
        }
        console.log(error);
      }
    },
  },
  computed: {
    // fileURL() {
    //   return URL.createObjectURL(this.fileInput);
    // },
    user() {
      return this.$store.state.user;
    },
  },
};
</script>

<style>
</style>