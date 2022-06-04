<template>
  <div>
    <div class="d-flex justify-center">
      <v-progress-circular
        :rotate="-90"
        :size="100"
        :width="15"
        :value="remainingRolloverHoursPercent"
        color="teal"
      >
        {{ remainingRolloverHours }}
      </v-progress-circular>
    </div>

    <div class="d-flex justify-center font-weight-medium">
      {{ remainingRolloverHours }} hours will roll to banked PTO next year
    </div>
    <div
      v-if="showChangeRolloverAmountMessage"
      class="d-flex justify-center font-weight-light"
    >
      You've gone over your planned amount to rollover. You can adjust this on
      the settings page.
    </div>
  </div>
</template>
<script>
import plannerMixin from "@/mixins/plannerMixin";

export default {
  name: "WidgetRolloverHoursRemaining",
  mixins: [plannerMixin],
  computed: {
    remainingRolloverHours() {
      const remainingHours = this.totalPtoAccrualHours - this.totalPtoPlanned;

      if (remainingHours - this.$store.getters.selectedPlan.hoursToPlan >= 0) {
        return this.$store.getters.selectedPlan.hoursToPlan;
      } else {
        if (remainingHours > 0) {
          return remainingHours;
        } else {
          return 0;
        }
      }
    },
    remainingRolloverHoursPercent() {
      if (this.$store.getters.selectedPlan.hoursToPlan > 0) {
        return (
          (this.remainingRolloverHours /
            this.$store.getters.selectedPlan.hoursToPlan) *
          100
        );
      } else {
        return (
          (Math.min(this.totalPtoAccrualHours - this.totalPtoPlanned, 40) /
            40) *
          100
        );
      }
    },
    showChangeRolloverAmountMessage() {
      return (
        this.$store.getters.selectedPlan.hoursToPlan > 0 &&
        this.remainingRolloverHoursPercent !== 100
      );
    }
  }
};
</script>
