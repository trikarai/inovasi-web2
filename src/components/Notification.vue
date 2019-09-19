<template>
  <v-layout align-center justify-center>
    <v-snackbar v-model="status2.success" :multi-line="true" color="green" top class="ma-4">
      {{err_msg2.details[0]}}
      <v-btn color="white" text @click="status2.success = false">Close</v-btn>
    </v-snackbar>

    <v-snackbar v-model="status2.info" :multi-line="true" color="blue" top class="ma-4">
      {{err_msg2.details[0]}}
      <v-btn color="white" text @click="status2.info = false">Close</v-btn>
    </v-snackbar>

    <v-snackbar v-model="status2.warning" :multi-line="true" color="yellow" top class="ma-4">
      {{err_msg2.details[0]}}
      <v-btn color="white" text @click="status2.warning = false">Close</v-btn>
    </v-snackbar>

    <v-snackbar v-model="status2.error" :multi-line="true" color="red" top class="ma-4">
      {{err_msg2.code}} {{err_msg2.details[0]}}
      <v-btn color="white" text @click="status2.error = false">Close</v-btn>
    </v-snackbar>
  </v-layout>
</template>
<script>
export default {
  props: ["err_msg2", "status2"],
  data: function() {
    return {};
  }
};
</script>

