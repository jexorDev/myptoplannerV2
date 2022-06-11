<template>
  <div>
    <v-row>
      <v-col cols="6">
        <v-card class="dashboard-card">
          <v-card-title class="headline d-flex justify-center">
            <div class="mr-5">Usage</div>
            <v-btn-toggle v-model="balanceType" mandatory dense>
              <v-btn value="byMonth">By month</v-btn>
              <v-btn value="overTime">Over time</v-btn>
            </v-btn-toggle>
          </v-card-title>
          <v-card-text>
            <WidgetBalanceOverTime
              v-show="balanceType === 'overTime'"
            ></WidgetBalanceOverTime>
            <WidgetUsageByMonth
              v-show="balanceType === 'byMonth'"
            ></WidgetUsageByMonth>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="3">
        <v-card class="dashboard-card">
          <v-card-title class="headline d-flex justify-center"
            >Upcoming</v-card-title
          >
          <v-card-text>
            <WidgetUpcomingVacation></WidgetUpcomingVacation>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
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
            >Statistics</v-card-title
          >
          <v-card-text>
            <WidgetInformation></WidgetInformation>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="3">
        <v-card class="dashboard-card">
          <v-card-title class="headline d-flex justify-center"></v-card-title>
          <v-card-text>
            <div class="d-flex justify-center">
              <v-icon>mdi-heart</v-icon>
              <div class="ml-1">More useful information coming soon</div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import WidgetHoursRemaining from "@/components/widgets/WidgetHoursRemaining";
import WidgetUsageByMonth from "@/components/widgets/WidgetUsageByMonth";
import WidgetUpcomingVacation from "@/components/widgets/WidgetUpcomingVacation";
import WidgetBalanceOverTime from "@/components/widgets/WidgetBalanceOverTime";
import WidgetInformation from "@/components/widgets/WidgetInformation";

export default {
  name: "Dashboard",
  components: {
    WidgetHoursRemaining,
    WidgetUsageByMonth,
    WidgetUpcomingVacation,
    WidgetBalanceOverTime,
    WidgetInformation
  },
  data: () => ({
    balanceType: "overTime"
  })
};
</script>
<style>
.dashboard-card {
  height: 100%;
}
</style>
