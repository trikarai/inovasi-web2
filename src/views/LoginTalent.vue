<template>
  <v-app>
    <div id="loginpage">
      <v-layout align-center justify-center></v-layout>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4 elevation-12 class="text-xs-center">
            <v-toolbar class="pt-2" color="primary">
              <!-- <v-img
                src="/img/miktilampu.png"
                style="position: relative;bottom: 5px;"
                aspect-ratio="1"
                max-width="30px"
              ></v-img>-->
              <v-toolbar-title class="white--text ml-2">
                <h4>
                  MIKTI
                  <v-chip>S t a r t</v-chip>
                </h4>
              </v-toolbar-title>
              <v-toolbar-title class="ml-auto">
                <router-link v-bind:to="'/signup'">
                  <v-icon class="white--text mb-2">person_add</v-icon>
                </router-link>
                <router-link v-bind:to="'/'">
                  <v-icon class="white--text mb-2 ml-3">home</v-icon>
                </router-link>
              </v-toolbar-title>
              <!-- </v-toolbar-items> -->
            </v-toolbar>
            <v-card style="padding:20px 30px 30px 30px;" class="text-center">
              <h3 class="font-weight-light mt-4 mb-1">Login Talent</h3>
              <v-card-text style="pa-4">
                <div>
                  <v-form v-model="valid" ref="form">
                    <v-layout>
                      <v-text-field
                        label="Username"
                        prepend-icon="person"
                        v-model="username"
                        autocomplete="username"
                        :rules="usernameRules"
                        required
                      ></v-text-field>
                    </v-layout>
                    <v-layout>
                      <v-text-field
                        label="Password"
                        prepend-icon="lock"
                        v-model="password"
                        min="8"
                        :append-icon="e1 ? 'visibility' : 'visibility_off'"
                        :type="e1 ? 'password' : 'text'"
                        :rules="passwordRules"
                        counter
                        required
                        @click:append="e1 = !e1"
                        v-on:keyup.enter="submit"
                      ></v-text-field>
                    </v-layout>
                    <v-layout justify-end class="mt-2">
                      <v-flex class="mt-2">
                        <!-- <router-link v-bind:to="'/forgot-password'">Lupa Password</router-link> -->
                      </v-flex>
                      <v-btn
                        @click="submit"
                        :loading="loader"
                        :class=" { 'primary white--text' : valid}"
                        :disabled="!valid"
                        color="#e4e4e4"
                        style="color:#fff"
                      >Login</v-btn>
                    </v-layout>
                  </v-form>
                </div>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
  </v-app>
</template>
<script>
import bus from "@/bus";
import * as config from "@/config/app.config";

export default {
  name: "Login",
  data: function() {
    return {
      loader: false,
      response: "",
      valid: true,
      alert: false,
      err_msg: { details: [""] },
      status: {
        success: false,
        error: false,
        info: false,
        warning: false
      },
      e1: true,
      username: "",
      password: "",
      usernameRules: [v => !!v || "Username is required"],
      passwordRules: [v => !!v || "Password is required"],
      email: "",
      emailRules: [
        v => !!v || "E-mail is required",
        v =>
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          "E-mail must be valid"
      ],
      activate: this.$route.query.activate
    };
  },
  created: function() {},
  mounted: function() {},
  components: {},
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.login();
      }
    },
    login: function() {
      this.loader = true;
      this.axios
        .post(config.baseUri + "/login/talent", {
          username: this.username,
          password: this.password
        })
        .then(res => {
          localStorage.setItem("access_data", JSON.stringify(res.data.data));
          localStorage.setItem("access_token", res.headers["token"]);
          localStorage.setItem("role", "Talent");
          this.$router.push("/talent/dashboard");
        })
        .catch(res => {
          bus.$emit("callNotif", "error", res);
        })
        .finally(() => {
          this.loader = false;
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
