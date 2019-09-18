<template>
  <v-container>
    <!-- {{dataList.list}} -->
    <v-layout>
      <v-flex md3>
        <v-btn>
          <v-icon left>add</v-icon>
          {{ $vuetify.lang.t('$vuetify.action.create') }} {{ $vuetify.lang.t('$vuetify.team.team') }}
        </v-btn>
      </v-flex>
      <v-flex md2 class="ml-2 mr-2">
        <v-select :label="'Status ' + $vuetify.lang.t('$vuetify.team.team')"></v-select>
      </v-flex>
      <v-flex md2 class="ml-2 mr-2">
        <v-select :label="'Status ' + $vuetify.lang.t('$vuetify.team.team')"></v-select>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex md12>
        <v-card class="elevation-0 mb-3">
          <v-card-title>
            <div class="flex-grow-1"></div>
            <v-text-field
              v-model="search"
              append-icon="search"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <!-- {{dataList}} -->
          <v-data-table
            :search="search"
            :loading="tableLoad"
            :headers="headers"
            :items="dataList.list"
            class="elevation-1"
          >
            <template v-slot:item.team.name="{item}">{{item.team.name | truncate(20)}}</template>
            <template v-slot:item.creator="{item}">{{item.team.creator.name | truncate(20)}}</template>
            <template v-slot:item.status="{item}">
              <v-chip :color="getColor(item.status)" dark>{{ item.status }}</v-chip>
            </template>
            <template v-slot:item.action="{ item }">
              <template v-if="item.status == 'active'">
                <v-btn small class="mr-2" @click="gotoTeamDetail(item)">Manage</v-btn>
                <v-btn small class="mr-2">Idea</v-btn>
                <v-btn small class="mr-2">Program</v-btn>
                <v-btn small class="mr-2" color="red">Resign</v-btn>
              </template>
            </template>
          </v-data-table>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import auth from "@/config/auth";
import * as config from "@/config/app.config";
import { statusMixins } from "@/mixins/statusMixins";
export default {
  mixins: [statusMixins],
  data() {
    return {
      search: "",
      tableLoad: false,
      dataList: { total: 0, list: [] },
      headers: [
        { text: "Team", value: "team.name", sortable: false },
        {
          text: "Initiator",
          value: "creator",
          sortable: false
        },
        { text: "Region", value: "current_phase.name", sortable: false },
        { text: "Your Position", value: "position", sortable: false },
        { text: "Status", value: "status", sortable: false },
        { text: "", value: "action", sortable: false, align: "right" }
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
        .get(config.baseUri + "/talent/team/membership", {
          headers: auth.getAuthHeader()
        })
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
    gotoTeamDetail(item) {
      this.$router.push({
        path: "/talent/team/" + item.team.id + "/membership/" + item.id
      });
    }
  }
};
</script>

<style scoped>
</style>