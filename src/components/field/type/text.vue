<template>
  <v-layout>
    <!-- {{field}} -->
    <v-flex xs12 sm12>
      <v-textarea
        v-model="value"
        :id="field.id"
        :name="field.id"
        :label="field.name"
        :hint="field.description"
        counter="512"
        maxlength="512"
        :clearable="clearable"
      ></v-textarea>
    </v-flex>
  </v-layout>
</template>
<script>
import { formMixins } from "@/mixins/formMixins";

export default {
  mixins: [formMixins],
  props: ["field", "index"],
  components: {},
  created() {
    this.fieldId = this.field.id;
  },
  data: function() {
    return {
      clearable: true,
      value: "",
      fieldId: "",
      rules: [v => !!v || "This field is required"]
    };
  }
};
</script>

<style scoped>
</style>

