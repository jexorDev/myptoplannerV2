<template>
  <div>
    <div class="d-flex justify-center">
      <v-progress-circular
        :rotate="-90"
        :size="100"
        :width="15"
        :value="plannedPtoPercent"
        color="pink"
      >
        {{ totalPtoPlanned }}
      </v-progress-circular>
    </div>

    <div class="d-flex justify-center font-weight-medium">
      {{ totalPtoPlanned }} of {{ totalPtoToPlan }} planned
    </div>
    <div class="d-flex justify-center">
      {{ remainingPtoToPlan }} hours remaining to plan
    </div>
  </div>
</template>
<script>
import plannerMixin from "@/mixins/plannerMixin";

export default {
  name: "WidgetHoursRemaining",
  mixins: [plannerMixin],
  computed: {
    totalPtoToPlan() {
      return (
        this.$store.getters.selectedPlan.hoursToPlan
      );
    },
    remainingPtoToPlan() {
      return this.totalPtoToPlan - this.totalPtoPlanned;
    },
    plannedPtoPercent() {
      return this.totalPtoToPlan > 0
        ? (this.totalPtoPlanned / this.totalPtoToPlan) * 100
        : 0;
    },
  },
};
</script>