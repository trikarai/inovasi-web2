<template>
  <v-app>
    <v-content color="bgcolor">
      <notification :message="err_msg" :stats="status" />
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import bus from "@/bus";

export default {
  name: "App",
  data: () => ({
    //
  }),
  created() {
    bus.$on("callNotif", (type, res) => {
      // this.err_msg.error_details = [res.response.data.meta];
      this.err_msg = res.response.data.meta;
      switch (type) {
        case "error":
          this.status.error = true;
          break;
        case "success":
          this.status.success = true;
          break;
        case "info":
          this.status.info = true;
          break;
        case "warning":
          this.status.warning = true;
          break;
      }
    });
  }
};
</script>
