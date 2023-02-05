<template>
  <div>
    <v-simple-table dense>
      <template v-slot:default>
        <thead></thead>
        <tbody>
          <tr v-for="item in upcomingPto" :key="item.date">
            <td>{{ item.date | formatDate }}</td>
            <td>{{ item.hours }} hrs</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
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
        .slice(0, 4);
    }
  }
};
</script>
