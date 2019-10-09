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
                <template v-if="item.status == 'active'">
                  <template v-if="item.id != selectedFail">
                    <v-btn
                      small
                      class="mr-2"
                      color="warning"
                      @click="leftAct(item.id, 'pass', item.team.name)"
                    >Pass</v-btn>
                    <!-- @click="actionParticipant(item.id, 'pass')" -->
                    <v-btn @click="failAct(item.id)" small class="mr-2" color="danger">Fail</v-btn>
                  </template>
                  <v-expand-transisition>
                    <div v-if="item.id == selectedFail">
                      Are You Sure to Fail this Team ?!
                      <br />
                      <v-btn
                        color="red"
                        class="mt-2 mb-2 mr-2"
                        @click="actionParticipant(item.id, 'fail')"
                      >Yes</v-btn>
                      <v-btn
                        color="warning"
                        class="mt-2 mb-2 mr-2"
                        @click="selectedFail = null"
                      >Cancel</v-btn>
                    </div>
                  </v-expand-transisition>
                </template>
                <template v-if="item.status == 'registered'">
                  <v-btn
                    @click="leftAct(item.id, 'accept', item.team.name)"
                    small
                    class="mr-2"
                    color="green"
                  >Accept</v-btn>

                  <v-btn @click="rejectAct(item.id)" small class="mr-2" color="danger">Reject</v-btn>

                  <v-expand-x-transisition>
                    <div v-if="item.id == selectedReject">
                      Are You Sure to Reject this Team ?!
                      <br />
                      <v-btn
                        color="red"
                        class="mt-2 mb-2 mr-2"
                        @click="actionParticipant(item.id, 'reject')"
                      >Yes</v-btn>
                      <v-btn
                        color="warning"
                        class="mt-2 mb-2 mr-2"
                        @click="selectedReject = null"
                      >Cancel</v-btn>
                    </div>
                  </v-expand-x-transisition>
                </template>
              </template>
            </v-data-table>
          </v-card-text>
        </v-flex>
      </v-layout>
    </v-card>

    <v-dialog v-model="dialogPass" width="300" :persistent="true">
      <v-card>
        <v-card-title>
          <p class="text-capitalize">{{leftAction}}</p>
        </v-card-title>
        <v-card-text>{{leftName}}</v-card-text>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="green" @click="actionParticipant(leftId, leftAction)">Yes</v-btn>
          <v-btn color="red" @click="dialogPass = false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
    rejectAct: function(id) {
      if (this.selectedReject == id) {
        this.selectedReject = null;
      } else {
        this.selectedReject = id;
      }
    },
    failAct: function(id) {
      if (this.selectedFail == id) {
        this.selectedFail = null;
      } else {
        this.selectedFail = id;
      }
    },
    leftAct: function(id, action, name) {
      this.dialogPass = true;
      this.leftId = id;
      this.leftName = name;
      this.leftAction = action;
    },
    actionParticipant: function(id, action) {
      this.tableLoad = true;
      // alert(id + " : " + action);
      this.axios
        .put(
          config.baseUri +
            "/programme/" +
            this.$route.params.programId +
            "/participant/" +
            id +
            "/" +
            action
        )
        .then(() => {
          this.getParticipant();
        })
        .catch(res => {
          bus.$emit("callNotif", "error", res);
        })
        .finally(() => {
          this.selectedReject = null;
          this.selectedFail = null;
          this.tableLoad = false;
          this.dialogPass = false;
        });
    },
    gotoTeamDetail(id) {
      this.$router.push({
        path: "/personnel/participant/" + id
      });
    }
  }
};
</script>
<style scoped>
</style>
