<template>
  <v-app>
    <v-container fluid fill-height id="loginpage">
      <v-row align="center" justify="center">
        <v-col xs="12" sm="8" md="4" class="text-xs-center">
          <v-toolbar class="pt-2" color="primary">
            <v-toolbar-title class="white--text ml-2">
              <h4>
                Mikti
                <v-chip color="accent">Start</v-chip>
              </h4>
            </v-toolbar-title>
            <v-toolbar-title class="ml-auto">
              <router-link v-bind:to="'/'">
                <v-icon class="white--text mb-2 ml-3">home</v-icon>
              </router-link>
            </v-toolbar-title>
          </v-toolbar>
          <v-card style="padding:20px 30px 30px 30px;" class="text-center elevation-12">
            <v-card-text style="pa-4">
              <div>
                <v-form v-model="valid" ref="form">
                  <v-row>
                    <v-col>
                      <v-autocomplete
                        :loading="regionLoader"
                        label="Region"
                        prepend-icon="location_on"
                        :items="regionList.list"
                        item-value="id"
                        item-text="name"
                        v-model="signup.region_id"
                        :rules="rulesRequired"
                        required
                      ></v-autocomplete>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <v-text-field
                        label="Username"
                        prepend-icon="person"
                        v-model="signup.username"
                        :rules="rulesUsername"
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <v-text-field
                        autocomplete="new-password"
                        label="Password"
                        prepend-icon="lock"
                        v-model="signup.password"
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
                        label="Confirm Password"
                        prepend-icon="lock"
                        v-model="cpassword"
                        :rules="rulesPasswordConfirmation"
                        min="8"
                        :append-icon="e2 ? 'visibility' : 'visibility_off'"
                        :type="e2 ? 'password' : 'text'"
                        counter
                        required
                        @click:append="e2 = !e2"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <v-text-field
                        label="Name"
                        prepend-icon="person"
                        v-model="signup.name"
                        :rules="rulesName"
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <v-text-field
                        label="Email"
                        prepend-icon="mail"
                        v-model="signup.email"
                        :rules="rulesEmail"
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <v-text-field
                        label="phone"
                        prepend-icon="phone"
                        v-model="signup.phone"
                        :rules="rulesPhone"
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <v-text-field
                        label="City of Origin"
                        prepend-icon="location_city"
                        v-model="signup.city_of_origin"
                        :rules="rulesRequired"
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <v-menu
                        ref="menu"
                        v-model="menu"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        full-width
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on }">
                          <v-text-field
                            v-model="signup.birthdate"
                            autocomplete="bday"
                            :label="$vuetify.lang.t('$vuetify.profile.birthDate')"
                            prepend-icon="cake"
                            readonly
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          ref="picker"
                          :locale="$vuetify.lang.current"
                          v-model="signup.birthdate"
                          :max="new Date().toISOString().substr(0, 10)"
                          min="1950-01-01"
                          @input="menu = false"
                        ></v-date-picker>
                      </v-menu>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col>
                      <v-radio-group v-model="signup.gender" row>
                        <v-radio label="Male" value="M" color="primary"></v-radio>
                        <v-radio label="Female" value="F" color="primary"></v-radio>
                      </v-radio-group>
                    </v-col>
                  </v-row>

                  <v-row justify-end class="mt-2">
                    <v-col class="mt-2"></v-col>
                    <vue-recaptcha @verify="onVerify" @expired="onExpired" v-bind:sitekey="sitekey">
                      <v-btn
                        @click="submit"
                        block
                        :loading="signupLoader"
                        :class=" { 'primary white--text' : valid}"
                        :disabled="!valid"
                        color="primary"
                        style="color:#fff"
                      >Sign Up</v-btn>
                    </vue-recaptcha>
                  </v-row>
                </v-form>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>
<script>
import bus from "@/bus";
import * as config from "@/config/app.config";
import { validationMixins } from "@/mixins/validationMixins";
import VueRecaptcha from "vue-recaptcha";

export default {
  mixins: [validationMixins],
  name: "Login",
  data: function() {
    return {
      menu: false,
      e1: true,
      e2: true,
      valid: false,
      sitekey: "6Ld47ZMUAAAAAM26YnKZuHXc6jfWKnM6xRW2eY4b",
      signupLoader: false,
      regionLoader: false,
      regionList: { total: 0, list: [] },
      cpassword: "",
      signup: {
        username: "",
        password: "",
        region_id: "",
        name: "",
        email: "",
        phone: "",
        city_of_origin: "",
        birthdate: "",
        gender: ""
      }
    };
  },
  watch: {
    menu(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"));
    }
  },
  created: function() {},
  mounted: function() {
    this.getRegion();
  },
  components: {
    VueRecaptcha
  },
  methods: {
    getRegion() {
      this.regionLoader = true;
      this.axios
        .get(config.baseUri + "/region")
        .then(res => {
          this.regionList = res.data.data;
        })
        .catch(res => {
          bus.$emit("callNotif", "error", res);
        })
        .finally(() => {
          this.regionLoader = false;
        });
    },
    onSubmit: function() {
      this.$refs.invisibleRecaptcha.execute();
    },
    onVerify: function() {
      // console.log("Verify: " + response);
    },
    onExpired: function() {
      // console.log("Expired");
    },
    resetRecaptcha() {
      this.$refs.recaptcha.reset(); // Direct call reset method
    },
    submit() {
      if (this.$refs.form.validate()) {
        this.signupAct();
      }
    },
    signupAct: function() {
      this.signupLoader = true;
      this.axios
        .post(config.baseUri + "/signup", this.signup)
        .then(() => {
          this.$router.push({ path: "/login", query: { activate: true } });
        })
        .catch(res => {
          bus.$emit("callNotif", "error", res);
        })
        .finally(() => {
          this.signupLoader = false;
        });
    },
    clear() {
      this.$refs.form.reset();
    }
  }
};
</script>
<style scoped>
#loginpage {
  background-image: url("https://start.mikti.id/img/login-bg.png");
  background-size: cover;
  background-position: center center;
  overflow: hidden;
  height: 100%;
}
</style>
