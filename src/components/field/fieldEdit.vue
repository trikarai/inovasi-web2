<template>
  <div>
    <!-- <string-field v-bind:index="index" v-bind:field="fields" v-if="fields.type === 'string'"></string-field> -->
    <select-field
      v-bind:index="index"
      v-bind:field="fields"
      v-if="fields.field_template.type === 'select'"
    ></select-field>
    <text-field
      v-bind:index="index"
      v-bind:field="fields"
      v-if="fields.field_template.type === 'string'"
    ></text-field>
    <integer-field
      v-bind:index="index"
      v-bind:field="fields"
      v-if="fields.field_template.type === 'integer'"
    ></integer-field>
    <attachment-field
      v-bind:index="index"
      v-bind:field="fields"
      v-if="fields.field_template.type === 'attachment'"
    ></attachment-field>
  </div>
</template>

<script>
// import string from "./type/string";
import select from "./type/selectEdit";
import integer from "./type/integerEdit";
import text from "./type/textEdit";
import attachment from "./type/attachmentEdit";

export default {
  components: {
    // "string-field": string,
    "select-field": select,
    "integer-field": integer,
    "text-field": text,
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

