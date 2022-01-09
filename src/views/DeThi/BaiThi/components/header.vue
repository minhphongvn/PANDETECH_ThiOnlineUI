<template>
  <div>
    <div v-if="editHeader" v-click-outside="() => (editHeader = false)">
      <v-card :class="{ 'selected-outline': editHeader }" outlined>
        <v-card-text>
          <v-text-field
            v-model="dethi.title"
            class="mb-3"
            label="Tiêu đề bài thi"
            hide-details="auto"
            @focus="$event.target.select()"
          ></v-text-field>
          <v-text-field
            v-model="dethi.subject"
            class="mb-3"
            label="Tên môn học"
            hide-details="auto"
            @focus="$event.target.select()"
            >></v-text-field
          >
        </v-card-text>
      </v-card>
    </div>
    <div class="text-center" @click="() => (editHeader = true)" v-else>
      <div class="text-h6 font-weight-semibold">{{ dethi.title }}</div>
      <div class="text-body-1">Môn: {{ dethi.subject }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["dethi"],
  data: () => ({
    editHeader: false,
  }),
};
</script>

<style scoped>
.selected-outline {
  border: 2px solid #1a76d2;
}
</style>