<template>
  <v-container>
    <v-layout>
      <v-flex md6>
        <v-card>
          <v-list-item>
            <v-list-item-avatar color="primary">
              <v-icon>search</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-text-field
                v-model="search"
                hint="email"
                persistent-hint
                label="Registered Talent"
                @input="isTyping = true"
              ></v-text-field>
            </v-list-item-content>
          </v-list-item>
          <v-card-text>
            <v-card :loading="loadingTalent">
              <v-card-text v-if="notfoundTalent">
                <v-alert type="warning">Talent not found</v-alert>
              </v-card-text>
              <v-card-text v-if="talent == null">
                <v-alert type="info">insert email in search box</v-alert>
              </v-card-text>
              <v-card-text v-if="talent !== null">
                <v-list>
                  <v-list-item three-line>
                    <v-list-item-content>
                      <div class="overline mb-4">{{talent.email}}</div>
                      <v-list-item-title class="headline mb-1">{{talent.name}}</v-list-item-title>
                      <v-list-item-subtitle>
                        <v-icon left>call</v-icon>
                        {{talent.phone}}
                      </v-list-item-subtitle>
                      <v-list-item-subtitle>
                        <v-icon left>cake</v-icon>
                        {{talent.birth_date}}
                      </v-list-item-subtitle>
                      <v-list-item-subtitle>
                        <v-icon left>wc</v-icon>
                        {{talent.gender}}
                      </v-list-item-subtitle>
                      <v-list-item-subtitle>
                        <v-icon left>location_city</v-icon>
                        {{talent.city_of_origin}}
                      </v-list-item-subtitle>
                      <v-list-item-subtitle>
                        <v-icon left>my_location</v-icon>
                        {{talent.region.name}}
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card-text>
              <v-card-actions v-show="!notfoundTalent">
                <v-btn color="primary" v-if="talent !== null" @click="openInvite">Invite</v-btn>
              </v-card-actions>
            </v-card>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>

    <v-dialog v-model="dialogForm" width="500" height="500">
      <v-form v-model="valid" ref="form">
        <v-card>
          <v-card-text>
            <!-- {{params}} -->
            <v-layout row>
              <v-flex md12>{{talentName}}</v-flex>
              <v-flex md12>
                <v-select
                  v-model="params.position"
                  label="Position in team"
                  :items="item"
                  :rules="positionRules"
                ></v-select>
              </v-flex>
              <v-flex md12>
                <v-checkbox v-model="params.is_admin" label="Make as admin"></v-checkbox>
              </v-flex>
            </v-layout>
          </v-card-text>
          <v-card-actions>
            <v-btn
              :loading="inviteLoading"
              @click="validate"
              color="primary"
              :disabled="!valid"
            >Invite</v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
  </v-container>
</template>
<script>
import Vue from "vue";
import VueLodash from "vue-lodash";
const options = { name: "lodash" }; // customize the way you want to call it

import auth from "@/config/auth";
import bus from "@/bus";
import * as config from "@/config/app.config";

Vue.use(VueLodash, options); // options is optional

export default {
  data() {
    return {
      valid: false,
      isTyping: false,
      loadingTalent: false,
      notfoundTalent: false,
      dialogForm: false,
      search: "",
      talentName: "",
      talent: {
        name: "",
        email: "",
        phone: "",
        birth_date: "",
        gender: "",
        city_of_origin: "",
        region: {
          name: ""
        }
      },
      nameRules: [v => !!v || "Position is required"],
      item: ["Business", "Technical", "Creative"],
      params: {
        talent_id: "",
        position: "",
        is_admin: false
      },
      positionRules: [v => !!v || "Position is required"],
      inviteLoading: false
    };
  },
  created: function() {
    this.talent = null;
  },
  watch: {
    search: Vue._.debounce(function() {
      this.isTyping = false;
    }, 1000),
    isTyping: function(value) {
      if (!value) {
        this.getTalent();
      }
    }
  },
  methods: {
    getTalent: function() {
      this.loadingTalent = true;
      this.axios
        .get(config.baseUri + "/team/talent/by-email?email=" + this.search)
        .then(res => {
          if (res.data.data) {
            this.talent = res.data.data;
            this.notfoundTalent = false;
          } else {
            this.talent = null;
            this.notfoundTalent = true;
          }
        })
        .catch(res => {
          this.notfoundTalent = true;
          bus.$emit("callNotif", "error", res);
        })
        .finally(() => {
          this.loadingTalent = false;
        });
    },
    openInvite: function() {
      this.dialogForm = true;
      this.talentName = this.talent.name;
      this.params.talent_id = this.talent.id;
      this.params.is_admin = false;
      this.params.position = "";
    },
    validate: function() {
      if (this.$refs.form.validate()) {
        this.inviteTalent();
      }
    },
    inviteTalent: function() {
      this.inviteLoading = true;
      this.axios
        .post(
          config.baseUri + "/team/" + this.$route.params.teamId + "/member",
          this.params,
          { headers: auth.getAuthHeaders() }
        )
        .then(() => {
          this.dialogForm = false;
        })
        .catch(res => {
          bus.$emit("callNotif", "error", res);
        })
        .finally(() => {
          this.inviteLoading = false;
        });
    }
  }
};
</script>
<style scoped>
</style>
