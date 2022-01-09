<template>
  <div class="rounded" style="border: 1px solid #ddd">
    <div class="pa-2 d-flex justify-space-between">
      <div>
        <div class="p-t-sm p-b-sm">
          <div class="control">
            <v-btn
              color="primary"
              @click="themCauHoiTracNghiem"
              outlined
              depressed
              ><v-icon class="mr-2">mdi-radiobox-marked</v-icon
              ><span>Thêm câu hỏi</span></v-btn
            >
          </div>
        </div>
        <!-- <v-btn @click="themCauHoiTracNghiem" depressed outlined><v-icon class="mr-2">mdi-radiobox-marked</v-icon><span>Trắc nghiệm</span></v-btn> -->
      </div>
      <v-btn depressed color="primary" @click="themPhan">Thêm phần</v-btn>
    </div>
  </div>
</template>

<script>
// import draggable from 'vuedraggable'
export default {
  props: ["dethi"],
  // components: {draggable},
  data: () => ({
    controls: [
      {
        id: "",
        type: "radio",
        title: "Nội dung câu hỏi",
        items: [],
        dapan: "",
        diem: 0,
      },
    ],
  }),
  methods: {
    uuidv4() {
      return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
        (
          c ^
          (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
        ).toString(16)
      );
    },
    toEndPoint() {
      document.getElementById("endpoint").scrollIntoView();
    },
    handleClone(item) {
      let cloneMe = JSON.parse(JSON.stringify(item));
      // this.$delete(cloneMe, "uid");
      this.$set(cloneMe, "id", this.uuidv4());
      console.log(cloneMe);
      return cloneMe;
    },
    themCauHoiTracNghiem() {
      if (this.dethi.part.length === 0) {
        this.themPhan();
      }
      this.dethi.part[this.dethi.part.length - 1]?.questions?.push({
        id: this.uuidv4(),
        type: "radio",
        title: "Nội dung câu hỏi",
        items: [],
        dapan: "",
        diem: 0,
      });

      this.toEndPoint();
    },
    themPhan() {
      this.toEndPoint();
      this.dethi.part.push({
        title: "TÊN PHẦN",
        questions: [],
      });
    },
  },
  computed: {
    dragOptions() {
      return {
        swapThreshold: 0.5,
        disabled: false,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.fixed-bar {
  width: 43.5%;
  position: fixed;
  bottom: 20px;
}

// .ghost {
//   opacity: 0.5;
//   background: red;
//   margin: 5px 0px;
// }

// .ghost::before {
//   margin: 10px 0px;
// }
</style>