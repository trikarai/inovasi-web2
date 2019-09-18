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
            <v-btn @click="gotoParticipant(item)" color="primary" class="mr-1">Add Scoring</v-btn>
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
        { text: "Template", value: "scoring_template.name", sortable: false },
        { text: "Start", value: "start_date", sortable: false },
        { text: "End", value: "end_date", sortable: false },
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
          config.baseUri +
            "/tutor/" +
            this.$route.params.mentorId +
            "/programme/" +
            this.$route.params.programId +
            "/phase/" +
            this.$route.params.phaseId +
            "/scoring",
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
    gotoParticipant: function(item) {
      this.$router.push({
        path:
          "/personnel/mentor/" +
          this.$route.params.mentorId +
          "/program/" +
          this.$route.params.programId +
          "/phase/" +
          this.$route.params.phaseId +
          "/scoring/" +
          item.id +
          "/template/" +
          item.scoring_template.id
      });
    }
  }
};
</script>

<style scoped>
</style>