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
            <v-btn @click="viewScore(item.value)" color="primary" class="mr-1">View</v-btn>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>

    <v-dialog v-model="scoreDialog" max-width="400">
      <v-card tile>
        <v-card-title>Score Detail</v-card-title>
        <!-- <v-card-text>{{scoreValue}}</v-card-text> -->
        <v-list>
          <v-list-item two-line v-for="data in scoreValue" :key="data.id">
            <v-list-item-content>
              <v-list-item-subtitle>{{data.field_template.name}}</v-list-item-subtitle>
              <v-list-item-title>{{data.value}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
import auth from "@/config/auth";
import bus from "@/bus";
import * as config from "@/config/app.config";
export default {
  data: function() {
    return {
      tableLoad: false,
      dataList: { total: 0, list: [] },
      headers: [
        { text: "Name", value: "scoring.name", sortable: false },
        {
          text: "Template",
          value: "scoring.scoring_template.name",
          sortable: false
        },
        {
          text: "Participant",
          value: "participant.team.name",
          sortable: false
        },
        { text: "Scoring Time", value: "scoring_time", sortable: false },
        { text: "", value: "action", align: "right" }
      ],
      scoreDialog: false,
      scoreValue: ""
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
          config.baseUri + "/tutor/" + this.$route.params.mentorId + "/score",
          { headers: auth.getAuthHeader() }
        )
        .then(res => {
          if (res.data.data) {
            this.dataList = res.data.data;
          } else {
            this.dataList = { total: 0, list: [] };
          }
        })
        .catch(res => {
          bus.$emit("callNotif", "error", res);
        })
        .finally(() => {
          this.tableLoad = false;
        });
    },
    viewScore: function(value) {
      this.scoreDialog = true;
      this.scoreValue = value;
    }
  }
};
</script>

<style scoped>
</style>