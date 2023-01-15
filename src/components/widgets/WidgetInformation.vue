<template>
  <div>
    <div class="overline">Average hours per month</div>
    <div class="headline" v-text="averagePtoPerMonth"></div>

    <div class="overline">Most hours taken in</div>
    <div class="headline" v-text="mostUsageInMonth"></div>

    <div v-if="displayMinHoursAlert" class="d-flex d-inline">
      <v-icon>mdi-alert-outline</v-icon>
      <div>You have not met the minimum requirement of 10 PTO Days</div>
    </div>
    <div v-if="!displayMinHoursAlert" class="d-flex d-inline">
      <v-icon>mdi-alert-check</v-icon>

      <div>You have met the minimum PTO hours requirement</div>
    </div>
  </div>
</template>
<script>
import plannerMixin from "@/mixins/plannerMixin";
import { getUsageByMonth } from "@/functions/usageByMonthCalculator";

export default {
  name: "WidgetInformation",
  mixins: [plannerMixin],
  computed: {
    averagePtoPerMonth() {
      return Math.round(this.totalPtoPlanned / 12, 1);
    },
    mostUsageHours() {
      return Math.max(
        ...getUsageByMonth(this.$store.getters.ptoDates).map(x => x.totalPto)
      );
    },
    mostUsageInMonth() {
      return getUsageByMonth(this.$store.getters.ptoDates).find(
        x => x.totalPto === this.mostUsageHours
      ).month;
    },
    displayMinHoursAlert() {
      return this.totalPtoPlanned < 80;
    }
  }
};
</script>
