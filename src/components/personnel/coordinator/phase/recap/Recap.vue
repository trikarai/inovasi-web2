<template>
  <v-container>
    <!-- {{scoringrecap}} -->
    <v-card class="elevation-0 mb-3">
      <v-card-title>
        <div class="flex-grow-1"></div>
        <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
      </v-card-title>
      <v-layout>
        <v-flex md12>
          <v-data-table
            :search="search"
            :loading="tableLoad"
            :headers="headers"
            :items="scoringrecap"
            class="elevation-1"
          >
            <template v-slot:item.name="{item}">{{item.participant.team.name | truncate(30)}}</template>
            <template v-slot:item.participant.status="{item}">
              <v-chip :color="getColor(item.participant.status)" dark>{{ item.participant.status }}</v-chip>
            </template>
          </v-data-table>
        </v-flex>
      </v-layout>
    </v-card>
  </v-container>
</template>
<script>
import auth from "@/config/auth";
import * as config from "@/config/app.config";
import { statusMixins } from "@/mixins/statusMixins";

export default {
  mixins: [statusMixins],
  data: function() {
    return {
      onsubmit: false,
      selectedId: null,
      search: "",
      valid: false,
      dialogForm: false,
      tableLoad: false,
      scoringrecap: [],
      scoringId: "",
      headers: [
        { text: "Team Name", value: "name", sortable: false },
        {
          text: "Status",
          value: "participant.status",
          sortable: false
        },
        {
          text: "Current Phase",
          value: "participant.current_phase.name",
          sortable: false
        },
        {
          text: "Phase Plan",
          value: "participant.current_phase.phase_plan.name",
          sortable: false
        },
        {
          text: "Score Recap",
          value: "score_recap",
          sortable: true
        },
        { text: "", value: "action", sortable: false, align: "right" }
      ],
      params: { start_date: "", end_date: "" },
      rules: [v => !!v || "This field is required"]
    };
  },
  watch: {},
  created: function() {},
  mounted: function() {
    this.getScoringrecap();
  },
  methods: {
    getScoringrecap: function() {
      this.tableLoad = true;
      this.axios
        .get(
          config.baseUri +
            "/programme/" +
            this.$route.params.programId +
            "/phase/" +
            this.$route.params.phaseId +
            "/score_summary",
          {
            headers: auth.getAuthHeader()
          }
        )
        .then(res => {
          if (res.data.data) {
            this.scoringrecap = res.data.data;
          } else {
            this.scoringrecap = { total: 0, list: [] };
          }
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
