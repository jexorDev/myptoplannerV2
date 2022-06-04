<template>
  <div>
    <v-timeline dense>
      <v-timeline-item right small>
        You entered {{ planYear }} with a Banked PTO balance of
        <span class="primary--text">{{ bankedHoursFromPriorYear }}</span>
        hours</v-timeline-item
      >
      <v-timeline-item right small>
        You will accrue
        <span class="primary--text">{{ hoursWillAccrueForPlanYear }}</span>
        hours this year
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              v-bind="attrs"
              @click="showPtoAccrualDialog = true"
              v-on="on"
              >mdi-information-outline</v-icon
            >
          </template>
          <span>How was this calculated?</span>
        </v-tooltip>
      </v-timeline-item>
      <v-timeline-item right small>
        You are rolling over
        <span class="primary--text">{{ hoursToPlan }}</span>
        hours to {{ planYearNumeric + 1 }}
      </v-timeline-item>
      <v-timeline-item right small>
        You need to use
        <span class="primary--text">{{ hoursNeedToUse }}</span>
        hours prior to January 1, {{ planYearNumeric + 1 }}</v-timeline-item
      >
      <v-timeline-item v-if="hoursToPlan > 0" right small>
        Your starting Banked PTO balance in {{ planYearNumeric + 1 }} will be
        <span class="primary--text">{{ nextYearBankedPto }}</span>
      </v-timeline-item>
    </v-timeline>
    <v-dialog v-model="showPtoAccrualDialog" max-width="600">
      <v-card>
        <v-card-title>PTO Accrual </v-card-title>
        <v-card-text>
          <div class="font-weight-regular">
            Here are the effective dates that were used to calculate your total
            PTO accrual
          </div>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th>Start</th>
                  <th>End</th>
                  <th>Hours Per Pay</th>
                  <th>Total Hours</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(ptoRow, index) in ptoAccrualBreakdown" :key="index">
                  <td>{{ ptoRow.dateStart.format("MM/DD/YYYY") }}</td>
                  <td>{{ ptoRow.dateEnd.format("MM/DD/YYYY") }}</td>
                  <td>{{ ptoRow.ptoHoursPerPay }}</td>
                  <td>{{ ptoRow.totalPtoHours }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="showPtoAccrualDialog = false"
            >OK</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  name: "SetupSummary",
  props: {
    planYear: {
      type: String,
      required: true
    },
    bankedHoursFromPriorYear: {
      type: Number,
      required: false,
      default: 0
    },
    hoursWillAccrueForPlanYear: {
      type: Number,
      required: true
    },
    hoursToPlan: {
      type: Number,
      required: false,
      default: 0
    },
    ptoAccrualBreakdown: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    showPtoAccrualDialog: false
  }),
  computed: {
    hoursNeedToUse() {
      return this.hoursWillAccrueForPlanYear - this.hoursToPlan;
    },
    nextYearBankedPto() {
      return this.bankedHoursFromPriorYear + this.hoursToPlan;
    },
    planYearNumeric() {
      return parseInt(this.planYear);
    }
  }
};
</script>
