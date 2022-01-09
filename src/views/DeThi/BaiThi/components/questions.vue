<template>
  <div class="mt-3">
    <draggable
      v-model="part.questions"
      :sort="true"
      handle=".handledrag"
      group="items"
      ghost-class="ghost"
      v-bind="dragOptions">
      <transition-group tag="div">
        <tracnghiem :cauhoi="cauhoi" :index="i" v-for="(cauhoi, i) in part.questions" @remove="deleteQuestion" :key="cauhoi.id" />
      </transition-group>
    </draggable>
  </div>
</template>

<script>
import draggable from 'vuedraggable';
import tracnghiem from './tracnghiem.vue'
export default {
  components: { tracnghiem, draggable },
  props: ['part'],
  methods: {
    deleteQuestion(id) {
      console.log(id);
      this.part.questions = this.part.questions?.filter(question => question.id !== id)
    }
  },
  computed: { 
    dragOptions() {
      return {
        animation: 200,
        swapThreshold: 0.5,
        disabled: false,
      };
    },
  }
}
</script>

<style lang="scss" scoped>

  // .ghost {
  //   opacity: 0.5;
  //   background: red;
  // }

  // .ghost::before {
  //   margin: 10px 0px;
  // }
  
</style>