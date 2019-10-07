<template>
  <v-container ref="main">
    <v-layout>
      <v-flex md8>
        <v-card v-if="teamLoad">
          <div class="text-center">
            <v-progress-circular class="ma-5" size="50" color="primary" indeterminate></v-progress-circular>
          </div>
        </v-card>
        <v-card v-else>
          <v-form ref="form" v-model="valid">
            <v-card-title>Profile Team</v-card-title>
            <v-card-text>
              <v-list>
                <v-layout column>
                  <v-alert
                    v-if="isUpdated"
                    type="warning"
                  >You made a change but not updated to server</v-alert>
                  <v-list-item>
                    <v-list-item-content v-if="!editTeam">
                      <v-list-item-subtitle>{{$vuetify.lang.t("$vuetify.team.teamName")}}</v-list-item-subtitle>
                      <v-list-item-title>{{dataTeam.team.name}}</v-list-item-title>
                    </v-list-item-content>
                    <v-list-item-content v-else>
                      <v-text-field
                        v-model="params.name"
                        :label="$vuetify.lang.t('$vuetify.team.teamName')"
                        maxlength="50"
                        counter="50"
                        :rules="rules"
                      />
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content v-if="!editTeam">
                      <v-list-item-subtitle>{{$vuetify.lang.t("$vuetify.team.vision")}}</v-list-item-subtitle>
                      <v-list-item-title>{{dataTeam.team.vision}}</v-list-item-title>
                    </v-list-item-content>
                    <v-list-item-content v-else>
                      <v-textarea
                        v-model="params.vision"
                        :label="$vuetify.lang.t('$vuetify.team.vision')"
                        maxlength="50"
                        counter="50"
                      />
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content v-if="!editTeam">
                      <v-list-item-subtitle>{{$vuetify.lang.t("$vuetify.team.mission")}}</v-list-item-subtitle>
                      <v-list-item-title>{{dataTeam.team.mission}}</v-list-item-title>
                    </v-list-item-content>
                    <v-list-item-content v-else>
                      <v-textarea
                        v-model="params.mission"
                        :label="$vuetify.lang.t('$vuetify.team.mission')"
                        maxlength="50"
                        counter="50"
                      />
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content v-if="!editTeam">
                      <v-list-item-subtitle>{{$vuetify.lang.t("$vuetify.team.culture")}}</v-list-item-subtitle>
                      <v-list-item-title>{{dataTeam.team.culture}}</v-list-item-title>
                    </v-list-item-content>
                    <v-list-item-content v-else>
                      <v-textarea
                        v-model="params.culture"
                        :label="$vuetify.lang.t('$vuetify.team.culture')"
                        maxlength="50"
                        counter="50"
                      />
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content v-if="!editTeam">
                      <v-list-item-subtitle>Initiator</v-list-item-subtitle>
                      <v-list-item-title>{{dataTeam.team.creator.name}}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-layout>
              </v-list>
            </v-card-text>
            <v-card-actions>
              <v-btn v-if="!editTeam" @click="openEditTeam(dataTeam)">
                <v-icon>edit</v-icon>
              </v-btn>
              <template v-if="editTeam">
                <v-btn class="ma-2" color="red" @click="cancelEditTeam">
                  <v-icon left>cancel</v-icon>
                  {{$vuetify.lang.t('$vuetify.action.cancel')}}
                </v-btn>
                <v-btn
                  :loading="updateLoading"
                  class="ma-2"
                  color="primary"
                  :disabled="!valid"
                  @click="update"
                >
                  <v-icon left>edit</v-icon>
                  {{$vuetify.lang.t('$vuetify.action.update')}}
                </v-btn>
              </template>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-flex>
    </v-layout>
    <v-divider class="ma-5" />
    <v-layout>
      <v-flex md12>
        <!-- {{dataList}} -->
        <v-card>
          <v-card-title>
            <div class="flex-grow-1">Members</div>
            <v-text-field
              v-model="search"
              append-icon="search"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-card-text>
            <v-data-table
              :search="search"
              :loading="tableLoad"
              :headers="headers"
              :items="dataList.list"
              class="elevation-1"
            >
              <template v-slot:item.status="{item}">
                <template v-if="item.is_admin">
                  <v-icon small color="yellow">star</v-icon>
                </template>
                <v-chip :color="getColor(item.status)" dark>{{ item.status }}</v-chip>
              </template>
              <template v-slot:item.action="{item}">
                <template v-if="item.status == 'active'">
                  <template v-if="dataUser.id !== item.talent.id">
                    <v-btn small color="red">Expell</v-btn>
                  </template>
                </template>
                <template v-if="item.status == 'invited'">
                  <v-btn small color="warning">Cancel</v-btn>
                </template>
              </template>
            </v-data-table>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="gotoTalentSearch">
              <v-icon left>person_add</v-icon>Invite Registered Talent
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import auth from "@/config/auth";
import bus from "@/bus";
import * as config from "@/config/app.config";
import { statusMixins } from "@/mixins/statusMixins";
export default {
  mixins: [statusMixins],
  data() {
    return {
      dataUser: "",
      valid: false,
      editTeam: false,
      isUpdated: false,
      updateLoading: false,
      search: "",
      tableLoad: false,
      teamLoad: false,
      dataTeam: "",
      params: {
        name: "",
        vision: "",
        mission: "",
        culture: ""
      },
      rules: [v => !!v || "Team Name is required"],
      dataList: { total: 0, list: [] },
      headers: [
        { text: "Talent Name", value: "talent.name", sortable: false },
        { text: "Email", value: "talent.email", sortable: false },
        { text: "Phone", value: "talent.phone", sortable: false },
        { text: "Position", value: "position", sortable: false },
        { text: "Status", value: "status", sortable: false },
        { text: "", value: "action", sortable: false, align: "right" }
      ]
    };
  },
  mounted: function() {
    this.getTeamDetail();
    this.getDataList();
  },
  created() {
    this.dataUser = auth.getAuthData();
  },
  watch: {},
  methods: {
    getTeamDetail() {
      this.teamLoad = true;
      this.axios
        .get(
          config.baseUri +
            "/talent/team/membership/" +
            this.$route.params.membershipId,
          { headers: auth.getAuthHeader() }
        )
        .then(res => {
          this.dataTeam = res.data.data;
          this.params = res.data.data.team;
        })
        .catch(res => {
          bus.$emit("callNotif", "error", res);
        })
        .finally(() => {
          this.teamLoad = false;
        });
    },
    getDataList() {
      this.tableLoad = true;
      this.axios
        .get(config.baseUri + "/team/" + this.$route.params.teamId + "/member")
        .then(res => {
          this.dataList = res.data.data;
        })
        .catch()
        .finally(() => {
          this.tableLoad = false;
        });
    },
    openEditTeam: function(dataTeam) {
      this.editTeam = true;
      this.params = dataTeam.team;
    },
    cancelEditTeam: function() {
      this.editTeam = false;
      this.$vuetify.goTo(this.$refs.main, {
        duration: 500,
        offset: 100,
        easing: "linear"
      });
    },
    update() {
      if (this.$refs.form.validate()) {
        this.updateTeam();
      } else {
        this.$vuetify.goTo(this.$refs.form, {
          duration: 500,
          offset: 0,
          easing: "linear"
        });
      }
    },
    updateTeam: function() {
      this.updateLoading = true;
      this.axios
        .put(
          config.baseUri +
            "/team/" +
            this.$route.params.teamId +
            "/update_profile",
          this.params,
          { headers: auth.getAuthHeader() }
        )
        .then(() => {
          this.editTeam = false;
          this.getTeamDetail();
        })
        .catch(res => {
          bus.$emit("callNotif", "error", res);
        })
        .finally(() => {
          this.updateLoading = false;
          this.$vuetify.goTo(this.$refs.main, {
            duration: 500,
            offset: 100,
            easing: "linear"
          });
        });
    },
    gotoTalentSearch() {
      this.$router.push({
        path:
          "/talent/team/" +
          this.$route.params.teamId +
          "/membership/" +
          this.$route.params.membershipId +
          "/search"
      });
    }
  }
};
</script>
<style scoped>
</style>
