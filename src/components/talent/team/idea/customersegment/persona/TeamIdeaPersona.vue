<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 md6>
        <v-card class="pb-5" elevation="3" style="margin:10px" :loading="loadParent">
          <v-card-title>{{parentData.name}}</v-card-title>
          <v-card-text>{{parentData.description}}</v-card-text>
          <v-card-text>
            <v-row justify="center">
              <v-expansion-panels popout mandatory v-if="parentData.aspect.length > 0">
                <v-expansion-panel>
                  <v-expansion-panel-header>{{$vuetify.lang.t('$vuetify.idea.persona')}}</v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-list>
                      <v-list-item v-for="aspect in parentData.aspect.slice(0,7)" :key="aspect.id">
                        <v-list-item-content>
                          <v-list-item-title>{{aspect.field_template.name}}</v-list-item-title>
                          <v-list-item-subtitle style="white-space: pre-wrap;">{{aspect.value}}</v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list>
                  </v-expansion-panel-content>
                </v-expansion-panel>
                <v-expansion-panel>
                  <v-expansion-panel-header>Empathy Map</v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-list>
                      <v-list-item v-for="aspect in parentData.aspect.slice(7,12)" :key="aspect.id">
                        <v-list-item-content>
                          <v-list-item-title>{{aspect.field_template.name}}</v-list-item-title>
                          <v-list-item-subtitle style="white-space: pre-wrap;">{{aspect.value}}</v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" small fab @click="openParentForm()">
              <v-icon>edit</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex xs12 md6>
        <v-card class="pb-5" elevation="3" style="margin:10px" :loading="loadChild">
          <v-card-title>Value Proposition</v-card-title>
          <v-card-text>
            <!-- {{childData.list}} -->
            <v-list v-for="data in childData.list" :key="data.id">
              <v-list-item three-line>
                <v-list-item-avatar>
                  <v-btn text small fab @click="gotoChild(data.id)">
                    <v-icon>zoom_in</v-icon>
                  </v-btn>
                </v-list-item-avatar>
                <v-list-item-content>
                  <!-- <v-list-item-title>{{data.name}}</v-list-item-title> -->
                  <v-list-item-subtitle>{{data.description}}</v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <div>
                    <v-btn @click="setMain(data.id)" small class="mr-2" v-if="!data.is_active">
                      <v-icon small>star</v-icon>
                    </v-btn>
                    <v-icon v-else large class="mr-4" color="yellow">star</v-icon>

                    <v-btn small color="warning" @click="deleteAct(data.id)">
                      <v-icon small>delete</v-icon>
                    </v-btn>
                  </div>
                </v-list-item-action>
              </v-list-item>
            </v-list>
          </v-card-text>
          <v-card-actions>
            <v-btn color="accent" @click="openChildForm">
              <v-icon>add</v-icon>
              {{$vuetify.lang.t('$vuetify.action.add')}} Value Proposition
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>

    <persona-form
      v-if="dialogParent"
      :edit="edit"
      :singleData="parentData"
      @close="dialogParent = false"
      @refresh="refreshParent"
    ></persona-form>

    <valueproposition-form
      v-if="dialogChild"
      :edit="edit"
      @close="dialogChild = false"
      @refresh="refreshChild"
    ></valueproposition-form>

    <v-dialog v-model="dialogDelete" width="300" :loading="loadChild">
      <v-card>
        <v-card-title>Delete Value Proposition</v-card-title>
        <v-card-text>Are you sure want to Delete this Value Proposition ?!</v-card-text>
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
import bus from "@/bus";
import auth from "@/config/auth";
import * as config from "@/config/app.config";

import PersonaForm from "./PersonaForm";
import ValuepropositionForm from "./valueproposition/ValuePropositionForm";

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
      loadChild: false
    };
  },
  components: {
    PersonaForm,
    ValuepropositionForm
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
            this.$route.params.ideaId +
            "/customer_segment/" +
            this.$route.params.customersegmentId +
            "/persona/" +
            this.$route.params.personaId,
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
            "/team/" +
            this.$route.params.teamId +
            "/idea/" +
            this.$route.params.ideaId +
            "/customer_segment/" +
            this.$route.params.customersegmentId +
            "/persona/" +
            this.$route.params.personaId +
            "/value_proposition",
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
    openParentForm() {
      this.edit = true;
      this.dialogParent = true;
    },
    openChildForm() {
      this.edit = false;
      this.dialogChild = true;
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
            this.$route.params.customersegmentId +
            +"/persona/" +
            this.$route.params.personaId +
            "/value_proposition/" +
            id,
          { headers: auth.getAuthHeader() }
        )
        .then(res => {
          this.dialogDelete = false;
          this.showInfo(res, ["Value Proposition Deleted"]);
          this.getChildData();
        })
        .catch(res => {
          bus.$emit("callNotif", "error", res);
        })
        .finally(() => {
          this.loadChild = false;
        });
    },
    setMain(id) {
      this.loadChild = true;
      this.axios
        .put(
          config.baseUri +
            "/team/" +
            this.$route.params.teamId +
            "/idea/" +
            this.$route.params.ideaId +
            "/customer_segment/" +
            this.$route.params.customersegmentId +
            +"/persona/" +
            this.$route.params.personaId +
            "/value_proposition/" +
            id +
            "/activate",
          {},
          { headers: auth.getAuthHeader() }
        )
        .then(res => {
          this.showInfo(res, ["Success set selected VP as active"]);
          this.getChildData();
        })
        .catch(res => {
          bus.$emit("callNotif", "error", res);
        })
        .finally(() => {
          this.loadParent = false;
        });
    },
    refreshParent() {
      this.dialogParent = false;
      this.getParentData();
    },
    refreshChild() {
      this.dialogChild = false;
      this.getChildData();
    },
    gotoChild(id) {
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
          id
      });
    }
  }
};
</script>
<style scoped>
</style>
