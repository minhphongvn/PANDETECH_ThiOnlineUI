<template>
  <div>
    <div>{{ label }}</div>
    <div class="d-flex justify-space-between">
      <v-menu
        v-model="menuDate"
        :close-on-content-click="false"
        transition="scale-transition"
        offset-y
        max-width="290px"
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            :value="$moment(date).format('DD/MM/yyyy')"
            placeholder="Chọn ngày"
            persistent-hint
            prepend-inner-icon="mdi-calendar"
            dense
            readonly
            outlined
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="date"
          scrollable
          locale="vi-VN"
          no-title
          color="primary"
          @input="onInput"
        ></v-date-picker>
      </v-menu>
      <div class="ml-5">
        <v-menu
          ref="menu"
          v-model="menuTime"
          :close-on-content-click="false"
          :nudge-right="40"
          :return-value.sync="time"
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="time"
              placeholder="Thời gian"
              persistent-hint
              prepend-inner-icon="mdi-clock-outline"
              dense
              readonly
              outlined
              v-on="on"
              v-bind="attrs"
            ></v-text-field>
          </template>
          <v-time-picker
            v-if="menuTime"
            v-model="time"
            @click:minute="$refs.menu.save(time)"
            @input="onInput"
          ></v-time-picker>
        </v-menu>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["value", "label"],
  data: () => ({
    menuDate: false,
    menuTime: false,
    date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    time: "",
  }),
  methods: {
    onInput() {
      this.$emit("input", this.date + " " + this.time);
      this.menuDate = false;
    },
  },
  created() {
    const [date, time] = this.value.split(" ");
    this.date = date;
    this.time = time;
  },
};
</script>

<style>
</style>