<template>
  <v-container>
    <v-row>
      <v-col>
        <v-toolbar flat color="primary" dark>
          <v-toolbar-title>User Profile</v-toolbar-title>
        </v-toolbar>
        <v-tabs v-model="tab" class="elevation-2" :vertical="true" :icons-and-text="true">
          <v-tabs-slider></v-tabs-slider>

          <!-- <v-tab v-for="i in tabs" :key="i" :href="`#tab-${i}`">
            Tab {{ i }}
            <v-icon>mdi-phone</v-icon>
          </v-tab>-->
          <v-tab href="#tab-1">
            Education
            <v-icon>school</v-icon>
          </v-tab>
          <v-tab href="#tab-2">
            Entrepreneurship
            <v-icon>emoji_objects</v-icon>
          </v-tab>
          <v-tab href="#tab-3">
            Organization
            <v-icon>group_work</v-icon>
          </v-tab>
          <v-tab href="#tab-4">
            Training
            <v-icon>toys</v-icon>
          </v-tab>
          <v-tab href="#tab-5">
            Working
            <v-icon>work</v-icon>
          </v-tab>
          <v-tab href="#tab-6">
            Skill
            <v-icon>build</v-icon>
          </v-tab>

          <v-tab-item value="tab-1">
            <v-card flat tile>
              <v-card-text>
                <v-data-table
                  :loading="tableLoad1"
                  :headers="headers1"
                  :items="dataList1.list"
                  class="elevation-1"
                ></v-data-table>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item value="tab-2">
            <v-card flat tile>
              <v-card-text>
                <v-data-table
                  :loading="tableLoad2"
                  :headers="headers2"
                  :items="dataList2.list"
                  class="elevation-1"
                ></v-data-table>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item value="tab-3">
            <v-card flat tile>
              <v-card-text>
                <v-data-table
                  :loading="tableLoad3"
                  :headers="headers3"
                  :items="dataList3.list"
                  class="elevation-1"
                ></v-data-table>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item value="tab-4">
            <v-card flat tile>
              <v-card-text>
                <v-data-table
                  :loading="tableLoad4"
                  :headers="headers4"
                  :items="dataList4.list"
                  class="elevation-1"
                ></v-data-table>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item value="tab-5">
            <v-card flat tile>
              <v-card-text>
                <v-data-table
                  :loading="tableLoad5"
                  :headers="headers5"
                  :items="dataList5.list"
                  class="elevation-1"
                ></v-data-table>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item value="tab-6">
            <v-card flat tile>
              <v-card-text>
                <v-data-table
                  :loading="tableLoad6"
                  :headers="headers6"
                  :items="dataList6.list"
                  class="elevation-1"
                >
                  <template v-slot:item.score="{item}">
                    <v-rating readonly :value="item.score"></v-rating>
                  </template>
                </v-data-table>
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs>
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
      tab: null,
      text:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      dataList1: { total: 0, list: [] },
      tableLoad1: { total: 0, list: [] },
      headers1: [
        { text: "Phase", value: "phase", sortable: false },
        { text: "Institution", value: "institution", sortable: false },
        { text: "Major", value: "major", sortable: false },
        { text: "Start Year", value: "start_year", sortable: false },
        { text: "End Year", value: "end_year", sortable: false },
        { text: "Note", value: "Note", sortable: false }
      ],
      dataList2: { total: 0, list: [] },
      tableLoad2: { total: 0, list: [] },
      headers2: [
        { text: "Name", value: "name", sortable: false },
        { text: "Business Field", value: "business_field", sortable: false },
        {
          text: "Business Category",
          value: "business_category",
          sortable: false
        },
        { text: "Position", value: "position", sortable: false },
        { text: "Start Year", value: "start_year", sortable: false },
        { text: "End Year", value: "end_year", sortable: false }
      ],
      dataList3: { total: 0, list: [] },
      tableLoad3: { total: 0, list: [] },
      headers3: [
        { text: "Name", value: "name", sortable: false },
        { text: "Position", value: "position", sortable: false },
        { text: "Start Year", value: "start_year", sortable: false },
        { text: "End Year", value: "end_year", sortable: false }
      ],
      dataList4: { total: 0, list: [] },
      tableLoad4: { total: 0, list: [] },
      headers4: [
        { text: "Training Name", value: "name", sortable: false },
        { text: "Organizer", value: "organizer", sortable: false },
        { text: "Role", value: "year", sortable: false }
      ],
      dataList5: { total: 0, list: [] },
      tableLoad5: { total: 0, list: [] },
      headers5: [
        { text: "Company Name", value: "company_name", sortable: false },
        { text: "Position", value: "position", sortable: false },
        { text: "Role", value: "role", sortable: false },
        { text: "Start Year", value: "start_year", sortable: false },
        { text: "End Year", value: "end_year", sortable: false }
      ],
      dataList6: { total: 0, list: [] },
      headers6: [
        { text: "Skill Name", value: "skill_reference.name", sortable: false },
        { text: "Score", value: "score", sortable: false }
      ],
      tableLoad6: false
    };
  },
  mounted: function() {
    this.getEducation();
    this.getEnterpreneurship();
    this.getOrganization();
    this.getTraining();
    this.getWorking();
    this.getSkill();
  },
  methods: {
    getEducation: function() {
      this.tableLoad1 = true;
      this.axios
        .get(
          config.baseUri +
            "/as_coordinator/talent/" +
            this.$route.params.talentId +
            "/education",
          {
            headers: auth.getAuthHeader()
          }
        )
        .then(res => {
          if (res.data.data) {
            this.dataList1 = res.data.data;
          } else {
            this.dataList1 = { total: 0, list: [] };
          }
        })
        .catch(res => {
          bus.$emit("callNotif", "error", res);
        })
        .finally(() => {
          this.tableLoad1 = false;
        });
    },
    getEnterpreneurship: function() {
      this.tableLoad2 = true;
      this.axios
        .get(
          config.baseUri +
            "/as_coordinator/talent/" +
            this.$route.params.talentId +
            "/entrepreneurship",
          {
            headers: auth.getAuthHeader()
          }
        )
        .then(res => {
          if (res.data.data) {
            this.dataList2 = res.data.data;
          } else {
            this.dataList2 = { total: 0, list: [] };
          }
        })
        .catch(res => {
          bus.$emit("callNotif", "error", res);
        })
        .finally(() => {
          this.tableLoad2 = false;
        });
    },
    getOrganization: function() {
      this.tableLoad3 = true;
      this.axios
        .get(
          config.baseUri +
            "/as_coordinator/talent/" +
            this.$route.params.talentId +
            "/organization",
          {
            headers: auth.getAuthHeader()
          }
        )
        .then(res => {
          if (res.data.data) {
            this.dataList3 = res.data.data;
          } else {
            this.dataList3 = { total: 0, list: [] };
          }
        })
        .catch(res => {
          bus.$emit("callNotif", "error", res);
        })
        .finally(() => {
          this.tableLoad3 = false;
        });
    },
    getTraining: function() {
      this.tableLoad4 = true;
      this.axios
        .get(
          config.baseUri +
            "/as_coordinator/talent/" +
            this.$route.params.talentId +
            "/training_experience",
          {
            headers: auth.getAuthHeader()
          }
        )
        .then(res => {
          if (res.data.data) {
            this.dataList4 = res.data.data;
          } else {
            this.dataList4 = { total: 0, list: [] };
          }
        })
        .catch(res => {
          bus.$emit("callNotif", "error", res);
        })
        .finally(() => {
          this.tableLoad4 = false;
        });
    },
    getWorking: function() {
      this.tableLoad5 = true;
      this.axios
        .get(
          config.baseUri +
            "/as_coordinator/talent/" +
            this.$route.params.talentId +
            "/working_experience",
          {
            headers: auth.getAuthHeader()
          }
        )
        .then(res => {
          if (res.data.data) {
            this.dataList5 = res.data.data;
          } else {
            this.dataList5 = { total: 0, list: [] };
          }
        })
        .catch(res => {
          bus.$emit("callNotif", "error", res);
        })
        .finally(() => {
          this.tableLoad5 = false;
        });
    },
    getSkill: function() {
      this.tableLoad6 = true;
      this.axios
        .get(
          config.baseUri +
            "/as_coordinator/talent/" +
            this.$route.params.talentId +
            "/skill",
          {
            headers: auth.getAuthHeader()
          }
        )
        .then(res => {
          if (res.data.data) {
            this.dataList6 = res.data.data;
          } else {
            this.dataList6 = { total: 0, list: [] };
          }
        })
        .catch(res => {
          bus.$emit("callNotif", "error", res);
        })
        .finally(() => {
          this.tableLoad6 = false;
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