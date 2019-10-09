<template>
  <v-container>
    <v-layout>
      <!-- {{mentorship}} -->
      <v-flex md12>
        <v-data-table
          :loading="tableLoad"
          :headers="headers"
          :items="mentorship.list"
          class="elevation-1"
        >
          <template v-slot:item.action="{ item }">
            <!-- {{item}} -->
            <v-btn @click="gotoParticipant(item)" class="mr-2">Participant</v-btn>
            <v-btn @click="gotoMentoring(item.id)" color="primary" class="mr-2">Mentoring</v-btn>
            <v-btn @click="gotoPhase(item)" color="primary" class="mr-2">Phase</v-btn>
            <v-btn disabled class="mr-2">Feedback</v-btn>
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
      mentorship: { total: 0, list: [] },
      headers: [
        { text: "Region", value: "programme.region.name" },
        { text: "Name", value: "programme.programme_curriculum.name" },
        { text: "", value: "action", align: "right" }
      ]
    };
  },
  watch: {},
  created: function() {},
  mounted: function() {
    this.getMentorship();
  },
  methods: {
    getMentorship: function() {
      this.tableLoad = true;
      this.axios
        .get(config.baseUri + "/tutor", { headers: auth.getAuthHeader() })
        .then(res => {
          if (res.data.data) {
            this.mentorship = res.data.data;
          } else {
            this.mentorship = { total: 0, list: [] };
          }
        })
        .catch(res => {
          bus.$emit("callNotif", "error", res);
        })
        .finally(() => {
          this.tableLoad = false;
        });
    },
    gotoParticipant: function(item) {
      sessionStorage.setItem("mentorId", item.id);
      this.$router.push({
        path:
          "/personnel/mentor/" +
          item.id +
          "/program/" +
          item.programme.id +
          "/participant"
      });
    },
    gotoMentoring: function(mentorId) {
      this.$router.push({
        path: "/personnel/mentor/" + mentorId + "/mentoring"
      });
    },
    gotoPhase: function(item) {
      this.$router.push({
        path:
          "/personnel/mentor/" +
          item.id +
          "/program/" +
          item.programme.id +
          "/phase"
      });
    }
  }
};
</script>

<style scoped>
</style>