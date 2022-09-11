<template>
  <v-dialog v-model="showSync" :width="700">
    <v-card>
      <v-card-title>
        <v-spacer></v-spacer>
        <v-icon @click="showSync = false">mdi-close</v-icon>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col>
            <div class="display-1 headline">Export</div>
            <v-btn medium color="primary" @click="saveFile"
              >Download Export</v-btn
            >
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <div class="display-1 headline">Import</div>
            <div>Will immediately overwrite current data</div>
            <input v-show="!showLoading" type="file" @change="importFile" />
            <v-progress-linear
              v-show="showLoading"
              stream
              buffer-value="0"
              color="green"
            ></v-progress-linear>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  name: "ExportDialog",
  props: {
    show: {
      type: Boolean,
      required: true
    }
  },
  data: () => ({
    showLoading: false
  }),
  computed: {
    showSync: {
      get() {
        return this.show;
      },
      set(value) {
        this.$emit("update:show", value);
      }
    }
  },
  methods: {
    saveFile: function() {
      const data = JSON.stringify(this.$store.getters.entireState);
      const blob = new Blob([data], { type: "text/plain" });
      const e = document.createEvent("MouseEvents"),
        a = document.createElement("a");
      a.download = "export.json";
      a.href = window.URL.createObjectURL(blob);
      a.dataset.downloadurl = ["text/json", a.download, a.href].join(":");
      e.initEvent(
        "click",
        true,
        false,
        window,
        0,
        0,
        0,
        0,
        0,
        false,
        false,
        false,
        false,
        0,
        null
      );
      a.dispatchEvent(e);
    },
    importFile: function(e) {
      this.showLoading = true;
      var reader = new FileReader();
      reader.readAsText(e.target.files[0], "UTF-8");
      reader.onload = function(evt) {
        localStorage.setItem("state", evt.target.result);

        this.showLoading = false;
        location.reload();
      };
    }
  }
};
</script>
