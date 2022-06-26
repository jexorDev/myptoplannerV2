<template>
  <div>
    <div>
      <div class="d-inline">You take an average of</div>
      <div class="headline d-inline">
        {{ averagePtoPerMonth }}
      </div>
      <div class="d-inline">hours per month</div>
    </div>
    <div class="mt-4">
      <div class="d-inline">You took the most hours in</div>
      <div class="headline d-inline">
        {{ mostUsageInMonth }}
      </div>
      <div class="d-inline">with {{ mostUsageHours }} hours</div>
    </div>
    <div v-if="displayMinHoursAlert" class="mt-4">
      <div class="d-inline">You must take a minimum of</div>
      <div class="d-inline headline">10 Days</div>
      <div class="d-inline">of PTO</div>
    </div>
    <div v-if="!displayMinHoursAlert" class="mt-4">
      <div class="d-inline">You have met the minimum PTO hours requirement</div>
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
