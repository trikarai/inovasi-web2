<template>
  <div>
    <v-flex xs12 sm12>
      <v-text-field
        v-model="value"
        :label="field.name"
        :hint="field.description"
        :max="field.max_size"
        :min="field.min_size"
        :rules="rules"
        :clearable="clearable"
        type="number"
      ></v-text-field>
    </v-flex>
  </div>
</template>
<script>
import { formMixins } from "@/mixins/formMixins";

export default {
  mixins: [formMixins],
  props: ["field", "index"],
  components: {},
  data: function() {
    return {
      clearable: true,
      value: "",
      rules: [
        v => !!v || "This field is required",
        v => v >= this.field.min_size || "Min value is " + this.field.min_size,
        v => v <= this.field.max_size || "Max value is " + this.field.max_size
      ]
    };
  }
};
</script>
<style scoped>
</style>

