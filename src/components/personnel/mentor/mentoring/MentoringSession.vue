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
          <template v-slot:item.status="{ item }">
            <v-flex>
              <v-chip :color="getColor(item.status)" dark>{{ item.status }}</v-chip>
            </v-flex>
            <v-flex>{{item.note}}</v-flex>
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
import bus from "@/bus";
import * as config from "@/config/app.config";
export default {
  data: function() {
    return {
      tableLoad: false,
      dataList: { total: 0, list: [] },
      headers: [
        { text: "Name", value: "mentoring.name", sortable: false },
        { text: "participant", value: "participant.team.name" },
        { text: "Schedule", value: "start_time" },
        { text: "Media", value: "media", sortable: false },
        { text: "Rating", value: "rating_from_participant", sortable: false },
        { text: "Status", value: "status", sortable: false },
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
    getColor(status) {
      if (status == "approved") return "green";
      else if (status == "rejected") return "red";
      else return "blue";
    },
    getDataList: function() {
      this.tableLoad = true;
      this.axios
        .get(
          config.baseUri +
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
        .catch(res => {
          bus.$emit("callNotif", "error", res);
        })
        .finally(() => {
          this.tableLoad = false;
        });
    },
    approve: function(id) {
      this.tableLoad = true;
      this.axios
        .put(
          config.baseUri +
            "/tutor/" +
            this.$route.params.mentorId +
            "/mentoring_session/" +
            id +
            "/approve",
          { headers: auth.getAuthHeader() }
        )
        .then(res => {
          this.getDataList();
        })
        .catch(res => {
          bus.$emit("callNotif", "error", res);
        })
        .finally(() => {
          this.tableLoad = false;
        });
    },
    reject: function(id) {
      this.tableLoad = true;
      this.axios
        .put(
          config.baseUri +
            "/tutor/" +
            this.$route.params.mentorId +
            "/mentoring_session/" +
            id +
            "/approve",
          { headers: auth.getAuthHeader() }
        )
        .then(() => {
          this.getDataList();
        })
        .catch(error => {
          bus.$emit("callNotif", "error", res);
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