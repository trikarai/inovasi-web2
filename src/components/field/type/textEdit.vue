<template>
  <v-layout>
    <!-- {{field}} -->
    <v-flex xs12 sm12>
      <v-textarea
        v-model="value"
        :id="field.field_template.id"
        :name="field.field_template.id"
        :label="field.field_template.name"
        :hint="field.field_template.description"
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
    this.value = this.field.value;
    this.fieldId = this.field.field_template.id;
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

