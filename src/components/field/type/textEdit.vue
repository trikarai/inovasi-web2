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
        counter="500"
        maxlength="500"
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
  },
  data: function() {
    return {
      clearable: true,
      value: "",
      rules: [v => !!v || "This field is required"]
    };
  }
};
</script>

<style scoped>
</style>

