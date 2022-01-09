<template>
  <v-container fill-height>
    <v-row justify="center" class="py-3">
      <v-col cols="12" md="2" v-for="item in items" :key="item.name">
        <v-card
          :to="item.path"
          class="d-flex justify-center align-center"
          :ripple="false"
          flat
          outlined
        >
          <v-card-text class="text-center">
            <v-icon :color="item.color" large>{{ item.icon }}</v-icon>
            <div class="text-center text-h6">
              {{ item.name }}
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    items: [
      {
        icon: "mdi-school",
        color: "primary",
        path: "admin/phongthi",
        name: "Phòng thi",
      },
      {
        icon: "mdi-book",
        color: "green",
        path: "admin/dethi",
        name: "Đề thi",
      },
      {
        icon: "mdi-google-classroom",
        color: "indigo",
        path: "admin/danhsachlop",
        name: "Danh sách lớp",
      },
    ],
  }),
  created() {},
};
</script>

<style>
</style>