<template>
  <div>
    <v-data-table
      :headers="tableHeaders"
      :items="ptoDates"
      :sort-by="sortBy"
    >
      <template v-slot:item.date="{ item }">
        {{ item.date | formatDate }}
      </template>
      <template v-slot:item.status="{ item }">
        <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          :color="getStatusColor(item.status)"
          v-bind="attrs"
          v-on="on"
        >
        <v-icon left small>{{ getStatusIcon(item.status) }}</v-icon
              >{{ getStatusText(item.status) }} <v-icon right small>mdi-chevron-down</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item @click="updateStatus(item, 0)"
        >
          <v-list-item-title>Unsubmitted</v-list-item-title>
        </v-list-item>
        <v-list-item @click="updateStatus(item, 1)"
        >
          <v-list-item-title>Submitted</v-list-item-title>
        </v-list-item>
        <v-list-item @click="updateStatus(item, 2)"
        >
          <v-list-item-title>Approved</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
       
      </template>
      <template v-slot:item.hours="{ item }">
        {{ item.hours }} hrs
      </template>
      <template v-slot:item.actions="{ item }">
        <v-btn text color="red" @click="deletePto(item.date)">Delete</v-btn>
      </template>
    </v-data-table>
  </div>
</template>
<script>
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
    ],
    sortBy: ["date"]
  }),
  methods: {
    deletePto(date) {
      this.$emit("delete-pto", date);
    },
    updateStatus(request, status) {
      this.$emit("update-status", request.date, status);
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
