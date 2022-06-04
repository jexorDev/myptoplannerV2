<template>
  <DialogGoogleForm :show.sync="showSync">
    <template v-slot:formContent>
      <iframe
        src="https://docs.google.com/forms/d/e/1FAIpQLSeeKBxYY82QrNLX38S2yx3C98Rr9KmmeInp5qahxo3N3ai3YQ/viewform?embedded=true"
        width="640"
        height="712"
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
