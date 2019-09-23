<template>
  <v-layout>
    <v-flex xs12 sm12 v-if="field.min_size === 1">
      {{field.name}}
      <v-radio-group v-model="value">
        <v-radio
          color="primary"
          v-for="option in field.options"
          :key="option.id"
          :label="option.name"
          :value="option.id"
        ></v-radio>
      </v-radio-group>
    </v-flex>
    <v-flex xs12 sm12 v-else>
      <v-select
        v-model="value"
        :label="field.name"
        :items="field.options"
        item-text="name"
        item-value="id"
        :hint="field.description"
        :clearable="clearable"
        chips
        multiple
      ></v-select>
    </v-flex>
  </v-layout>
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
      value: ""
    };
  }
};
</script>

<style scoped>
</style>

