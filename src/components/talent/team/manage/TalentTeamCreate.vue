<template>
  <v-container>
    <!-- {{dataList.list}} -->
    <v-form v-model="valid" ref="form">
      <v-container>
        <v-row>
          <v-col cols="12" md="6" sm="12">
            <v-card style="padding:10px 50px 50px 50px" :loading="loader">
              <v-row>
                <v-text-field
                  position="absolute"
                  v-model="params.name"
                  :rules="nameRules"
                  :counter="25"
                  :label="$vuetify.lang.t('$vuetify.team.teamName')"
                  required
                ></v-text-field>
              </v-row>
              <v-row>
                <v-select
                  required
                  :rules="posRules"
                  v-model="params.position"
                  :items="item"
                  chips
                  :label="$vuetify.lang.t('$vuetify.team.position')"
                ></v-select>
              </v-row>
              <v-row>
                <v-col cols="12" md="10">
                  <v-textarea
                    v-model="params.vision"
                    :label="$vuetify.lang.t('$vuetify.team.vision')"
                    :placeholder="$vuetify.lang.t('$vuetify.team.writeHere')"
                    counter
                  ></v-textarea>
                </v-col>
                <v-col>
                  <v-tooltip max-width="250" right>
                    <template v-slot:activator="{ on }">
                      <v-btn
                        style="float:right;width:24px;height:24px;"
                        fab
                        small
                        elevation="0"
                        color="primary"
                        dark
                        v-on="on"
                      >
                        <v-icon small>priority_high</v-icon>
                      </v-btn>
                    </template>
                    <span>Vision Statement adalah kalimat yang mendeskripsikan masa depan dari bisnis anda. Contoh Vision Statement dari Amazon: To be Earth’s most customer-centric company, where customers can find and discover anything they might want to buy online.</span>
                  </v-tooltip>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="10">
                  <v-textarea
                    v-model="params.mission"
                    :label="$vuetify.lang.t('$vuetify.team.mission')"
                    :placeholder="$vuetify.lang.t('$vuetify.team.writeHere')"
                    counter
                  ></v-textarea>
                </v-col>
                <v-col>
                  <v-tooltip max-width="250" right>
                    <template v-slot:activator="{ on }">
                      <v-btn
                        style="float:right;width:24px;height:24px;"
                        fab
                        small
                        elevation="0"
                        color="primary"
                        dark
                        v-on="on"
                      >
                        <v-icon small>priority_high</v-icon>
                      </v-btn>
                    </template>
                    <span>Mission Statement adalah kalimat yang mendeskripsikan tentang bisnis anda, tujuan serta cara perusahaan anda untuk mencapai tujuan tersebut. Contoh Mission Statement dari Amazon: We strive to offer our customers the lowest possible prices, the best available selection, and the utmost convenience.</span>
                  </v-tooltip>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="10">
                  <v-textarea
                    v-model="params.culture"
                    :label="$vuetify.lang.t('$vuetify.team.culture')"
                    :placeholder="$vuetify.lang.t('$vuetify.team.writeHere')"
                    counter
                  ></v-textarea>
                </v-col>
                <v-col>
                  <v-tooltip max-width="250" right>
                    <template v-slot:activator="{ on }">
                      <v-btn
                        style="float:right;width:24px;height:24px;"
                        fab
                        small
                        elevation="0"
                        color="primary"
                        dark
                        v-on="on"
                      >
                        <v-icon small>priority_high</v-icon>
                      </v-btn>
                    </template>
                    <span>Culture/Budaya menjelaskan karakter dari perusahaan anda. Menjelaskan bagaimana perusahaan anda bekerja. Company Culture memiliki berbagai unsur, termasuk lingkungan kerja, tujuan perusahaan, etos kerja, dan value dari perusahaan.</span>
                  </v-tooltip>
                </v-col>
              </v-row>
              <v-row>
                <v-textarea
                  v-model="params.founder_agreement"
                  :label="$vuetify.lang.t('$vuetify.team.founderAgreement')"
                  :placeholder="$vuetify.lang.t('$vuetify.team.writeHere')"
                  counter
                ></v-textarea>
              </v-row>
              <v-btn
                block
                class="mt-5"
                @click.prevent="validateTeam"
                :class=" { 'primary white--text' : valid}"
                :disabled="!valid"
              >{{ $vuetify.lang.t('$vuetify.action.create')}} {{ $vuetify.lang.t('$vuetify.team.team')}}</v-btn>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </v-container>
</template>
<script>
import bus from "@/bus";
import auth from "@/config/auth";
import * as config from "@/config/app.config";
export default {
  data() {
    return {
      valid: false,
      loader: false,
      params: {
        name: "",
        vision: "",
        mission: "",
        culture: "",
        founder_agreement: "",
        position: ""
      },
      teamLoading: false,
      posRules: [v => !!v || "Position is required"],
      nameRules: [
        v => !!v || "Name is required",
        v => v.length <= 25 || "Name must be less than 10 characters"
      ],
      item: ["Business", "Technical", "Designer"]
    };
  },
  watch: {},
  created: function() {},
  mounted: function() {},
  methods: {
    validateTeam: function() {
      if (this.$refs.form.validate()) {
        this.createTeam();
      } else {
        this.$vuetify.goTo(this.$refs.form, {
          duration: 500,
          offset: 0,
          easing: "linear"
        });
      }
    },
    createTeam: function() {
      this.teamLoading = true;
      this.axios
        .post(config.baseUri + "/talent/team", this.params, {
          headers: auth.getAuthHeader()
        })
        .then(() => {
          this.$router.go(-1);
        })
        .catch(res => {
          bus.$emit("callNotif", "error", res);
        })
        .finally(() => {
          this.teamLoading = false;
        });
    }
  }
};
</script>

<style scoped>
</style>