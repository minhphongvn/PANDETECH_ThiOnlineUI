<template>
  <v-dialog v-model="dialog" width="500" persistent>
    <template v-slot:activator="{ on, attrs }">
      <v-btn v-bind="attrs" v-on="on" color="primary" small depressed
        >+ Thêm học sinh</v-btn
      >
    </template>

    <v-card>
      <v-card-title class="text-h6 grey lighten-4">
        Thêm học sinh
      </v-card-title>
      <v-card-text class="pt-3" v-if="showDrag">
        <div class="d-flex justify-end">
          <v-btn @click="showDrag = false" small icon
            ><v-icon>mdi-close</v-icon></v-btn
          >
        </div>
        <file-input-drag v-model="fileInput" accept=".xlsx" />
      </v-card-text>
      <v-card-text class="pt-3" v-else>
        <v-text-field
          required
          v-model="hoten"
          :rules="[rules.required]"
          label="Họ tên"
          type="text"
          outlined
          dense
        ></v-text-field>
        <v-text-field
          required
          v-model="phonenumber"
          :rules="[rules.required]"
          label="Số điện thoại"
          type="number"
          outlined
          dense
        ></v-text-field>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-btn color="primary" @click="showDrag = true" small text
          >Thêm từ excel</v-btn
        >
        <v-spacer></v-spacer>
        <v-btn color="grey" depressed outlined @click="clear()"> Huỷ </v-btn>
        <v-btn
          v-if="!showDrag"
          :disabled="!hoten || !phonenumber"
          color="primary"
          depressed
          @click.prevent="themHocSinh"
        >
          Thêm học sinh
        </v-btn>
        <v-btn
          v-else
          :disabled="!fileInput"
          color="primary"
          depressed
          @click.prevent="themHocSinh"
        >
          Thêm học sinh
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import FileInputDrag from "../../../components/FileInputDrag.vue";
import xlsx from "xlsx";
import lopApi from "../../../api/lop.api";
export default {
  props: ["value"],
  components: { FileInputDrag },
  data: () => ({
    dialog: false,
    hoten: "",
    showDrag: false,
    phonenumber: "",
    rules: {
      required: (value) => !!value || "Yêu cầu nhập.",
    },
    fileInput: null,
  }),
  methods: {
    clear() {
      this.dialog = false;
      this.hoten = "";
      this.showDrag = false;
      this.phonenumber = "";
      this.fileInput = null;
    },
    readAsArrayBuffer(file) {
      return new Promise((resolve, reject) => {
        const fr = new FileReader();
        fr.onerror = reject;
        fr.onload = (e) => {
          resolve(e.target.result);
        };
        fr.readAsArrayBuffer(file);
      });
    },
    async sheet2Json(file) {
      //readfile as array buffer
      const arrayBuffer = await this.readAsArrayBuffer(file);
      const binarystr = new Uint8Array(arrayBuffer);
      //read xlsx
      const wb = xlsx.read(binarystr, {
        type: "array",
        raw: true,
        cellFormula: false,
      });
      const data = xlsx.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
      const newData = data.map(({ Name, Phone }) => ({
        name: Name,
        phone: Phone + "",
      }));
      console.log(data);
      return newData;
    },
    async themHocSinh() {
      const id = this.$route.params.id;
      this.$store.commit("setLoading", true);
      if (this.fileInput) {
        this.sheet2Json(this.fileInput).then(async (res) => {
          await lopApi.themDanhSachHocSinh(id, res);
          this.$store.commit("setAlert", {
            type: "success",
            msg: "Thêm thành công!",
          });
          this.$store.commit("setLoading", false);
          this.$emit("change");
          this.clear();
        });
      } else {
        await lopApi.themDanhSachHocSinh(id, [
          {
            name: this.hoten,
            phone: this.phonenumber,
          },
        ]);
        this.$store.commit("setAlert", {
          type: "success",
          msg: "Thêm thành công!",
        });
        this.$store.commit("setLoading", false);
        this.$emit("change");
        this.clear();
      }
    },
  },
  watch: {},
};
</script>

<style>
</style>