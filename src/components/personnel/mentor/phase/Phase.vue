<template>
  <v-container>
    <!-- {{dataList}} -->
    <v-layout>
      <v-flex md12>
        <v-data-table
          :loading="tableLoad"
          :headers="headers"
          :items="dataList.list"
          class="elevation-1"
        >
          <template v-slot:item.action="{ item }">
            <v-btn @click="gotoScoring(item)" color="primary" class="mr-1">Scoring</v-btn>
            <v-btn @click="gotoScore(item)" color="primary" class="mr-1">Score</v-btn>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import auth from "@/config/auth";
import * as config from "@/config/app.config";
export default {
  data: function() {
    return {
      tableLoad: false,
      dataList: { total: 0, list: [] },
      headers: [
        { text: "Name", value: "name", sortable: false },
        { text: "Phase Plan", value: "phase_plan.name", sortable: false },
        { text: "Start Period", value: "start_period", sortable: false },
        { text: "End Period", value: "end_period", sortable: false },
        { text: "", value: "action", align: "right" }
      ]
    };
  },
  watch: {},
  created: function() {},
  mounted: function() {
    this.getDataList();
  },
  methods: {
    getDataList: function() {
      this.tableLoad = true;
      this.axios
        .get(
          config.APIENDPOINT +
            "/programme/" +
            this.$route.params.programId +
            "/phase",
          { headers: auth.getAuthHeader() }
        )
        .then(res => {
          if (res.data.data) {
            this.dataList = res.data.data;
          } else {
            this.dataList = { total: 0, list: [] };
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.tableLoad = false;
        });
    },
    gotoScore: function(item) {
      this.$router.push({ path: "/personnel/mentor/" + this.$route.params.mentorId + "/program/" + this.$route.params.programId +"/phase/" + item.id + "/score" });
    },
    gotoScoring: function(item) {
      this.$router.push({ path: "/personnel/mentor/" + this.$route.params.mentorId + "/program/" + this.$route.params.programId +"/phase/" + item.id + "/scoring" });
    }
  }
};
</script>

<style scoped>
</style>