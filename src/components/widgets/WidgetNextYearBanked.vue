<template>
  <div>
    <div class="headline">Next year starting balance</div>
    <div>
      <div class="display-4 d-inline">
        {{ endingBalance }}
      </div>
      <div class="d-inline">hours</div>
    </div>
    <div class="mt-4">
      <div class="font-weight-medium mr-1 d-inline">
        You started this year with
      </div>
      <div class="d-inline">{{ startingBalance }} hours</div>
    </div>
  </div>
</template>
<script>
import plannerMixin from "@/mixins/plannerMixin";

export default {
  name: "WidgetNextYearBanked",
  mixins: [plannerMixin],
  computed: {
    startingBalance() {
      return this.$store.getters.selectedPlan.hoursBankedPrior;
    },
    endingBalance() {
      return (
        this.$store.getters.selectedPlan.hoursBankedPrior +
        Math.min(this.totalPtoAccrualHours - this.totalPtoPlanned, 40)
      );
    }
  }
};
</script>
