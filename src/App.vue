<template>
  <v-app>
    <v-app-bar app color="primary" dark clipped-left>
      <div class="d-flex align-center headline">myPTOplanner</div>

      <v-spacer></v-spacer>

      <div class="d-flex align-center mt-2">
        <v-select
          v-if="plans.length > 0"
          v-model="selectedPlan"
          :items="plans"
          outlined
          dense
          class="mt-2"
        >
          <template v-slot:append-item>
            <v-btn color="primary" text to="/add-plan">Add Plan</v-btn>
          </template>
        </v-select>
      </div>
    </v-app-bar>

    <v-navigation-drawer
      v-show="plans.length > 0"
      app
      clipped
      expand-on-hover
      permanent
    >
      <v-list>
        <v-list-item link to="/">
          <v-list-item-icon>
            <v-icon>mdi-gauge</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/planner">
          <v-list-item-icon>
            <v-icon>mdi-calendar</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Planner</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/settings">
          <v-list-item-icon>
            <v-icon>mdi-cog-outline</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Settings</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="showExportDialog = true">
          <v-list-item-icon>
            <v-icon>mdi-database-sync-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Import/Export</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <template v-slot:append>
        <v-list class="mb-6" dense>
          <v-list-item @click="showFeedbackDialog = true">
            <v-list-item-icon
              ><v-icon>mdi-comment-quote-outline</v-icon></v-list-item-icon
            >
            <v-list-item-content>Leave Feedback</v-list-item-content>
          </v-list-item>
          <v-list-item @click="showReportBugDialog = true">
            <v-list-item-icon
              ><v-icon>mdi-bug-check-outline</v-icon></v-list-item-icon
            >
            <v-list-item-content>Report a Bug</v-list-item-content>
          </v-list-item>
          <v-list-item
            link
            target="_blank"
            href="https://github.com/jexorDev/myptoplannerv2"
          >
            <v-list-item-icon>
              <v-icon>mdi-github</v-icon>
            </v-list-item-icon>
            <v-list-item-content>GitHub</v-list-item-content>
          </v-list-item>
        </v-list>
      </template>
    </v-navigation-drawer>
    <v-main class="ml-3">
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
    <DialogGoogleFormFeedback
      :show.sync="showFeedbackDialog"
    ></DialogGoogleFormFeedback>
    <DialogGoogleFormReportBug :show.sync="showReportBugDialog">
    </DialogGoogleFormReportBug>
    <ExportDialog :show.sync="showExportDialog"></ExportDialog>
  </v-app>
</template>

<script>
import DialogGoogleFormFeedback from "@/components/GoogleForms/DialogGoogleFormFeedback";
import DialogGoogleFormReportBug from "@/components/GoogleForms/DialogGoogleFormReportBug";
import ExportDialog from "@/components/Export/ExportDialog";

export default {
  name: "App",
  components: {
    DialogGoogleFormFeedback,
    DialogGoogleFormReportBug,
    ExportDialog
  },
  data: () => ({
    showFeedbackDialog: false,
    showReportBugDialog: false,
    showExportDialog: false
  }),
  computed: {
    plans() {
      return this.$store.state.plans.map(plan => plan.name);
    },
    selectedPlan: {
      get() {
        return this.$store.getters.selectedPlanName;
      },
      set(value) {
        this.$store.dispatch("setSelectedPlanName", value);
      }
    }
  },
  created: function() {
    const stateFromStorage = localStorage.getItem("state");

    if (stateFromStorage) {
      const state = JSON.parse(stateFromStorage);
      this.$store.dispatch("setState", state);
    }

    if (this.$store.state.plans.length === 0) {
      if (this.$route.name !== "Start") {
        this.$router.push({ path: "/start" });
      }
    } else {
      this.selectedPlan = this.$store.state.plans[0].name;
      this.$store.dispatch("setSelectedPlanName", this.selectedPlan);
    }
  }
};
</script>
