<template>
  <div>
    <v-row>
      <v-col cols="3">
        <v-card class="dashboard-card">
          <v-card-title class="headline d-flex justify-center"
            >Planned hours</v-card-title
          >
          <v-card-text>
            <WidgetHoursRemaining></WidgetHoursRemaining>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="3">
        <v-card class="dashboard-card">
          <v-card-title class="headline d-flex justify-center"
            >Rollover hours</v-card-title
          >
          <v-card-text>
            <WidgetRolloverHoursRemaining></WidgetRolloverHoursRemaining>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="3">
        <v-card class="dashboard-card">
          <v-card-text>
            <WidgetNextYearBanked></WidgetNextYearBanked>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6">
        <v-card class="dashboard-card">
          <v-card-title class="headline d-flex justify-center">
            Balance over time
          </v-card-title>
          <v-card-text>
            <WidgetBalanceOverTime></WidgetBalanceOverTime>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card class="dashboard-card">
          <v-card-title class="headline d-flex justify-center">
            Usage by month
          </v-card-title>
          <v-card-text>
            <WidgetUsageByMonth></WidgetUsageByMonth>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import WidgetHoursRemaining from "@/components/widgets/WidgetHoursRemaining";
import WidgetRolloverHoursRemaining from "@/components/widgets/WidgetRolloverHoursRemaining";
import WidgetNextYearBanked from "@/components/widgets/WidgetNextYearBanked";
import WidgetBalanceOverTime from "@/components/widgets/WidgetBalanceOverTime";
import WidgetUsageByMonth from "@/components/widgets/WidgetUsageByMonth";

export default {
  name: "Dashboard",
  components: {
    WidgetHoursRemaining,
    WidgetRolloverHoursRemaining,
    WidgetNextYearBanked,
    WidgetBalanceOverTime,
    WidgetUsageByMonth,
  },
};
</script>
<style>
.dashboard-card {
  height: 100%;
}
</style>