<template>
    <div>
        <div class="overline">Used and Approved</div>
      <div class="headline">{{ totalApprovedAndUsed }}</div>
      <div class="caption font-italic">Indicate on request as "U&A - {{totalApprovedAndUsed}}"</div>
      <div class="overline">Unapproved</div>
      <div class="headline">{{ totalUnapproved }}</div>
      <div class="caption font-italic">Indicate on request as "P - {{totalUnapproved}}"</div>


    </div>
  </template>
  <script>
  import plannerMixin from "@/mixins/plannerMixin";
  
  export default {
    name: "WidgetApprovedAndUsedTotal",
    mixins: [plannerMixin],
    computed: {
      totalApprovedAndUsed() {
        return this.ptoDates.filter(x => x.approved).reduce((acc, val) => {
        return acc + val.hours;
      }, 0);
      },
      totalUnapproved() {
        return this.ptoDates.filter(x => !x.approved).reduce((acc, val) => {
        return acc + val.hours;
      }, 0);
      }
    }
  };
  </script>
  