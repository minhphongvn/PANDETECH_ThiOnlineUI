<template>
  <v-card class="mb-2" flat outlined>
    <v-card-text>
      <div class="text-body-1">
        <strong>{{ name }}</strong>
      </div>
      <div>
        <span class="font-weight-medium">Số điện thoại: </span>{{ phone }}
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: ["name", "phone"],
};
</script>

<style>
</style>