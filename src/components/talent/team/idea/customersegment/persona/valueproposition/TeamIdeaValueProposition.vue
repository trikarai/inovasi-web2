<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 md6>
        <v-card class="pb-5" elevation="3" style="margin:10px" :loading="loadParent">
          <!-- <v-card-title>{{parentData.name}}</v-card-title> -->
          <v-card-title>Value Proposition</v-card-title>
          <v-card-text style="white-space: pre-wrap;">{{parentData.description}}</v-card-text>

          <v-card-actions>
            <v-btn color="primary" small fab @click="openParentForm()">
              <v-icon>edit</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex xs12 md6>
        <v-card class="pb-5" elevation="3" style="margin:10px" :loading="loadChild">
          <v-card-title></v-card-title>
          <v-card-text>
            <v-list v-for="(menu, index) in menus" :key="index">
              <v-list-item>
                <v-list-item-avatar>
                  <v-btn text small fab icon>
                    <v-icon>{{menu.icon}}</v-icon>
                  </v-btn>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>{{menu.name}}</v-list-item-title>
                  <!-- <v-list-item-subtitle>Lorem Ipsmum soslsaksk</v-list-item-subtitle> -->
                </v-list-item-content>
                <v-list-item-action>
                  <div>
                    <v-btn
                      :disabled="menu.disabled"
                      small
                      color="primary"
                      @click="gotoChild(index)"
                    >
                      <v-icon small>zoom_in</v-icon>
                    </v-btn>
                  </div>
                </v-list-item-action>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>

    <valueproposition-form
      v-if="dialogParent"
      :edit="edit"
      :singleData="parentData"
      @close="dialogParent = false"
      @refresh="refreshParent"
    ></valueproposition-form>
  </v-container>
</template>
<script>
import auth from "@/config/auth";
import bus from "@/bus";
import * as config from "@/config/app.config";

import ValuepropositionForm from "./ValuePropositionForm";

export default {
  data() {
    return {
      dialogDelete: "",
      deleteId: "",
      parentData: {
        name: "",
        description: "",
        aspect: []
      },
      loadParent: false,
      dialogChild: false,
      dialogParent: false,
      edit: false,
      childData: {},
      loadChild: false,
      menus: [
        {
          icon: "business_center",
          name: this.$vuetify.lang.t("$vuetify.idea.businessAnalysis"),
          disabled: false
        },
        {
          icon: "recent_actors",
          name: this.$vuetify.lang.t("$vuetify.idea.experiment"),
          disabled: false
        },
        {
          icon: "scatter_plot",
          name: this.$vuetify.lang.t("$vuetify.idea.metric"),
          disabled: false
        },
        {
          icon: "dynamic_feed",
          name: this.$vuetify.lang.t("$vuetify.idea.devPlan"),
          disabled: false
        },
        {
          icon: "work",
          name: this.$vuetify.lang.t("$vuetify.idea.businessData"),
          disabled: false
        }
      ]
    };
  },
  components: {
    ValuepropositionForm
  },
  mounted() {
    this.getParentData();
    // this.getChildDa  ta();
  },
  methods: {
    getParentData() {
      this.loadParent = true;
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
            this.$route.params.valuepropositionId,

          { headers: auth.getAuthHeader() }
        )
        .then(res => {
          if (res.data.data) {
            this.parentData = res.data.data;
          }
        })
        .catch(res => {
          bus.$emit("callNotif", "error", res);
        })
        .finally(() => {
          this.loadParent = false;
        });
    },
    openParentForm() {
      this.edit = true;
      this.dialogParent = true;
    },
    refreshParent() {
      this.dialogParent = false;
      this.getParentData();
    },
    gotoChild(index) {
      switch (index) {
        case 0:
          this.$router.push({
            path:
              "/talent/team/" +
              this.$route.params.teamId +
              "/idea/" +
              this.$route.params.ideaId +
              "/customersegment/" +
              this.$route.params.customersegmentId +
              "/persona/" +
              this.$route.params.personaId +
              "/valueproposition/" +
              this.$route.params.valuepropositionId +
              "/businessanalysis"
          });
          break;
        case 1:
          this.$router.push({
            path:
              "/talent/team/" +
              this.$route.params.teamId +
              "/idea/" +
              this.$route.params.ideaId +
              "/customersegment/" +
              this.$route.params.customersegmentId +
              "/persona/" +
              this.$route.params.personaId +
              "/valueproposition/" +
              this.$route.params.valuepropositionId +
              "/javelin"
          });
          break;
        case 2:
          this.$router.push({
            path:
              "/talent/team/" +
              this.$route.params.teamId +
              "/idea/" +
              this.$route.params.ideaId +
              "/customersegment/" +
              this.$route.params.customersegmentId +
              "/persona/" +
              this.$route.params.personaId +
              "/valueproposition/" +
              this.$route.params.valuepropositionId +
              "/metric"
          });
          break;
        case 3:
          this.$router.push({
            path:
              "/talent/team/" +
              this.$route.params.teamId +
              "/idea/" +
              this.$route.params.ideaId +
              "/customersegment/" +
              this.$route.params.customersegmentId +
              "/persona/" +
              this.$route.params.personaId +
              "/valueproposition/" +
              this.$route.params.valuepropositionId +
              "/developmentplan"
          });
          break;
        case 4:
          this.$router.push({
            path:
              "/talent/team/" +
              this.$route.params.teamId +
              "/idea/" +
              this.$route.params.ideaId +
              "/customersegment/" +
              this.$route.params.customersegmentId +
              "/persona/" +
              this.$route.params.personaId +
              "/valueproposition/" +
              this.$route.params.valuepropositionId +
              "/businessdata"
          });
          break;
        default:
          this.$router.push({
            path:
              "/talent/team/" +
              this.$route.params.teamId +
              "/idea/" +
              this.$route.params.ideaId +
              "/customersegment/" +
              this.$route.params.customersegmentId +
              "/persona/" +
              this.$route.params.personaId +
              "/valueproposition/" +
              this.$route.params.valuepropositionId
          });
          break;
      }
    }
  }
};
</script>
<style scoped>
</style>
