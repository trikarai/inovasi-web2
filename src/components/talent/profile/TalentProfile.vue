<template>
  <v-container>
    <v-row>
      <v-col>
        <!-- {{profile}} -->
        <v-card>
          <v-card-title>
            <v-toolbar flat color="primary" dark>
              <v-toolbar-title>{{profile.name}}</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn
                disabled
                small
                color="accent"
                class="mr-1"
              >{{$vuetify.lang.t('$vuetify.action.edit')}} {{$vuetify.lang.t('$vuetify.profile.profile')}}</v-btn>

              <v-dialog v-model="dialogPassword" width="400" persistent>
                <template v-slot:activator="{ on }">
                  <v-btn
                    small
                    color="accent"
                    v-on="on"
                  >{{$vuetify.lang.t('$vuetify.action.change')}} {{$vuetify.lang.t('$vuetify.profile.password')}}</v-btn>
                </template>
                <v-form v-model="validPassword" ref="formPassword">
                  <v-card :loading="loadPassword">
                    <v-card-title>{{$vuetify.lang.t('$vuetify.action.change')}} {{$vuetify.lang.t('$vuetify.profile.password')}}</v-card-title>
                    <v-card-text>
                      <v-row>
                        <v-col>
                          <v-text-field
                            autocomplete="current-password"
                            :label="$vuetify.lang.t('$vuetify.profile.previousPassword')"
                            prepend-icon="lock_open"
                            v-model="pass.previous_password"
                            :rules="rulesPassword"
                            min="8"
                            :append-icon="e3 ? 'visibility' : 'visibility_off'"
                            :type="e3 ? 'password' : 'text'"
                            counter
                            required
                            @click:append="e3 = !e3"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col>
                          <v-text-field
                            autocomplete="new-password"
                            :label="$vuetify.lang.t('$vuetify.profile.newPassword')"
                            prepend-icon="lock"
                            v-model="pass.new_password"
                            :rules="rulesPassword"
                            min="8"
                            :append-icon="e1 ? 'visibility' : 'visibility_off'"
                            :type="e1 ? 'password' : 'text'"
                            counter
                            required
                            @click:append="e1 = !e1"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col>
                          <v-text-field
                            autocomplete="confirm-password"
                            :label="$vuetify.lang.t('$vuetify.profile.confirmPassword')"
                            prepend-icon="lock"
                            v-model="cpassword"
                            :rules="rulesChangePasswordConfirmation"
                            min="8"
                            :append-icon="e2 ? 'visibility' : 'visibility_off'"
                            :type="e2 ? 'password' : 'text'"
                            counter
                            required
                            @click:append="e2 = !e2"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-card-text>
                    <v-card-actions>
                      <div class="flex-grow-1"></div>
                      <v-btn
                        :disabled="!validPassword"
                        @click="updatePassword"
                        color="primary darken-1"
                      >{{$vuetify.lang.t('$vuetify.action.update')}}</v-btn>
                      <v-btn color="red darken-1" @click="resetPasswordDialog">Cancel</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-form>
              </v-dialog>
            </v-toolbar>
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12" md="6">
                <v-list>
                  <v-list-item two-line>
                    <v-list-item-content>
                      <v-list-item-subtitle>{{$vuetify.lang.t('$vuetify.profile.username')}}</v-list-item-subtitle>
                      <v-list-item-title>{{profile.username}}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item two-line>
                    <v-list-item-content>
                      <v-list-item-subtitle>{{$vuetify.lang.t('$vuetify.profile.email')}}</v-list-item-subtitle>
                      <v-list-item-title>{{profile.email}}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item two-line>
                    <v-list-item-content>
                      <v-list-item-subtitle>{{$vuetify.lang.t('$vuetify.profile.phone')}}</v-list-item-subtitle>
                      <v-list-item-title>{{profile.phone}}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item two-line>
                    <v-list-item-content>
                      <v-list-item-subtitle>{{$vuetify.lang.t('$vuetify.profile.birthDate')}}</v-list-item-subtitle>
                      <v-list-item-title>{{profile.birth_date}}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item two-line>
                    <v-list-item-content>
                      <v-list-item-subtitle>{{$vuetify.lang.t('$vuetify.profile.cityOfOrigin')}}</v-list-item-subtitle>
                      <v-list-item-title>{{profile.city_of_origin}}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-toolbar flat color="primary" dark>
          <v-toolbar-title>{{$vuetify.lang.t('$vuetify.profile.profile')}}</v-toolbar-title>
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
              <v-card-actions>
                <div class="flex-grow-1"></div>
                <v-btn color="accent" class="ma-3">
                  <v-icon left>add</v-icon>Add
                </v-btn>
              </v-card-actions>
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
              <v-card-actions>
                <div class="flex-grow-1"></div>
                <v-btn color="accent" class="ma-3">
                  <v-icon left>add</v-icon>Add
                </v-btn>
              </v-card-actions>
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
              <v-card-actions>
                <div class="flex-grow-1"></div>
                <v-btn color="accent" class="ma-3">
                  <v-icon left>add</v-icon>Add
                </v-btn>
              </v-card-actions>
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
              <v-card-actions>
                <div class="flex-grow-1"></div>
                <v-btn color="accent" class="ma-3">
                  <v-icon left>add</v-icon>Add
                </v-btn>
              </v-card-actions>
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
              <v-card-actions>
                <div class="flex-grow-1"></div>
                <v-btn color="accent" class="ma-3">
                  <v-icon left>add</v-icon>Add
                </v-btn>
              </v-card-actions>
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
              <v-card-actions>
                <div class="flex-grow-1"></div>
                <v-btn color="accent" class="ma-3">
                  <v-icon left>add</v-icon>Add
                </v-btn>
              </v-card-actions>
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
import { validationMixins } from "@/mixins/validationMixins";

