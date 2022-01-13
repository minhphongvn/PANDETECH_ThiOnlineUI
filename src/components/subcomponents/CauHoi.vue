<template>
  <v-card class="mb-2 px-3 py-2" outlined flat>
    <div class="text-end">{{ cauhoi.diem }} điểm</div>
    <div>
      <strong>Câu {{ position + 1 }}</strong
      >. {{ cauhoi.title }}
    </div>
    <div class="mt-2">
      <v-radio-group
        v-bind="$attrs"
        class="mt-0"
        style="cursor: pointer"
        v-model="cauhoi.dapan"
        @change="() => $emit('change', cauhoi.id)"
        hide-details
      >
        <v-radio
          class="my-0 pb-3"
          :color="
            $attrs.readonly === true
              ? cauhoi.correct === item.id
                ? 'success'
                : 'error'
              : ''
          "
          v-for="(item, i) in cauhoi.items"
          :value="item.id"
          :label="item.value"
          :key="i"
        ></v-radio>
      </v-radio-group>
    </div>
    <v-card-actions v-if="$attrs.readonly">
      <span
        ><span class="font-weight-medium"
          >Đáp án:
          <span class="primary--text">{{
            cauhoi.items.filter((dapan) => dapan.id === cauhoi.correct)[0].value
          }}</span></span
        >
      </span>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: ["cauhoi", "position"],
};
</script>

<style>
</style>