<template>
  <DialogGoogleForm :show.sync="showSync">
    <template v-slot:formContent>
      <iframe
        src="https://docs.google.com/forms/d/e/1FAIpQLSfuGMdHsP__7DeFYhcDL_WD2tvGWRqkcKhSme2m-TIQK2fLRA/viewform?embedded=true"
        width="640"
        height="900"
        frameborder="0"
        marginheight="0"
        marginwidth="0"
        >Loading…</iframe
      >
    </template>
  </DialogGoogleForm>
</template>
<script>
import DialogGoogleForm from "@/components/GoogleForms/DialogGoogleForm";

export default {
  name: "DialogGoogleFeedback",
  components: { DialogGoogleForm },
  props: {
    show: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    showSync: {
      get() {
        return this.show;
      },
      set(value) {
        this.$emit("update:show", value);
      }
    }
  }
};
</script>
