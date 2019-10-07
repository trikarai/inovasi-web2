<template>
  <v-container>
    <!-- {{dataList.list}} -->
    <v-layout class="mb-3">
      <v-flex md3>
        <v-btn color="primary" @click="gotoRegister">
          <v-icon left>add</v-icon>
          {{ $vuetify.lang.t('$vuetify.action.register') }} {{ $vuetify.lang.t('$vuetify.program.program') }}
        </v-btn>
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
            <template v-slot:item.status="{item}">
              <v-chip :color="getColor(item.status)" dark>{{ item.status }}</v-chip>
            </template>
            <template v-slot:item.action="{ item }">
              <template v-if="item.status == 'active'">
                <v-btn small class="mr-2 mt-2" disabled>Mentoring</v-btn>
                <v-btn small class="mr-2 mt-2" disabled>Workship</v-btn>
                <v-btn
                  @click="participationAction(item.id, 'resign')"
                  small
                  class="mr-2 mt-2"
                  color="red"
                >Resign</v-btn>
              </template>
              <template v-if="item.status == 'registered'">
                <v-btn
                  @click="participationAction(item.id, 'cancel_registration')"
                  small
                  class="mr-2 mt-2"
                  color="#FFD700"
                >Cancel</v-btn>
              </template>
            </template>
          </v-data-table>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import bus from "@/bus";
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
        {
          text: "Name",
          value: "programme.programme_curriculum.name",
          sortable: false
        },
        {
          text: "Description",
          value: "programme.programme_curriculum.description",
          sortable: false
        },
        { text: "Region", value: "programme.region.name", sortable: false },
        {
          text: "Current Phase",
          value: "programme.current_phase",
          sortable: false
        },
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
        .get(
          config.baseUri +
            "/team/" +
            this.$route.params.teamId +
            "/programme_participation",
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
    participationAction: function(id, action) {
      this.tableLoad = true;
      this.axios
        .put(
          config.baseUri +
            "/team/" +
            this.$route.params.teamId +
            "/programme_participation/" +
            id +
            "/" +
            action,
          {
            headers: auth.getAuthHeader()
          }
        )
        .then(res => {
          this.showInfo(res, [action + " Success"]);
          this.getDataList();
        })
        .catch(res => {
          bus.$emit("callNotif", "error", res);
        })
        .finally(() => {
          this.tableLoad = false;
        });
    },
    gotoRegister() {
      this.$router.push({
        path:
          "/talent/team/" +
          this.$route.params.teamId +
          "/participation/register"
      });
    },
    gotoMentoring(item) {
      this.$router.push({
        path:
          "/talent/team/" +
          this.$route.params.teamId +
          "/participation/" +
          item.id +
          "/mentoring"
      });
    },
    gotoWorkshop(item) {
      this.$router.push({
        path:
          "/talent/team/" +
          this.$route.params.teamId +
          "/participation/" +
          item.id +
          "/workshop"
      });
    }
  }
};
</script>

<style scoped>
</style>