<template>
  <v-container>
    <notification :err_msg2="err_msg" :status2="status" />
    <!-- {{dataList.list}} -->
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
          <!-- {{dataList.list}} -->
          <v-data-table
            :search="search"
            :loading="tableLoad"
            :headers="headers"
            :items="dataList.list"
            class="elevation-1"
          >
            <template v-slot:item.action="{ item }">
              <v-btn
                @click="participationAction(item.id)"
                small
                class="mr-2 mt-2"
                color="primary"
              >Register</v-btn>
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
import { notifMixins } from "@/mixins/notifMixins";

export default {
  mixins: [statusMixins, notifMixins],
  data() {
    return {
      search: "",
      tableLoad: false,
      dataList: { total: 0, list: [] },
      headers: [
        { text: "Region", value: "region.name", sortable: true },
        {
          text: "Name",
          value: "programme_curriculum.name",
          sortable: false
        },
        { text: "", value: "action", sortable: false, align: "right" }
      ],
      programme: {
        programme_id: ""
      }
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
      this.resetNotif();
      this.axios
        .get(config.baseUri + "/programme", {
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
          this.showError(error);
        })
        .finally(() => {
          this.tableLoad = false;
        });
    },
    participationAction: function(id) {
      this.resetNotif();
      this.programme.programme_id = id;
      this.tableLoad = true;
      this.resetNotif();
      this.axios
        .post(
          config.baseUri +
            "/team/" +
            this.$route.params.teamId +
            "/programme_participation/",
          this.programme,
          {
            headers: auth.getAuthHeader()
          }
        )
        .then(res => {
          this.showSuccess(res, ["Register Success"]);
          this.$router.go(-1);
          this.getDataList();
        })
        .catch(error => {
          this.showError(error);
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