<template>
  <v-container>
    <!-- {{coordinatorship}} -->
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
            :items="coordinatorship.list"
            class="elevation-1"
          >
            <template v-slot:item.action="{ item }">
              <!-- {{item}} -->
              <v-btn @click="gotoParticipant(item)" class="mr-2" color="primary">Participant</v-btn>
              <v-btn @click="gotoRegistration(item)" class="mr-2" color="primary">Registration</v-btn>
              <v-btn @click="gotoPhase(item)" class="mr-2" color="primary">Phase</v-btn>
            </template>
          </v-data-table>
          </v-card-text>
        </v-flex>
      </v-layout>
    </v-card>
  </v-container>
</template>
<script>
import auth from "@/config/auth";
import * as config from "@/config/app.config";
export default {
  data: function() {
    return {
      search: "",
      tableLoad: false,
      coordinatorship: { total: 0, list: [] },
      headers: [
        { text: "Region", value: "programme.region.name", sortable: false },
        {
          text: "Name",
          value: "programme.programme_curriculum.name",
          sortable: false
        },
        { text: "", value: "action", align: "right", sortable: false }
      ]
    };
  },
  watch: {},
  created: function() {},
  mounted: function() {
    this.getCoordinatorship();
  },
  methods: {
    getCoordinatorship: function() {
      this.tableLoad = true;
      this.axios
        .get(config.baseUri + "/coordinator", {
          headers: auth.getAuthHeader()
        })
        .then(res => {
          if (res.data.data) {
            this.coordinatorship = res.data.data;
          } else {
            this.coordinatorship = { total: 0, list: [] };
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
          "/personnel/coordinator/" +
          item.id +
          "/program/" +
          item.programme.id +
          "/participant"
      });
    },
    gotoRegistration: function(item) {
      this.$router.push({
        path:
          "/personnel/coordinator/" +
          item.id +
          "/program/" +
          item.programme.id +
          "/registration"
      });
    },
    gotoPhase: function(item) {
      this.$router.push({
        path:
          "/personnel/coordinator/" +
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
