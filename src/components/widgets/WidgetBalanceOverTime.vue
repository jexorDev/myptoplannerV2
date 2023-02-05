<template>
  <div>
    <apexchart
      type="area"
      height="350"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
</template>
<script>
import { getAggregatedEventList } from "@/functions/eventAggregator";
import moment from "moment";

export default {
  name: "WidgetBalanceOverTime",

  computed: {
    burndown() {
      return getAggregatedEventList(this.$store.getters.ptoDates, this.$store.getters.selectedPlan.year);
    },
    maxHours() {
      return this.$store.getters.selectedPlan.hoursToPlan;
    },
    series() {
      return [
        {
          name: "Actual Usage",
          data: this.burndown.map(x => x.runningTotal)
        },
       
      ];
    },
    chartOptions() {
      return {
        chart: {
          type: "area",
          height: 350,
          zoom: {
            enabled: false
          },
       
        },
      
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: "smooth"
        },

        title: {
          enabled: false
        },
        labels: this.burndown.map(x =>
          moment(x.date).format("MM/DD/YYYY")
        ),
        xaxis: {
          type: "datetime"
        },
        yaxis: {
          opposite: true,
          min: 0,
        max: this.$store.getters.selectedPlan.hoursToPlan,
        forceNiceScale: true,
        reversed: true,
        },
        legend: {
          horizontalAlign: "left"
        },
       
      };
    }
  }
};
</script>
