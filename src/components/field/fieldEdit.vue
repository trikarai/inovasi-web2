<template>
  <div>
    <!-- <string-field v-bind:index="index" v-bind:field="fields" v-if="fields.type === 'string'"></string-field> -->
    <text-field v-bind:index="index" v-bind:field="fields" v-if="fields.field_template.type === 'string'"></text-field>
    <integer-field v-bind:index="index" v-bind:field="fields" v-if="fields.field_template.type === 'integer'"></integer-field>
    <select-field v-bind:index="index" v-bind:field="fields" v-if="fields.field_template.type === 'select'"></select-field>
    <!-- <attachment-field  v-bind:index="index" v-bind:field="fields" v-if="fields.type === 'att'"></attachment-field> -->
  </div>
</template>

<script>
import integer from "./type/integerEdit";
// import string from "./type/string";
import text from "./type/textEdit";
import select from "./type/select";
//   import attachment from '/./type/attachment'

export default {
  components: {
    "integer-field": integer,
    // "string-field": string,
    "text-field": text,
    "select-field": select
    //   'attachment-field': attachment
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

