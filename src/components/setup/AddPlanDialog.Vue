<template>
  <v-dialog v-model="showSync" :width="700">
    <v-card>
      <v-card-title>
        <v-spacer></v-spacer>
        <v-icon @click="showSync = false">mdi-close</v-icon>
      </v-card-title>
      <v-card-text>
             <v-row>
            <v-col>
              <div class="headline">{{ planName }}</div>
              <div class="overline">Your plan summary</div>
            </v-col>
          </v-row>
          <v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  name: "AddPlanForm",
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
    data: () => ({
    participatesInFlex: false,
    flexScheduleType: "full",
    flexDayReferenceDate: getIsoDateString(moment()),
    planName: "",
    selectedPlanYear: "",
    hoursToPlan: 200
  }),
};
</script>