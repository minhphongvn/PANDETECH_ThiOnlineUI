<template>
  <v-row justify="center">
    <v-col cols="12" md="6" class="d-flex justify-center">
      <div>
        <!-- <div class="text-right mb-2">
          <v-btn color="primary" outlined icon @click="()=>showPreview = !showPreview"><v-icon>mdi-code-json</v-icon></v-btn>
        </div> -->
        <v-card width="730" class="pt-10 pb-2 px-4 mb-4" flat outlined>
          <Head :dethi="value" />
          <Part
            :data="{ part, index }"
            v-for="(part, index) in value.part"
            :key="index"
          />
        </v-card>
        <!-- <div class="py-10"></div> -->
        <div id="endpoint" class="py-2"></div>
        <div>
          <Dock :dethi="value" />
        </div>
      </div>
    </v-col>
    <!-- <v-col v-show="showPreview">
      <preview :dethi="dethi" />
    </v-col> -->
    <!-- <v-col md="3" class="d-flex justify-end">
      <v-card width="400" class="white" style="position: fixed">
        <v-card-text>
          <div class="mb-2">Tên bài thi:</div>
          <v-text-field
            hide-details="auto"
            placeholder="Ví dụ: Toán cao cấp"
            outlined
            dense
          />
          <div class="my-2">Mức điểm:</div>
          <v-text-field
            hide-details="auto"
            placeholder="Ví dụ: 10"
            outlined
            dense
          />
          <div class="my-2">Thêm vào kỳ thi:</div>
          <v-select
            v-model="kythi"
            :items="listKythi"
            item-text="name"
            :item-value="(item) => item"
            hide-details="auto"
            dense
            outlined
          ></v-select>
        </v-card-text>
        <v-card-text v-if="kythi.test">
          <div>
            <v-icon color="warning" class="mr-2">mdi-alert-circle</v-icon
            ><span class="warning--text"
              >Kỳ thi này đã có bài thi. Bạn muốn cập nhật ?
            </span>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="primary"
            :disabled="!kythi"
            @click="themBaiThiVaoKyThi"
            >{{ !!kythi.test ? "Cập nhật" : "Tạo bài thi" }}</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-col> -->
  </v-row>
</template>

<script>
import Dock from "./components/dock.vue";
import Head from "./components/header.vue";
import Part from "./components/part.vue";
// import preview from "./components/preview.vue";
export default {
  props: ["value"],
  components: { Head, Part, Dock },
  data: () => ({
    showPreview: false,
    listKythi: [],
    kythi: "",
  }),
};
</script>

<style>
</style>