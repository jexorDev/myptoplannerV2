<template>
  <v-menu
    ref="menu"
    v-model="showMenu"
    :close-on-content-click="false"
    transition="scale-transition"
    offset-y
    max-width="290px"
    min-width="290px"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        v-model="selectedDateFormatted"
        :label="label"
        hint="MM/DD/YYYY"
        :prepend-icon="showIcon ? 'mdi-calendar' : ''"
        style="width: 150px"
        v-bind="attrs"
        @blur="setSelectedDate"
        @keydown="showMenu = false"
        v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker
      v-model="selectedDateSync"
      no-title
      @input="showMenu = false"
    ></v-date-picker>
  </v-menu>
</template>
<script>
import { formatDate, getIsoDateString } from "@/functions/dateHelpers";

export default {
  name: "DatePickerInMenu",
  props: {
    label: String,
    selectedDate: String,
    showIcon: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  data: () => ({
    showMenu: false,
    selectedDateFormatted: ""
  }),
  computed: {
    selectedDateSync: {
      get() {
        return this.selectedDate;
      },
      set(value) {
        this.$emit("update:selectedDate", getIsoDateString(value));
      }
    }
  },
  watch: {
    selectedDate() {
      this.selectedDateFormatted = formatDate(this.selectedDate);
    }
  },
  mounted() {
    this.selectedDateFormatted = formatDate(this.selectedDate);
  },
  methods: {
    setSelectedDate() {
      this.$emit(
        "update:selectedDate",
        getIsoDateString(this.selectedDateFormatted)
      );
    }
  }
};
</script>
