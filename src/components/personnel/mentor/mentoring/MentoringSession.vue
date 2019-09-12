<template>
  <v-container>
    <v-layout>
      <!-- {{dataList}} -->
      <v-flex md12>
        <v-data-table
          :loading="tableLoad"
          :headers="headers"
          :items="dataList.list"
          class="elevation-1"
        >
          <template v-slot:item.status="{ item }">
            <v-chip :color="getColor(item.status)" dark>{{ item.status }}</v-chip>
          </template>
          <template v-slot:item.action="{ item }">
            <template v-if="item.status == 'proposed'">
              <v-btn @click="approve(item.id)" rounded color="success" class="mr-1">Accept</v-btn>
              <v-btn @canplay="reject(item.id)" rounded color="warning" class="mr-1">Reject</v-btn>
            </template>
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
        { text: "Name", value: "mentoring.name" },
        { text: "participant", value: "participant.team.name" },
        { text: "Schedule", value: "mentoring.start_date" },
        { text: "Media", value: "media" },
        { text: "Rating", value: "rating_from_participant" },
        { text: "Status", value: "status" },
        { text: "", value: "action" }
      ]
    };
  },
  watch: {},
  created: function() {},
  mounted: function() {
    this.getDataList();
  },
  methods: {
    getColor(status) {
      if (status == "approved") return "green";
      else if (status == "rejected") return "red";
      else return "blue";
    },
    getDataList: function() {
      this.tableLoad = true;
      this.axios
        .get(
          config.APIENDPOINT +
            "/tutor/" +
            this.$route.params.mentorId +
            "/mentoring_session",
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
    approve: function(id) {
      this.tableLoad = true;
      this.axios
        .put(
          config.APIENDPOINT +
            "/tutor/" +
            this.$route.params.mentorId +
            "/mentoring_session/" +
            id +
            "/approve",
          { headers: auth.getAuthHeader() }
        )
        .then(res => {
          console.log(res);
          this.getDataList();
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.tableLoad = false;
        });
    },
    reject: function(id) {
      this.tableLoad = true;
      this.axios
        .put(
          config.APIENDPOINT +
            "/tutor/" +
            this.$route.params.mentorId +
            "/mentoring_session/" +
            id +
            "/approve",
          { headers: auth.getAuthHeader() }
        )
        .then(res => {
          console.log(res);
          this.getDataList();
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.tableLoad = false;
        });
    }
  }
};
</script>

<style scoped>
</style>