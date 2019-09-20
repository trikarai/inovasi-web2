<template>
  <v-container>
    <notification ref="notif" :err_msg2="err_msg" :status2="status" />
    <v-layout row wrap>
      <v-flex xs12 md6>
        <v-card class="pb-5" elevation="3" style="margin:10px" :loading="loadParent">
          <v-card-title>{{parentData.name}}</v-card-title>
          <v-card-text>{{parentData.description}}</v-card-text>
          <v-card-text>{{parentData.initator.talent.name}}</v-card-text>
          <v-card-actions>
            <v-btn color="primary" small fab @click="openIdeaForm()">
              <v-icon>edit</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex xs12 md6>
        <v-card class="pb-5" elevation="3" style="margin:10px" :loading="loadChild">
          <v-card-title>Customer Segment</v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item three-line v-for="data in childData.list" :key="data.id">
                <v-list-item-avatar>
                  <v-btn text small fab>
                    <v-icon>zoom_in</v-icon>
                  </v-btn>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>{{data.name}}</v-list-item-title>
                  <v-list-item-subtitle>{{data.description}}</v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <v-btn small color="warning">
                    <v-icon small>delete</v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
            </v-list>
          </v-card-text>
          <v-card-actions>
            <v-btn color="accent">
              <v-icon>add</v-icon>Add Customer Segment
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
    <idea-form
      v-if="dialogIdea"
      :edit="edit"
      :singleData="parentData"
      @close="dialogIdea = false"
      @refresh="refreshParent"
    ></idea-form>
  </v-container>
</template>
<script>
import auth from "@/config/auth";
import * as config from "@/config/app.config";
import { statusMixins } from "@/mixins/statusMixins";
import { notifMixins } from "@/mixins/notifMixins";

import IdeaForm from "./IdeaForm";

export default {
  data() {
    return {
      parentData: {
        initator: {
          talent: {
            name: ""
          }
        },
        name: "",
        description: "",
        is_main_idea: false
      },
      dialogIdea: false,
      edit: false,
      loadParent: false,
      childData: {},
      loadChild: false
    };
  },
  components: {
    IdeaForm
  },
  mounted() {
    this.getParentData();
    this.getChildData();
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
            this.$route.params.ideaId,
          { headers: auth.getAuthHeader() }
        )
        .then(res => {
          if (res.data.data) {
            this.parentData = res.data.data;
          }
        })
        .catch(error => {
          this.showError(error);
        })
        .finally(() => {
          this.loadParent = false;
        });
    },
    getChildData() {
      this.loadChild = true;
      this.axios
        .get(
          config.baseUri +
            "/team/" +
            this.$route.params.teamId +
            "/idea/" +
            this.$route.params.ideaId +
            "/customer_segment",
          { headers: auth.getAuthHeader() }
        )
        .then(res => {
          if (res.data.data) {
            this.childData = res.data.data;
          }
        })
        .catch(error => {
          this.showError(error);
        })
        .finally(() => {
          this.loadChild = false;
        });
    },
    openIdeaForm() {
      this.edit = true;
      this.dialogIdea = true;
    },
    refreshParent() {
      this.dialogIdea = false;
      this.getParentData();
    }
  }
};
</script>
<style scoped>
</style>
