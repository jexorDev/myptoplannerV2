<template>
  <div>
    <v-row class="fill-height" no-gutters>
      <v-col>
        <v-sheet>
          <v-toolbar flat>
            <v-btn
              :disabled="!canMovePreviousMonth"
              fab
              text
              small
              color="grey darken-2"
              @click="prev"
            >
              <v-icon small> mdi-chevron-left </v-icon>
            </v-btn>
            <v-btn
              :disabled="!canMoveNextMonth"
              fab
              text
              small
              color="grey darken-2"
              @click="next"
            >
              <v-icon small> mdi-chevron-right </v-icon>
            </v-btn>
            <v-toolbar-title v-if="$refs.calendar" class="ml-1">
              {{ $refs.calendar.title }}
            </v-toolbar-title>
          </v-toolbar>
        </v-sheet>
        <v-sheet :height="600">
          <v-calendar
            ref="calendar"
            v-model="focus"
            type="month"
            :events="events"
            :event-color="getEventColor"
            @click:event="showEvent"
          ></v-calendar>
          <v-menu
            v-model="selectedOpen"
            :close-on-content-click="false"
            :activator="selectedElement"
            offset-x
          >
            <v-card color="grey lighten-4" min-width="350px" flat>
              <v-toolbar :color="selectedEvent.color" dark>
                <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon @click="deletePto(selectedEvent.start)">
                  <v-icon>mdi-trash-can-outline</v-icon>
                </v-btn>
              </v-toolbar>
              <v-card-text>
                <span v-html="selectedEvent.details"></span>
              </v-card-text>
              <v-card-actions>
                <v-btn text color="secondary" @click="selectedOpen = false">
                  Cancel
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-menu>
        </v-sheet>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import moment from "moment";

export default {
  name: "PlannerCalendar",
  props: {
    planYear: Number,
    ptoDates: Array,
    holidays: Array,
    flexDays: Array,
    payDays: Array
  },
  data: () => ({
    focus: "",
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false
  }),
  computed: {
    events: function() {
      return [
        ...this.ptoDates.map(ptoDate => ({
          name: `Usage: ${ptoDate.hours} hrs`,
          start: ptoDate.date,
          color: "purple",
          timed: false,
          type: "pto"
        })),
        ...this.holidays.map(holiday => ({
          name: holiday.description,
          start: holiday.date,
          color: "pink",
          timed: false,
          type: "holiday"
        })),
        ...this.flexDays.map(flexDay => ({
          name: "Flex Day",
          start: flexDay,
          color: "blue",
          timed: false,
          type: "flex"
        }))
      ];
    },
    canMovePreviousMonth() {
      return moment(this.focus).month() !== 0;
    },
    canMoveNextMonth() {
      return moment(this.focus).month() !== 11;
    }
  },
  watch: {
    focus() {
      this.$emit("focus-changed", this.focus);
    },
    planYear() {
      console.log("log");
      this.setSelectedDate();
    }
  },
  mounted() {
    this.$refs.calendar.checkChange();
    this.setSelectedDate();
  },
  methods: {
    deletePto(date) {
      this.$emit("delete-pto", date);
      this.selectedOpen = false;
    },
    prev() {
      if (this.canMovePreviousMonth) {
        this.$refs.calendar.prev();
      }
    },
    next() {
      if (this.canMoveNextMonth) {
        this.$refs.calendar.next();
      }
    },
    getEventColor(event) {
      return event.color;
    },
    showEvent({ nativeEvent, event }) {
      const open = () => {
        if (event.type !== "pto") return;

        this.selectedEvent = event;
        this.selectedElement = nativeEvent.target;
        setTimeout(() => {
          this.selectedOpen = true;
        }, 10);
      };

      if (this.selectedOpen) {
        this.selectedOpen = false;
        setTimeout(open, 10);
      } else {
        open();
      }

      nativeEvent.stopPropagation();
    },
    setSelectedDate() {
      if (moment().year() === this.planYear) {
        this.focus = moment().format("YYYY-MM-DD");
      } else {
        this.focus = moment({ month: 0, date: 1, year: this.planYear }).format(
          "YYYY-MM-DD"
        );
      }
    }
  }
};
</script>
