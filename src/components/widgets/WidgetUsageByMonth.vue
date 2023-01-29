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
    totalBalanceByMonth() {
      return getUsageByMonth(this.$store.getters.ptoDates);
    },
    approvedBalanceByMonth() {
      return getUsageByMonth(
        this.$store.getters.ptoDates.filter(x => x.status === 2)
      );
    },
    submittedBalanceByMonth() {
      return getUsageByMonth(
        this.$store.getters.ptoDates.filter(x => x.status === 1)
      );
    },
    unsubmittedBalanceByMonth() {
      return getUsageByMonth(
        this.$store.getters.ptoDates.filter(
          x => x.status === undefined || x.status === 0
        )
      );
    },
    series() {
      return [
        {
          name: "Approved",
          data: this.approvedBalanceByMonth.map(x => x.totalPto)
        },
        {
          name: "Submitted",
          data: this.submittedBalanceByMonth.map(x => x.totalPto)
        },
        {
          name: "Unsubmitted",
          data: this.unsubmittedBalanceByMonth.map(x => x.totalPto)
        }
      ];
    },
    chartOptions() {
      return {
        chart: {
          type: "bar",
          height: 350,
          zoom: {
            enabled: false
          },
          stacked: true
        },
        toolbar: null,
        dataLabels: {
          enabled: true,
          textAnchor: "start",
          offsetX: 0
        },
        title: {
          enabled: false
        },
        labels: this.approvedBalanceByMonth.map(x => x.month),

        xaxis: {
          type: "string"
        }
      };
    }
  }
};
</script>
