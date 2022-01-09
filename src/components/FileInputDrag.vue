<template>
  <div>
    <div v-if="!file">
      <div
        :class="['dropZone', dragging ? 'dropZone-over' : '']"
        @dragenter="dragging = true"
        @dragleave="dragging = false"
      >
        <div class="dropZone-info" @drag="onChange">
          <span class="fa fa-cloud-upload dropZone-title"></span>
          <span class="dropZone-title">Kéo thả hoặc nhấn để upload</span>
          <div class="dropZone-upload-limit-info">
            <div>Loại file: {{ accept }}</div>
          </div>
        </div>
        <input type="file" :accept="accept" @change="onChange" />
      </div>
    </div>
    <div v-else class="dropZone-uploaded">
      <div class="dropZone-uploaded-info">
        <span class="success--text my-2"
          ><v-icon color="success">mdi-check-circle</v-icon> Đã upload</span
        >
        <span
          style="outline: 1px solid #eee"
          class="primary--text rounded py-8 px-2 my-2"
          >{{ file.name }}</span
        >
        <v-btn color="error" depressed @click="removeFile"> Huỷ file </v-btn>
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["value", "accept"],
  data: () => ({
    file: "",
    dragging: false,
  }),
  methods: {
    onChange(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) {
        this.dragging = false;
        return;
      }
      this.createFile(files[0]);
    },
    createFile(file) {
      // if (
      //   !file.type.match(
      //     "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      //   )
      // ) {
      //   alert(`Vui lòng chọn file ${this.accept} !`);
      //   this.dragging = false;
      //   return;
      // }

      // if (file.size > 5000000) {
      //   alert("please check file size no over 5 MB.");
      //   this.dragging = false;
      //   return;
      // }

      this.file = file;
      console.log(this.file);
      this.dragging = false;
      this.$emit("input", this.file);
      this.$emit("change", this.file);
    },
    removeFile() {
      this.file = "";
      this.$emit("input", this.file);
    },
  },
  computed: {
    extension() {
      return this.file ? this.file.name.split(".").pop() : "";
    },
  },
};
</script>

<style lang="scss" scoped>
.dropZone {
  width: 100%;
  height: 200px;
  position: relative;
  border: 2px dashed #eee;
}

.dropZone:hover {
  border: 2px solid #2e94c4;
}

.dropZone:hover .dropZone-title {
  color: #1975a0;
}

.dropZone-info {
  color: #a8a8a8;
  position: absolute;
  top: 50%;
  width: 100%;
  transform: translate(0, -50%);
  text-align: center;
}

.dropZone-title {
  color: #787878;
}

.dropZone input {
  position: absolute;
  cursor: pointer;
  top: 0px;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
}

.dropZone-upload-limit-info {
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
}

.dropZone-over {
  background: #5c5c5c;
  opacity: 0.8;
}

.dropZone-uploaded {
  width: 100%;
  height: 200px;
  position: relative;
  border: 2px dashed #eee;
}

.dropZone-uploaded-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #a8a8a8;
  position: absolute;
  top: 50%;
  width: 100%;
  transform: translate(0, -50%);
  text-align: center;
}

.removeFile {
  width: 200px;
}
</style>