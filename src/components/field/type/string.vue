<template>
  <v-layout>
    <v-flex xs12 sm12>
      <v-text-field
        v-model="value"
        :id="field.id"
        :name="field.id"
        :label="field.name"
        :hint="field.description"
        :clearable="clearable"
      ></v-text-field>
      <!-- :counter="field.max_value"
        :maxlength="field.max_value"
      :rules="rules"-->
    </v-flex>
  </v-layout>
</template>
<script>
import bus from "@/bus";

export default {
  props: ["field", "index"],
  components: {},
  data: function() {
    return {
      clearable: true,
      value: "",
      rules: [
        v => !!v || "This field is required",
        v =>
          v.length >= this.field.min_value ||
          "Min " + this.field.min_value + " characters",
        v =>
          v.length <= this.field.max_value ||
          "Max " + this.field.max_value + " characters"
      ]
    };
  },
  watch: {
    value: function() {
      var params = { id: this.field.id, value: this.value };
      bus.$emit("getValue", params, this.index);
    }
  }
};
</script>

<style scoped>
</style>

