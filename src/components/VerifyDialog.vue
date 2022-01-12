<template>
  <v-dialog v-model="dialog" :width="width || 300" persistent>
    <template v-slot:activator="{ on }">
      <v-btn v-bind="$attrs" v-on="on" :color="color" depressed>
        <v-icon v-if="iconsrc">{{ iconsrc }}</v-icon>
        <span v-else>
          {{ text }}
        </span>
      </v-btn>
    </template>
    <v-card>
      <v-card-text class="pt-3 font-weight-medium text-body-1">
        {{ msg }}
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <slot />
        <v-btn color="primary" @click="dialog = false" depressed text>
          Trở lại
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["msg", "text", "color", "width", "iconsrc"],
  data: () => ({
    dialog: false,
  }),
};
</script>

<style>
</style>