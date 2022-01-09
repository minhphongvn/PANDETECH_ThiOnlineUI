<template>
  <v-menu
    bottom
    max-width="250px"
    rounded
    offset-y
    transition="slide-y-transition"
  >
    <template v-slot:activator="{ on }">
      <v-btn v-on="on" icon><v-icon>mdi-view-grid-outline</v-icon></v-btn>
    </template>
    <v-card>
      <v-card-text>
        <v-row justify="center" class="py-3" no-gutters>
          <v-col class="mb-2" cols="12" v-for="item in items" :key="item.name">
            <v-card :to="item.path" :ripple="false" flat outlined>
              <div class="d-flex flex-no-wrap px-2">
                <v-icon :color="item.color" large>{{ item.icon }}</v-icon>
                <v-card-title
                  class="text-body-2"
                  v-text="item.name"
                ></v-card-title>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-menu>
</template>

<script>
export default {
  data: () => ({
    items: [
      {
        icon: "mdi-school",
        color: "primary",
        path: "/admin/phongthi",
        name: "Phòng thi",
      },
      {
        icon: "mdi-book",
        color: "green",
        path: "/admin/dethi",
        name: "Đề thi",
      },
      {
        icon: "mdi-google-classroom",
        color: "indigo",
        path: "/admin/danhsachlop",
        name: "Danh sách lớp",
      },
    ],
  }),
  methods: {},
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
};
</script>

<style>
</style>