<template>
  <div>
    <span v-bind="$attrs">
      {{format.label}}
      <span v-if="type==2 && timeNew">{{timeNew.toLocaleString()}}</span>
      <span v-if="type==1">{{counterDown}}<span v-bind="labelFormat">{{format.second}}</span></span>
      <span v-if="type==0"><span v-if="days">{{days}}<span v-bind="labelFormat">{{format.day}}</span></span><span/>
      <span v-if="hours">{{hours}}<span v-bind="labelFormat">{{format.hour}}</span></span>
      <span v-if="minutes">{{minutes}}<span v-bind="labelFormat">{{format.minute}}</span></span>
      <span>{{seconds}}<span v-bind="labelFormat">{{format.second}}</span></span>
    </span>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: 0,
    },
    type: {
      type: Number,
      default: 0,
    },
    labelFormat: {
      type: Object,
      default: { class: "text-caption black--text" },
    },
    format: {
      type: Object,
      default: {
        label: "",
        day: " ngày",
        hour: " giờ",
        minute: " phút",
        second: " giây",
      },
    },
  },

  data: function () {
    return {
      returnVal: false,
      myCounter: null,
      timeNew: 0,
      timeEnd: null,
      counterDown: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  },
  mounted: function () {
    this.startCountDown(this.value);
  },
  methods: {
    startCountDown: function (second) {
      this.returnVal = false;

      if (_.isString(second)) {
        var regNum = /^[0-9]*$/gm;
        if (regNum.test(second)) second = parseInt(second);
        else {
          var arr = second.split(/[- :]/);
          second = new Date(arr[0], arr[1] - 1, arr[2], arr[3], arr[4], arr[5]);
        }
      }

      if (!_.isDate(second)) {
        this.timeEnd = new Date();
        this.timeEnd.setSeconds(this.timeEnd.getSeconds() + second);
        this.returnVal = true;
      } else this.timeEnd = second;

      if (this.myCounter) clearInterval(this.myCounter);
      //-------------------------------------------------------------
      if (this.type == 2) {
        //--- dong ho thoi gian
        this.counterDown = Date.parse(this.timeEnd) - Date.parse(new Date());
        this.timeNew = new Date(Date.parse(new Date()) + this.counterDown);
        setInterval(
          function () {
            this.timeNew = new Date(Date.parse(new Date()) + this.counterDown);
          }.bind(this),
          1000
        );
        return;
      }
      //----- Dem lui --------------------------
      countDown(this);
      if (this.counterDown <= 0) return;

      this.myCounter = setInterval(
        function () {
          countDown(this);
        }.bind(this),
        1000
      );
      //-----------------------------------------
      function countDown(self) {
        self.counterDown =
          (Date.parse(self.timeEnd) - Date.parse(new Date())) / 1000;

        if (self.returnVal) self.$emit("input", self.counterDown);
        if (self.counterDown <= 0) {
          self.$emit("time-end");
          clearInterval(self.myCounter);
        }

        if (self.counterDown < 0) self.counterDown = 0;

        self.days = Math.floor(self.counterDown / (60 * 60 * 24));
        self.hours = Math.floor(
          (self.counterDown % (60 * 60 * 24)) / (60 * 60)
        );
        self.minutes = Math.floor((self.counterDown % (60 * 60)) / 60);
        self.seconds = Math.floor(self.counterDown % 60);
      }
    },
  },
  watch: {
    value: {
      handler: function (newValue, oldValue) {
        if (Math.abs(newValue - oldValue) > 1) {
          this.startCountDown(newValue);
        }
      },
      immediate: true,
    },
  },
};
</script>

<style>
</style>