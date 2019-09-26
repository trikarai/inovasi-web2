<template>
  <v-container>
    <notification ref="notif" :err_msg2="err_msg" :status2="status" />

    <v-layout>
      <!-- {{dataTemplate}} -->
      <v-flex md12>
        <v-card>
          <v-toolbar flat color="primary" dark>
            <v-toolbar-title>{{$vuetify.lang.t('$vuetify.idea.experiment')}}</v-toolbar-title>
          </v-toolbar>
          <v-tabs v-model="tab" background-color="sidebar">
            <v-tabs-slider></v-tabs-slider>
            <v-tab href="#tab-pitchdeck" @click="getBusinessStructure('Pitch Deck')">Pitch Deck</v-tab>
            <v-tab
              href="#tab-businessdata"
              @click="getBusinessStructure('Business Data')"
            >Business Data</v-tab>
          </v-tabs>

          <v-tabs-items v-model="tab">
            <v-tab-item value="tab-main" active-class></v-tab-item>
            <v-tab-item value="tab-businessdata">
              <template v-if="loadBS">
                <v-progress-circular class="ma-5" size="50" color="primary" indeterminate></v-progress-circular>
              </template>
              <template v-else>
                <v-container>
                  <v-row v-if="dataBS.total == 0">
                    <v-btn
                      class="ma-3"
                      color="accent"
                      @click="openBsForm('6bafadd0-9d5b-4fc4-94ed-3beb3dfc1575', 'Business Data')"
                    >
                      <v-icon left>add</v-icon>
                      {{$vuetify.lang.t('$vuetify.action.submit')}} Business Data
                    </v-btn>
                  </v-row>
                  <v-row v-else>
                    <v-col>
                      <v-btn
                        small
                        color="primary"
                        class="ma-2"
                        @click="editBsForm(dataBS, dataBS.business_structure_template.name)"
                      >
                        <v-icon>edit</v-icon>
                      </v-btn>
                      <v-btn
                        small
                        :loading="loadDelete"
                        color="red"
                        class="ma-2"
                        @click="deleteBs(dataBS.id, dataBS.business_structure_template.id)"
                      >
                        <v-icon>delete</v-icon>
                      </v-btn>
                    </v-col>
                    <canvas-list :template="dataBS" />
                  </v-row>
                </v-container>
              </template>
            </v-tab-item>
            <v-tab-item value="tab-pitchdeck">
              <template v-if="loadBS">
                <v-progress-circular class="ma-5" size="50" color="primary" indeterminate></v-progress-circular>
              </template>
              <template v-else>
                <v-container>
                  <v-row v-if="dataBS.total == 0">
                    <v-btn
                      class="ma-3"
                      color="accent"
                      @click="openBsForm('7d6738e0-c699-4896-abe9-2a23e1fd6b92', 'Pitch Deck')"
                    >
                      <v-icon left>add</v-icon>
                      {{$vuetify.lang.t('$vuetify.action.submit')}} Pitch Deck
                    </v-btn>
                  </v-row>
                  <v-row v-else>
                    <v-col>
                      <v-btn
                        small
                        color="primary"
                        class="ma-2"
                        @click="editBsForm(dataBS, dataBS.business_structure_template.name)"
                      >
                        <v-icon>edit</v-icon>
                      </v-btn>
                      <v-btn
                        small
                        :loading="loadDelete"
                        color="red"
                        class="ma-2"
                        @click="deleteBs(dataBS.id, dataBS.business_structure_template.id)"
                      >
                        <v-icon>delete</v-icon>
                      </v-btn>
                    </v-col>
                    <canvas-list :template="dataBS" />
                  </v-row>
                </v-container>
              </template>
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </v-flex>
    </v-layout>

    <v-dialog v-model="dialogDelete" width="300">
      <v-card>
        <v-card-title>Delete Idea</v-card-title>
        <v-card-text>Are you sure want to Delete this Idea ?!</v-card-text>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn
            @click="deleteData(deleteId, templateId)"
            color="red"
          >{{$vuetify.lang.t('$vuetify.action.yes')}}</v-btn>
          <v-btn @click="dialogDelete = false">{{$vuetify.lang.t('$vuetify.action.cancel')}}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <experiment-form
      v-if="dialogExp"
      :edit="edit"
      :template="templateData"
      :templateId="templateId"
      :templateName="templateName"
      @close="dialogExp = false"
      @refresh="refreshExp"
    ></experiment-form>
    <canvas-form
      v-if="dialogCanvas"
      :edit="edit"
      :template="templateData"
      :templateId="templateId"
      :templateName="templateName"
      @close="dialogCanvas = false"
      @refresh="refreshCanvas"
    ></canvas-form>
  </v-container>