export default {
  mixins: [validationMixins],
  data() {
    return {
      tab: null,
      validPassword: false,
      pass: {
        previous_password: "",
        new_password: ""
      },
      cpassword: "",
      dialogPassword: false,
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
      tableLoad6: false,
      profile: {
        id: "",
        username: "",
        name: "",
        email: "",
        phone: "",
        city_of_origin: "",
        birth_date: "1990-01-01",
        region: {
          id: "",
          name: "",
          is_removed: false
        },
        gender: "",
        signup_time: ""
      }
    };
  },
  mounted() {
    this.getData();
    this.getEducation();
    this.getEnterpreneurship();
    this.getOrganization();
    this.getTraining();
    this.getWorking();
    this.getSkill();
  },
  methods: {
    getData: function() {
      this.profile = auth.getAuthData();
      //   if (this.profile != null) {
      //     this.loadprofile();
      //   } else {
      //     this.loadprofile();
      //   }
    },
    getDataAgain: function() {
      this.profile = auth.getAuthData();
    },
    getEducation: function() {
      this.tableLoad1 = true;
      this.axios
        .get(config.baseUri + "/talent//education", {
          headers: auth.getAuthHeader()
        })
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
        .get(config.baseUri + "/talent/entrepreneurship", {
          headers: auth.getAuthHeader()
        })
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
        .get(config.baseUri + "/talent/organization", {
          headers: auth.getAuthHeader()
        })
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
        .get(config.baseUri + "/talent/training_experience", {
          headers: auth.getAuthHeader()
        })
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
        .get(config.baseUri + "/talent/working_experience", {
          headers: auth.getAuthHeader()
        })
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
        .get(config.baseUri + "/talent/skill", {
          headers: auth.getAuthHeader()
        })
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
    updatePassword() {
      this.loadPassword = true;
      this.axios
        .post(config.baseUri + "/talent/change_password", this.pass, {
          headers: auth.getAuthHeader()
        })
        .then(res => {
          this.dialogPassword = false;
        })
        .catch(res => {
          bus.$emit("callNotif", "error", res);
        })
        .finally(() => {
          this.loadPassword = false;
        });
    },
    resetPasswordDialog() {
      this.$refs.formPassword.reset();
      this.$refs.formPassword.resetValidation();
      this.dialogPassword = false;
    }
  }
};
</script>