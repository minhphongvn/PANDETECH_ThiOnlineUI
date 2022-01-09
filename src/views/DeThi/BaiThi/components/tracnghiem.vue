<template>
  <v-card
    v-bind="$attrs"
    class="mb-3"
    :class="editable ? 'selected-outline' : ''"
    outlined
  >
    <div class="text-center" style="height: 20px">
      <v-icon class="handledrag" style="cursor: grab"
        >mdi-drag-horizontal</v-icon
      >
    </div>
    <div v-if="editable" v-click-outside="() => (editable = false)">
      <v-card-text>
        <div class="d-flex justify-end">
          <v-text-field
            v-model.number="cauhoi.diem"
            hide-details="auto"
            outlined
            dense
            suffix="điểm"
            style="max-width: 150px"
            type="number"
            :step="0.05"
          />
        </div>
        <v-text-field
          class="text-body-1 font-weight-semibold"
          v-model="cauhoi.title"
          placeholder="Nội dung câu hỏi"
          hide-details="auto"
          @focus="$event.target.select()"
        ></v-text-field>
        <v-text-field
          class="text-body-1"
          v-model="item.value"
          hide-details="auto"
          v-for="(item, i) in cauhoi.items"
          :key="item.id"
          @focus="$event.target.select()"
          autofocus
        >
          <template slot="prepend">
            <v-btn @click="dapAnDung(item.id)" small icon>
              <v-icon color="primary" v-if="cauhoi.dapan === item.id"
                >mdi-radiobox-marked</v-icon
              >
              <v-icon v-else>mdi-radiobox-blank</v-icon>
            </v-btn>
          </template>
          <template slot="append-outer">
            <v-btn @click="deleteDapAn(i)" small icon
              ><v-icon>mdi-close</v-icon></v-btn
            >
          </template>
        </v-text-field>
        <v-text-field
          prepend-icon="mdi-radiobox-blank"
          class="text-body-1"
          placeholder="Thêm đáp án"
          hide-details="auto"
          @click="themDapAn"
          readonly
        ></v-text-field>
      </v-card-text>
      <v-card-text>
        <div class="d-flex align-center">
          <v-spacer />
          <v-btn color="grey" @click="$emit('remove', cauhoi.id)" icon
            ><v-icon size="28px">mdi-trash-can-outline</v-icon></v-btn
          >
          <!-- <v-btn color="primary" @click="themDapAn">Thêm</v-btn> -->
        </div>
      </v-card-text>
    </div>
    <div @click="() => (editable = true)" v-else>
      <!-- title -->
      <div
        class="
          d-flex
          justify-space-between
          align-center
          primary--text
          py-2
          px-5
        "
        style="background-color: #f1f1f1"
      >
        <span>Câu {{ index + 1 }}</span
        ><span
          v-if="!cauhoi.dapan && cauhoi.items.length"
          class="error--text text-subtitle-2"
          >Chưa chọn đáp án đúng</span
        ><span>{{ cauhoi.diem }}đ</span>
      </div>
      <v-card-title class="text-body-1 font-weight-semibold">
        {{ cauhoi.title }}
      </v-card-title>
      <v-card-text style="cursor: pointer">
        <!-- nếu là checkbox -->
        <div v-if="isCheckbox">
          <v-checkbox
            v-model="value"
            class="pt-0 mt-1 mb-3"
            v-for="(item, i) in cauhoi.items"
            :value="item.value"
            :label="item.value"
            hide-details
            :key="i"
          ></v-checkbox>
        </div>
        <!-- nếu là radio -->
        <v-radio-group
          v-else
          class="mt-0"
          style="cursor: pointer"
          v-model="cauhoi.dapan"
          hide-details
        >
          <v-radio
            readonly
            class="my-0 pb-3"
            v-for="(item, i) in cauhoi.items"
            :value="item.id"
            :label="item.value"
            :key="i"
          ></v-radio>
        </v-radio-group>
      </v-card-text>
    </div>
  </v-card>
</template>

<script>
export default {
  props: ["cauhoi", "index"],
  data: () => ({
    editable: false,
    value: [],
    alpha: ["A", "B", "C", "D", "E", "F", "G", "H"],
  }),
  methods: {
    themDapAn() {
      if (this.cauhoi.items.length === this.alpha.length) return;
      this.cauhoi.items.push({
        id: this.uuidv4(),
        value: "Đáp án",
      });
    },
    deleteDapAn(index) {
      this.cauhoi.items.splice(index, 1);
    },
    dapAnDung(value) {
      this.cauhoi.dapan = value;
    },
    uuidv4() {
      return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
        (
          c ^
          (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
        ).toString(16)
      );
    },
  },
  computed: {
    isCheckbox() {
      return this.cauhoi.type === "checkbox";
    },
  },
};
</script>

<style scoped>
.selected-outline {
  border: 2px solid #1a76d2;
}
</style>