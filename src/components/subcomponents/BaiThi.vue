<template>
  <div>
    <v-card v-if="baithi" class="py-3" flat outlined>
      <v-card-text class="text-center">
        <div class="text-h5 font-weight-medium">{{ baithi.title }}</div>
        <div class="text-body-1 font-weight-regular">
          Môn: {{ baithi.subject }}
        </div>
      </v-card-text>
      <v-card-text class="text-body-1">
        <div v-for="(part, i) in baithi.part" :key="i">
          <div class="font-weight-medium">{{ part.title }}</div>
          <div class="mt-3">
            <div v-for="(cauhoi, j) in part.questions" :id="cauhoi.id" :key="j">
              <cau-hoi
                :readonly="readonly"
                :cauhoi="part.questions[j]"
                :position="j"
                @change="checking"
              ></cau-hoi>
            </div>
          </div>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
import CauHoi from "./CauHoi.vue";
export default {
  components: { CauHoi },
  props: ["value", "dethi", "check", "readonly"],
  data: () => ({
    baithi: null,
  }),
  methods: {
    checking(id) {
      console.log(id);
      this.check.map((cauhoi) => {
        if (cauhoi.id === id) {
          cauhoi.checked = true;
        }
      });
      this.$emit("input", this.baithi);
      console.log(this.check);
    },
  },
  created() {
    if (this.dethi) {
      this.baithi = JSON.parse(JSON.stringify(this.dethi));
    }
  },
};
</script>

<style lang="scss" scoped>
</style>