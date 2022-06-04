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
            >Upcoming</v-card-title
          >
          <v-card-text>
            <WidgetUpcomingVacation></WidgetUpcomingVacation>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
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
import WidgetUsageByMonth from "@/components/widgets/WidgetUsageByMonth";
import WidgetUpcomingVacation from "@/components/widgets/WidgetUpcomingVacation";

export default {
  name: "Dashboard",
  components: {
    WidgetHoursRemaining,
    WidgetUsageByMonth,
    WidgetUpcomingVacation
  }
};
</script>
<style>
.dashboard-card {
  height: 100%;
}
</style>
