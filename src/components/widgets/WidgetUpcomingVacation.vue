<template>
  <div>
    <v-timeline dense>
      <v-timeline-item v-for="(pto, index) in upcomingPto" :key="index" small>
        <v-row class="pt-1">
          <v-col>
            <strong>{{ pto.date | formatDate }}</strong>
          </v-col>
          <v-col>
            <strong>{{ pto.hours }} hrs</strong>
            <!-- <div class="text-caption">
                Mobile App
              </div> -->
          </v-col>
        </v-row>
      </v-timeline-item>
    </v-timeline>
  </div>
</template>
<script>
import moment from "moment";

export default {
  name: "WidgetUpcomingVacation",
  computed: {
    upcomingPto() {
      return this.$store.getters.ptoDates
        .filter(x => moment(x.date).isSameOrAfter(moment()))
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .slice(0, 3);
    }
  }
};
</script>
