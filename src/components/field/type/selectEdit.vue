<template>
  <v-row>
    <!-- {{field}} -->
    <v-flex xs12 sm12 v-if="field.field_template.min_size === 1">
      {{field.field_template.name}}
      <v-radio-group v-model="value">
        <v-radio
          color="primary"
          v-for="option in field.field_template.options"
          :key="option.id"
          :label="option.name"
          :value="option.id"
        ></v-radio>
      </v-radio-group>
    </v-flex>
    <v-flex xs12 sm12 v-else>
      <v-select
        class="ma-2"
        v-model="value"
        :label="field.field_template.name"
        :items="field.field_template.options"
        item-text="name"
        item-value="id"
        chips
        multiple
      ></v-select>
    </v-flex>
  </v-row>
</template>
<script>
import bus from "@/bus";

export default {
  props: ["field", "index"],
  components: {},
  data: function() {
    return {
      clearable: true,
      value: ""
    };
  },
  watch: {
    value: function() {
      var params = "";
      if (this.field.field.minValue === 1) {
        var arr = new Array(this.value);
        params = { id: this.field.field.id, value: arr };
      } else {
        params = { id: this.field.field.id, value: this.value };
      }
      bus.$emit("getValue", params, this.index);
    }
  }
};
</script>

<style scoped>
</style>

