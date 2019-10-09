<template>
  <v-container>
    <!-- {{participant}} -->
    <v-card class="elevation-0 mb-3">
      <v-card-title>
        <div class="flex-grow-1"></div>
        <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
      </v-card-title>
      <v-layout>
        <v-flex md12>
          <v-card-text>
            <v-data-table
              :search="search"
              :loading="tableLoad"
              :headers="headers"
              :items="participant.list"
              class="elevation-1"
            >
              <template v-slot:item.name="{item}">
                <v-btn
                  class="elevation-0 mr-2"
                  fab
                  x-small
                  color="primary"
                  @click="gotoTeamDetail(item.team.id)"
                >
                  <v-icon>zoom_in</v-icon>
                </v-btn>
                {{item.team.name | truncate(30)}}
              </template>
              <template v-slot:item.status="{item}">
                <v-chip :color="getColor(item.status)" dark>{{ item.status }}</v-chip>
              </template>
              <template v-slot:item.action="{ item }">
                <v-btn color="accent" @click="gotoIdea(item)">
                  <v-icon left color="yellow">emoji_objects</v-icon>Idea
                </v-btn>
              </template>
            </v-data-table>
          </v-card-text>
        </v-flex>
      </v-layout>
    </v-card>
  </v-container>
</template>
<script>
import bus from "@/bus";
import auth from "@/config/auth";
import * as config from "@/config/app.config";
import { statusMixins } from "@/mixins/statusMixins";

export default {
  mixins: [statusMixins],
  data: function() {
    return {
      dialogPass: false,
      selectedReject: "",
      selectedFail: "",
      search: "",
      leftName: "",
      leftId: "",
      leftAction: "",
      tableLoad: false,
      participant: { total: 0, list: [] },
      headers: [
        { text: "Team", value: "name", sortable: false },
        {
          text: "Registration Time",
          value: "registration_time",
          sortable: false
        },
        { text: "Current Phase", value: "current_phase.name", sortable: false },
        { text: "Status", value: "status", sortable: false },
        { text: "", value: "action", sortable: false, align: "right" }
      ]
    };
  },
  watch: {},
  created: function() {},
  mounted: function() {
    this.getParticipant();
  },
  methods: {
    getParticipant: function() {
      this.tableLoad = true;
      this.axios
        .get(
          config.baseUri +
            "/programme/" +
            this.$route.params.programId +
            "/participant",
          {
            headers: auth.getAuthHeader()
          }
        )
        .then(res => {
          if (res.data.data) {
            this.participant = res.data.data;
          } else {
            this.participant = { total: 0, list: [] };
          }
        })
        .catch(res => {
          bus.$emit("callNotif", "error", res);
        })
        .finally(() => {
          this.tableLoad = false;
        });
    },
    gotoTeamDetail(id) {
      this.$router.push({
        path: "/personnel/participant/" + id
      });
    },
    gotoIdea(item) {
      this.$router.push({
        path:
          "/personnel/mentor/" +
          this.$route.params.mentorId +
          "/team/" +
          item.team.id +
          "/idea"
      });
    }
  }
};
</script>
<style scoped>
</style>
