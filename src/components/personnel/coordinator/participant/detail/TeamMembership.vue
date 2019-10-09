<template>
  <v-container>
    <v-row>
      <v-col>
        <!-- {{dataList}} -->
        <v-data-table
          :loading="tableLoad"
          :headers="headers"
          :items="dataList.list"
          class="elevation-1"
        >
          <template v-slot:item.name="{item}">
            <v-btn
              class="elevation-0 mr-2"
              fab
              x-small
              color="primary"
              @click="gotoProfileDetail(item.talent.id)"
            >
              <v-icon>zoom_in</v-icon>
            </v-btn>
            {{item.talent.name | truncate(30)}}
          </template>
          <template v-slot:item.status="{item}">
            <v-chip :color="getColor(item.status)" dark>{{ item.status }}</v-chip>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
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
      dataList: { total: 0, list: [] },
      tableLoad: false,
      headers: [
        { text: "Talent Name", value: "name", sortable: false },
        { text: "Email", value: "talent.email", sortable: false },
        { text: "Position", value: "position", sortable: false },
        { text: "Status", value: "status", sortable: false }
      ]
    };
  },
  mounted: function() {
    this.getParticipant();
  },
  methods: {
    getParticipant: function() {
      this.tableLoad = true;
      this.axios
        .get(
          config.baseUri + "/team/" + this.$route.params.teamId + "/member",
          {
            headers: auth.getAuthHeader()
          }
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
    gotoProfileDetail(id) {
      this.$router.push({
        path:
          "/personnel/coordinator/participant/" +
          this.$route.params.teamId +
          "/talent/" +
          id
      });
    }
  }
};
</script>
<style scoped>
</style>