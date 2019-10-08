<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 md6>
        <v-card class="pb-5" elevation="3" style="margin:10px" :loading="loadParent">
          <v-card-title>{{parentData.name}}</v-card-title>
          <v-card-text>{{parentData.description}}</v-card-text>
          <v-card-actions>
            <v-btn color="primary" small fab @click="openParentForm()">
              <v-icon>edit</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex xs12 md6>
        <v-card class="pb-5" elevation="3" style="margin:10px" :loading="loadChild">
          <v-card-title>Persona</v-card-title>
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
                  <v-list-item-title>{{data.name}}</v-list-item-title>
                  <v-list-item-subtitle>{{data.description}}</v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <div>
                    <v-btn
                      @click="setMain(data.id)"
                      small
                      class="mr-2"
                      v-if="!data.is_main_persona"
                    >
                      <v-icon small>star</v-icon>
                    </v-btn>
                    <v-icon v-else large class="mr-3" color="yellow">star</v-icon>

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
              {{$vuetify.lang.t('$vuetify.action.add')}} {{$vuetify.lang.t('$vuetify.idea.persona')}}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>

    <customersegment-form
      v-if="dialogParent"
      :edit="edit"
      :singleData="parentData"
      @close="dialogParent = false"
      @refresh="refreshParent"
    ></customersegment-form>

    <persona-form
      v-if="dialogChild"
      :edit="edit"
      @close="dialogChild = false"
      @refresh="refreshChild"
    ></persona-form>

    <v-dialog v-model="dialogDelete" width="300" :loading="loadChild">
      <v-card>
        <v-card-title>Delete Persona</v-card-title>
        <v-card-text>Are you sure want to Delete this Persona ?!</v-card-text>
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

import CustomersegmentForm from "./CustomerSegmentForm";
import PersonaForm from "./persona/PersonaForm";

export default {
  data() {
    return {
      dialogDelete: "",
      deleteId: "",
      parentData: {
        name: "",
        description: ""
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
    CustomersegmentForm,
    PersonaForm
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
            this.$route.params.customersegmentId,
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
            "/persona",
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
            id,
          { headers: auth.getAuthHeader() }
        )
        .then(res => {
          this.dialogDelete = false;
          this.showInfo(res, ["Persona Deleted"]);
          this.getChildData();
        })
        .catch(res => {
          bus.$emit("callNotif", "error", res);
        })
        .finally(() => {
          this.loadChild = false;
        });
    },
    setMain: function(id) {
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
            "/persona/" +
            id +
            "/assign_as_main_persona",
          {},
          { headers: auth.getAuthHeader() }
        )
        .then(res => {
          this.showInfo(res, ["Success to Set as Main Persona"]);
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
          id
      });
    }
  }
};
</script>
<style scoped>
</style>
