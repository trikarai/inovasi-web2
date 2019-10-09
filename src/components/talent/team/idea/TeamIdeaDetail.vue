<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 md6>
        <v-card class="pb-5" elevation="3" style="margin:10px" :loading="loadParent">
          <v-card-title>{{parentData.name}}</v-card-title>
          <v-card-text>{{parentData.description}}</v-card-text>
          <v-card-text>{{parentData.initator.talent.name}}</v-card-text>
          <v-card-actions v-if="isTalent">
            <v-btn color="primary" small fab @click="openIdeaForm()">
              <v-icon>edit</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex xs12 md6>
        <v-card class="pb-5" elevation="3" style="margin:10px" :loading="loadChild">
          <v-card-title>{{$vuetify.lang.t('$vuetify.idea.customersegment')}}</v-card-title>
          <v-card-text>
            <v-list v-for="data in childData.list" :key="data.id">
              <v-list-item three-line>
                <v-list-item-avatar>
                  <v-btn text small fab @click="gotoChild(data.id)">
                    <v-icon>zoom_in</v-icon>
                  </v-btn>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>{{data.name}}</v-list-item-title>
                  <v-list-item-subtitle>{{data.description}}</v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action v-if="isTalent">
                  <v-btn small color="warning" @click="deleteAct(data.id)">
                    <v-icon small>delete</v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
            </v-list>
          </v-card-text>
          <v-card-actions v-if="isTalent">
            <v-btn color="accent" @click="openCS">
              <v-icon>add</v-icon>
              {{$vuetify.lang.t('$vuetify.action.add')}} {{$vuetify.lang.t('$vuetify.idea.customersegment')}}
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

    <customersegment-form
      v-if="dialogCS"
      :edit="edit"
      @close="dialogCS = false"
      @refresh="refreshChild"
    ></customersegment-form>

    <v-dialog v-model="dialogDelete" width="300" :loading="loadChild">
      <v-card>
        <v-card-title>Delete Customer Segment</v-card-title>
        <v-card-text>Are you sure want to Delete this Customer Segment ?!</v-card-text>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn
            :loading="loadChild"
            @click="deleteData(deleteId)"
            color="red"
          >{{$vuetify.lang.t('$vuetify.action.yes')}}</v-btn>
          <v-btn
            :disabled="loadChild"
            @click="dialogDelete = false"
          >{{$vuetify.lang.t('$vuetify.action.cancel')}}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
import auth from "@/config/auth";
import bus from "@/bus";
import * as config from "@/config/app.config";
import { roleCheckMixins } from "@/mixins/roleCheckMixins";

import IdeaForm from "./IdeaForm";
import CustomersegmentForm from "./customersegment/CustomerSegmentForm";

export default {
  mixins: [roleCheckMixins],
  data() {
    return {
      dialogDelete: "",
      deleteId: "",
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
      loadParent: false,
      dialogIdea: false,
      dialogCS: false,
      edit: false,
      childData: {},
      loadChild: false
    };
  },
  components: {
    IdeaForm,
    CustomersegmentForm
  },
  created() {
    this.role = localStorage.getItem("role");
    if (this.role !== "Talent") {
      this.isTalent = false;
    }
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
            this.mentorUri +
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
        .catch(res => {
          bus.$emit("callNotif", "error", res);
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
            this.mentorUri +
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
        .catch(res => {
          bus.$emit("callNotif", "error", res);
        })
        .finally(() => {
          this.loadChild = false;
        });
    },
    openIdeaForm() {
      this.edit = true;
      this.dialogIdea = true;
    },
    openCS() {
      this.edit = false;
      this.dialogCS = true;
    },
    deleteAct(id) {
      this.deleteId = id;
      this.dialogDelete = true;
    },
    deleteData: function(id) {
      this.loadChild = true;
      this.axios
        .delete(
          config.baseUri +
            "/team/" +
            this.$route.params.teamId +
            "/idea/" +
            this.$route.params.ideaId +
            "/customer_segment/" +
            id,
          { headers: auth.getAuthHeader() }
        )
        .then(res => {
          this.dialogDelete = false;
          this.showInfo(res, ["Customer Segment Deleted"]);
          this.getChildData();
        })
        .catch(res => {
          bus.$emit("callNotif", "error", res);
        })
        .finally(() => {
          this.loadChild = false;
        });
    },
    refreshParent() {
      this.dialogIdea = false;
      this.getParentData();
    },
    refreshChild() {
      this.dialogCS = false;
      this.getChildData();
    },
    gotoChild(id) {
      if (this.isTalent) {
        this.$router.push({
          path:
            "/talent/team/" +
            this.$route.params.teamId +
            "/idea/" +
            this.$route.params.ideaId +
            "/customersegment/" +
            id
        });
      } else {
        this.$router.push({
          path:
            "/personnel/mentor/" +
            this.$route.params.mentorId +
            "/team/" +
            this.$route.params.teamId +
            "/idea/" +
            this.$route.params.ideaId +
            "/customersegment/" +
            id
        });
      }
    }
  }
};
</script>
<style scoped>
</style>
