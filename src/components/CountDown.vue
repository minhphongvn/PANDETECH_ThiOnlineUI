<template>
  <span v-bind="$attrs">
    {{ $moment.utc(countDown * 1000).format(format) }}
  </span>
</template>
<script>
export default {
  props: ["count", "format"],
  data: () => ({
    countDown: 0,
  }),
  methods: {
    countDownTimer() {
      if (this.countDown > 0) {
        setTimeout(() => {
          this.countDown -= 1;
          return this.countDownTimer();
        }, 1000);
      } else {
        return this.$emit("timeEnd");
      }
    },
  },
  created() {
    this.countDown = this.count;
    this.countDownTimer();
  },
};
</script>

<style>
</style>