<template>
  <v-layout>
    <v-flex xs12 sm12>
      <v-text-field
        v-model="value"
        :label="field.field_template.name"
        :hint="field.field_template.description"
        :max="field.field_template.max_size"
        :min="field.field_template.min_size"
        :rules="rules"
        :clearable="clearable"
        type="number"
      ></v-text-field>
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
      rules: [
        v => !!v || "This field is required",
        v =>
          v >= this.field.field_template.min_size ||
          "Min value is " + this.field.field_template.min_size,
        v =>
          v <= this.field.field_template.max_size ||
          "Max value is " + this.field.field_template.max_size
      ]
    };
  }
};
</script>
<style scoped>
</style>

