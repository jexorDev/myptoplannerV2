<template>
  <div>
    <div class="d-flex d-inline mt-1">
      <v-chip color="success lighten-1" class="mr-2" large>
        <div class="headline white--text">{{ totalApprovedAndUsed }}</div>
      </v-chip>
      <v-icon large>mdi-account-check</v-icon>
      <div class="headline mt-2 ml-1">Approved</div>
    </div>
    <div class="caption font-italic">
      Indicate on next request as "U&A - {{ totalApprovedAndUsed }}"
    </div>

    <div class="d-flex d-inline mt-1">
      <v-chip color="primary lighten-1" class="mr-2" large>
        <div class="headline white--text">{{ totalSubmitted }}</div>
      </v-chip>
      <v-icon large>mdi-account-clock</v-icon>
      <div class="headline mt-2 ml-1">Submitted</div>
    </div>
    <div v-show="totalSubmitted > 0" class="caption font-italic">
      Indicate on next request as "P - {{ totalSubmitted }}"
    </div>

    <div class="d-flex d-inline mt-1">
      <v-chip color="warning lighten-1" class="mr-2" large>
        <div class="headline white--text">{{ totalUnsubmitted }}</div>
      </v-chip>
      <v-icon large>mdi-account-edit-outline</v-icon>
      <div class="headline mt-2 ml-1">Unsubmitted</div>
    </div>
  </div>
</template>
<script>
import plannerMixin from "@/mixins/plannerMixin";

export default {
  name: "WidgetApprovedAndUsedTotal",
  mixins: [plannerMixin],
  computed: {
    totalApprovedAndUsed() {
      return this.ptoDates
        .filter(x => x.status === 2)
        .reduce((acc, val) => {
          return acc + val.hours;
        }, 0);
    },
    totalSubmitted() {
      return this.ptoDates
        .filter(x => x.status === 1)
        .reduce((acc, val) => {
          return acc + val.hours;
        }, 0);
    },
    totalUnsubmitted() {
      return this.ptoDates
        .filter(x => x.status === undefined || x.status === 0)
        .reduce((acc, val) => {
          return acc + val.hours;
        }, 0);
    }
  }
};
</script>
