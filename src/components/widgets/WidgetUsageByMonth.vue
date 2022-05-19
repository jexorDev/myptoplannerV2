<template>
  <div>
    <apexchart
      type="bar"
      height="350"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
</template>
<script>
import { getUsageByMonth } from "@/functions/usageByMonthCalculator";

export default {
  name: "WidgetUsageByMonth",

  computed: {
    balanceByMonth() {
      return getUsageByMonth(this.$store.getters.ptoDates);
    },
    series() {
      return [
        {
          name: "Usage",
          data: this.balanceByMonth.map((x) => x.totalPto),
        },
      ];
    },
    chartOptions() {
      return {
        chart: {
          type: "bar",
          height: 350,
          zoom: {
            enabled: false,
          },
        },
        toolbar: null,
        dataLabels: {
          enabled: false,
        },

        title: {
          enabled: false,
        },
        labels: this.balanceByMonth.map((x) => x.month),
        xaxis: {
          type: "string",
        },
      };
    },
  },
};
</script>