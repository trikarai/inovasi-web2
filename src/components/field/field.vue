<template>
  <div>
    <!-- <string-field v-bind:index="index" v-bind:field="fields" v-if="fields.type === 'string'"></string-field> -->
    <text-field v-bind:index="index" v-bind:field="fields" v-if="fields.type === 'string'"></text-field>
    <integer-field v-bind:index="index" v-bind:field="fields" v-if="fields.type === 'integer'"></integer-field>
    <select-field v-bind:index="index" v-bind:field="fields" v-if="fields.type === 'select'"></select-field>
    <attachment-field
      v-bind:index="index"
      v-bind:field="fields"
      v-if="fields.type === 'attachment'"
    ></attachment-field>
  </div>
</template>

<script>
import integer from "./type/integer";
// import string from "./type/string";
import text from "./type/text";
import select from "./type/select";
import attachment from "./type/attachment";

export default {
  components: {
    "integer-field": integer,
    // "string-field": string,
    "text-field": text,
    "select-field": select,
    "attachment-field": attachment
  },
  props: ["fields", "index"],
  data: function() {
    return {
      show: false,
      value: "",
      form: {
        value: ""
      }
    };
  },
  created: function() {},
  methods: {}
};
</script>

