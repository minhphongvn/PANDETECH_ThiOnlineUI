<template>
  <div class="mt-7">
    <div>
      <div v-if="editpart" v-click-outside="()=>editpart = false">
        <v-text-field class="text-body-1" v-model="data.part.title" label="Tên phần" hide-details="auto" @focus="$event.target.select()"></v-text-field>
      </div>
      <div @click="()=>editpart=true" v-else>
        <div class="text-body-1 font-weight-semibold">{{$romanize(data.index+1)}}. {{data.part.title}} <span class="primary--text">({{questionCount}} câu hỏi)</span> - <span class="primary--text">Tổng: {{sumPoint.toFixed(2)}} điểm</span></div>
      </div>
    </div>
    <questions :part="data.part" />
  </div>
</template>

<script>
import questions from './questions.vue';
export default {
  components: { questions },
  props: ['data'],
  data: ()=>({
    editpart: false
  }),
  computed: {
    questionCount() {
      return this.data.part.questions.length
    },
    sumPoint() {
      return this.data.part.questions.reduce((accumulator, currentValue) => (accumulator + Number(currentValue.diem) || 0), 0)
    }
  },
}
</script>

<style>

</style>