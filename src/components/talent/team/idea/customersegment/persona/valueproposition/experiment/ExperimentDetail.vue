<template>
  <v-container>
    <v-row>
      <v-col v-if="loadExpData">
        <v-progress-circular class="ma-5" size="50" color="primary" indeterminate></v-progress-circular>
      </v-col>
      <v-col v-else>
        <!-- {{dataExp}} -->
        <exp-list :template="dataExp" />
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import bus from "@/bus";
import auth from "@/config/auth";
import * as config from "@/config/app.config";
import { experimentMixins } from "@/mixins/experimentMixins";
// import { getexpMixins } from "@/mixins/getexpMixins";

import ExperimentForm from "../ExperimentForm";
import ExpList from "../ExperimentListModul";
export default {
  props: ["template"],
  mixins: [experimentMixins],
  components: {
    ExperimentForm,
    ExpList
  },
  data() {
    return {
      dataExp: { total: 0, list: [] },
      loadExpData: false
    };
  },
  mounted() {
    this.getExpData();
  },
  methods: {
    getExpData() {
      this.loadExpData = true;
      this.axios
        .get(
          config.baseUri +
            "/team/" +
            this.$route.params.teamId +
            "/idea/" +
            this.$route.params.ideaId +
            "/customer_segment/" +
            this.$route.params.customersegmentId +
            "/persona/" +
            this.$route.params.personaId +
            "/value_proposition/" +
            this.$route.params.valuepropositionId +
            "/experiment/" +
            this.$route.params.experimentId,
          { headers: auth.getAuthHeader() }
        )
        .then(res => {
          this.dataExp = res.data.data;
        })
        .catch(res => {
          bus.$emit("callNotif", "error", res);
        })
        .finally(() => {
          this.loadExpData = false;
        });
    }
  }
};
</script>