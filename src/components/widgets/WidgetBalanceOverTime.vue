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
    balanceByMonth() {
      return getAggregatedEventList(this.$store.getters.ptoDates);
    },
    maxHours() {
      return this.$store.getters.selectedPlan.hoursToPlan;
    },
    series() {
      return [
        {
          name: "Balance",
          data: this.balanceByMonth.map(x => x.runningTotal)
        }
      ];
    },
    chartOptions() {
      return {
        chart: {
          type: "area",
          height: 350,
          zoom: {
            enabled: false
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: "straight"
        },

        title: {
          enabled: false
        },
        labels: this.balanceByMonth.map(x =>
          moment(x.date).format("MM/DD/YYYY")
        ),
        xaxis: {
          type: "datetime"
        },
        yaxis: {
          opposite: true
        },
        legend: {
          horizontalAlign: "left"
        },
        annotations: {
          yaxis: [
            {
              y: this.maxHours,
              y2: this.maxHours + 1,
              borderColor: "red",
              label: {
                show: true,
                text: "Goal",
                style: {
                  color: "red",
                  background: "pink"
                }
              }
            }
          ],
          xaxis: []
        }
      };
    }
  }
};
</script>
