<template>
  <nav>
    <v-app-bar text app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="text-uppercase black--text">
        <span class="font-weight-light">START MIKTI</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text @click="rightDrawer =! rightDrawer">
        <v-icon>settings</v-icon>
      </v-btn>
    </v-app-bar>

    <v-btn text @click="goback()">back</v-btn>

    <v-navigation-drawer app v-model="drawer" :mini-variant.sync="miniVariant">
      <!-- list head-->
      <v-list class="pa-1">
        <v-list-item v-if="miniVariant" @click.stop="miniVariant = !miniVariant">
          <v-list-item-action>
            <v-icon>chevron_right</v-icon>
          </v-list-item-action>
        </v-list-item>
        <v-list-item>
          <v-list-item-avatar>
            <!-- <img src="/img/avatar2.png" /> -->
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{user.name}}</v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn icon @click.stop="miniVariant = !miniVariant">
              <v-icon>chevron_left</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>
      <v-list>
        <!--sub list other-->
        <v-list-item v-for="link in links" :key="link.text" router :to="link.route">
          <v-list-item-action>
            <v-icon color="#676767">{{link.icon}}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="grey--text">{{link.text}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>
<script>
import auth from "@/config/auth";

export default {
  data() {
    return {
      drawer: true,
      rightDrawer: false,
      miniVariant: false,
      clipped: false,
      fixed: false,
      user: "",
      links: [
        {
          icon: "dashboard",
          text: "Dashboard",
          route: "/personnel/dashboard"
        },
        {
          icon: "person_outline",
          text: "Coordinator",
          route: "/personnel/dashboard"
        },
        {
          icon: "person",
          text: "Mentor",
          route: "/personnel/mentor"
        }
      ]
    };
  },
  created() {
    this.user = auth.getAuthData();
  },
  methods: {
    goback: function() {
      this.$router.go(-1);
    }
  }
};
</script>
<style scoped>
</style>