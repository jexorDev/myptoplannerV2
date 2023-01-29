<template>
  <div>
    <v-data-table
      :headers="tableHeaders"
      :items="aggregatedEventList"
      disable-sort
    >
      <template v-slot:item.date="{ item }">
        {{ item.date | formatDate }}
      </template>
      <template v-slot:item.status="{ item }">
        <v-tooltip right>
          <template v-slot:activator="{ on, attrs }">
            <v-chip
              label
              :color="getStatusColor(item.status)"
              v-bind="attrs"
              @click="updateStatus(item)"
              v-on="on"
              ><v-icon left small>{{ getStatusIcon(item.status) }}</v-icon
              >{{ getStatusText(item.status) }}</v-chip
            >
          </template>
          <span>Click to toggle status</span>
        </v-tooltip>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-btn text color="red" @click="deletePto(item.date)">Delete</v-btn>
      </template>
    </v-data-table>
  </div>
</template>
<script>
import { getAggregatedEventList } from "@/functions/eventAggregator";
import plannerMixin from "@/mixins/plannerMixin";

export default {
  name: "PlannerList",
  mixins: [plannerMixin],
  data: () => ({
    tableHeaders: [
      { text: "Date", value: "date" },
      { text: "Status", value: "status" },
      { text: "Amount", value: "hours", align: "end" },
      { text: "", value: "actions", width: "200", align: "end" }
    ]
  }),
  computed: {
    aggregatedEventList() {
      return getAggregatedEventList(
        this.ptoDates,
        this.payDays,
        this.$store.getters.userInfo.dateOfHire,
        this.$store.getters.selectedPlan.year,
        this.$store.getters.selectedPlan.hoursBankedPrior,
        this.totalPtoAccrualHours,
        this.$store.getters.selectedPlan.hoursToPlan
      );
    }
  },
  methods: {
    deletePto(date) {
      this.$emit("delete-pto", date);
    },
    updateStatus(request) {
      const newStatus = request.status === 2 ? 0 : request.status + 1;
      console.log(newStatus);
      this.$emit("update-status", request.date, newStatus);
    },
    getStatusText(status) {
      if (status === 2) {
        return "Approved";
      }
      if (status === 1) {
        return "Submitted";
      }

      return "Unsubmitted";
    },
    getStatusColor(status) {
      if (status === 2) {
        return "success lighten-1";
      }
      if (status === 1) {
        return "primary lighten-1";
      }

      return "warning lighten-1";
    },
    getStatusIcon(status) {
      if (status === 2) {
        return "mdi-account-check";
      }
      if (status === 1) {
        return "mdi-account-clock";
      }

      return "mdi-account-edit-outline";
    }
  }
};
</script>
