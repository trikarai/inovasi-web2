<template>
  <v-container>
    <v-row>
      <v-col md="6">
        <!-- Team Id : {{teamId}} -->
        <!-- <pre>{{team.list}}</pre> -->
        <v-select
          :loading="loadTeam"
          :disabled="loadTeam"
          v-model="teamId"
          :items="team.list"
          :no-data-text="$vuetify.lang.t('$vuetify.noDataText')"
          item-text="team.name"
          item-value="team.id"
          :label="$vuetify.lang.t('$vuetify.team.team')"
          outlined
          class="pr-3"
          @change="changeTeam"
        ></v-select>
      </v-col>
      <v-col md="6">V2.0.0-BETA</v-col>
    </v-row>
    <v-row v-if="teamId !== ''">
      <dashboard-timeline v-bind:teamId="teamId" />
    </v-row>
  </v-container>
</template>
<script>
import auth from "@/config/auth";
import * as config from "@/config/app.config";
import { notifMixins } from "@/mixins/notifMixins";

import DashboardTimeline from "@/components/talent/dashboard/timeline/BaseTimeline";

export default {
  mixins: [notifMixins],
  data: function() {
    return {
      loadTeam: false,
      team: { total: 0, list: [] },
      teamId: ""
    };
  },
  components: {
    DashboardTimeline
  },
  watch: {},
  created: function() {},
  mounted: function() {
    this.getTeamMembership();
  },
  methods: {
    changeTeam: function(id) {
      localStorage.teamId = id;
      this.teamId = id;
    },
    getTeamMembership() {
      this.loadTeam = true;
      this.axios
        .get(config.baseUri + "/talent/team/membership?status[]=active", {
          headers: auth.getAuthHeader()
        })
        .then(res => {
          if (res.data.data) {
            this.team = res.data.data;
            if (localStorage.teamId) {
              this.teamId = localStorage.teamId;
            } else {
              this.teamId = this.team.list[0].team.id;
              localStorage.setItem("teamId", this.team.list[0].team.id);
            }
          } else {
            this.team = { total: 0, list: [] };
          }
        })
        .catch(res => {
          this.showError(res);
        })
        .finally(() => {
          this.loadTeam = false;
        });
    }
  }
};
</script>

<style scoped>
</style>