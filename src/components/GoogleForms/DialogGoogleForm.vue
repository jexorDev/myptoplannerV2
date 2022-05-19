<template>
  <v-dialog v-model="showSync" :width="700">
    <v-card>
      <v-card-title>
        <v-spacer></v-spacer>
        <v-icon @click="showSync = false">mdi-close</v-icon>
      </v-card-title>
      <v-card-text>
        <slot name="formContent"></slot>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  name: "DialogGoogleForm",
  props: {
    show: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    showSync: {
      get() {
        return this.show;
      },
      set(value) {
        this.$emit("update:show", value);
      },
    },
  },
};
</script>