</template>
<script>
import auth from "@/config/auth";
import * as config from "@/config/app.config";
import { experimentMixins } from "@/mixins/experimentMixins";
// import { getexpMixins } from "@/mixins/getexpMixins";
import { getbsMixins } from "@/mixins/getbsMixins";
import { notifMixins } from "@/mixins/notifMixins";

import ExperimentForm from "../ExperimentForm";
import CanvasForm from "../BusinessForm";
import CanvasList from "../CanvasListModul";

export default {
  mixins: [getbsMixins, experimentMixins, notifMixins],
  components: {
    ExperimentForm,
    CanvasForm,
    CanvasList
  },
  data() {
    return {
      dialogExp: false,
      dialogCanvas: false,
      edit: false,
      showTemplate: false,
      templateName: "",
      dataTemplate: { total: 0, list: [] },
      dataExp: { total: 0, list: [] },
      loadExpData: false,
      templateId: "",
      tab: "tab-main",
      exptype: 0,
      dataJavelin: { total: 0, list: [] },
      loadJavelin: false,
      summary: true,
      expitems: [
        { value: 0, text: "All" },
        { value: 1, text: "Concierge" },
        { value: 2, text: "Interview" },
        { value: 3, text: "Wizard of Oz" }
      ],
      headers: [
        { text: "Date", value: "date", sortable: false, align: "start" },
        { text: "Name", value: "name", sortable: false, align: "start" },
        { text: "", value: "action", sortable: false, align: "end" }
      ],
      dialogDelete: false,
      loadDelete: false,
      deleteId: ""
    };
  },
  mounted() {
    this.showTemplateExp();
  },
  methods: {
    loadSummary() {
      this.summary = false;
      this.dataJavelin = { total: 0, list: [] };
      this.getDevPlanData();
    },
    showTemplateExp: function() {
      this.showTemplate = true;
      this.axios
        .get(config.baseUri + "/team/form_template/experiment", {
          headers: auth.getAuthHeader()
        })
        .then(res => {
          this.dataTemplate = res.data.data;
        })
        .catch()
        .finally(() => {
          this.showTemplate = false;
        });
    },
    getExpData(id) {
      this.loadExpData = true;
      this.templateId = id;
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
            "/experiment?experiment_template_id[]=" +
            id,
          { headers: auth.getAuthHeader() }
        )
        .then(res => {
          this.dataExp = res.data.data;
        })
        .catch(res => {
          this.showError(res);
        })
        .finally(() => {
          this.loadExpData = false;
        });
    },
    openExpForm(id, name) {
      this.templateId = id;
      this.templateName = name;
      this.edit = false;
      this.dialogExp = true;
    },
    editExpForm(template, name) {
      this.templateId = "";
      this.templateName = name;
      this.templateData = template;
      this.edit = true;
      this.dialogExp = true;
    },
    openBsForm(id, name) {
      this.templateId = id;
      this.templateName = name;
      this.edit = false;
      this.dialogCanvas = true;
    },
    editBsForm(template, name) {
      this.templateId = "";
      this.templateName = name;
      this.templateData = template;
      this.edit = true;
      this.dialogCanvas = true;
    },
    deleteActExp(id, templateId) {
      this.deleteId = id;
      this.templateId = templateId;
      this.dialogDelete = true;
    },
    deleteExp(id, templateId) {
      this.loadDelete = true;
      this.axios
        .delete(
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
            id,
          { headers: auth.getAuthHeader() }
        )
        .then(() => {
          this.refreshDeleteExp(templateId);
        })
        .catch(res => {
          this.showError(res);
        })
        .finally(() => {
          this.loadDelete = false;
        });
    },
    deleteBs(id, templateId) {
      this.loadDelete = true;
      this.axios
        .delete(
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
            "/business_structure/" +
            id,
          { headers: auth.getAuthHeader() }
        )
        .then(() => {
          this.refreshDeleteBs(templateId);
        })
        .catch(res => {
          this.showError(res);
        })
        .finally(() => {
          this.loadDelete = false;
        });
    },
    refreshExp(id) {
      this.getExpData(id);
      this.dialogExp = false;
    },
    refreshCanvas(name) {
      this.getBusinessStructure(name);
      this.dialogCanvas = false;
    },
    refreshDeleteExp(id) {
      this.getExpData(id);
      this.dialogExp = false;
    },
    refreshDeleteBs(id) {
      this.dataBS = { total: 0, list: [] };
      this.dialogCanvas = false;
    }
  }
};
</script>
<style scoped>
#javeboard td {
  background: #fff !important;
  padding: 10px;
}
#javeboard th {
  width: 200px;
}
#javeboard tr {
  border-bottom: 2px solid #e4e4e4;
}
#javeboard .jbth {
  text-align: center;
  background: #efefef;
}
</style>