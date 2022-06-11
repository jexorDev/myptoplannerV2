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
    <div v-if="!showOverageWarning" class="d-flex justify-center">
      {{ remainingPtoToPlan }} hours remaining to plan
    </div>
    <div v-if="showOverageWarning" class="d-flex justify-center">
      <v-icon>mdi-alert</v-icon>
      <div class="ml-1">
        You have gone over your planned PTO by
        {{ remainingPtoToPlan * -1 }} hours
      </div>
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
      return this.$store.getters.selectedPlan.hoursToPlan;
    },
    remainingPtoToPlan() {
      return this.totalPtoToPlan - this.totalPtoPlanned;
    },
    plannedPtoPercent() {
      return this.totalPtoToPlan > 0
        ? (this.totalPtoPlanned / this.totalPtoToPlan) * 100
        : 0;
    },
    showOverageWarning() {
      return this.remainingPtoToPlan < 0;
    }
  }
};
</script>
