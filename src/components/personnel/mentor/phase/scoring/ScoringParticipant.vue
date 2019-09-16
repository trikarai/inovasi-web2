<template>
  <v-container>
    <!-- {{dataList}} -->
    <v-layout>
      <v-flex md12>
        <v-data-table
          :loading="tableLoad"
          :headers="headers"
          :items="dataList.list"
          class="elevation-1"
        >
          <template v-slot:item.action="{ item }">
            <template v-if="item.status == 'active'">
              <v-btn @click="openScoring(item)" color="primary" class="mr-1">Add Score</v-btn>
            </template>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>

    <v-dialog v-model="scoringForm" max-width="450">
      <v-card v-if="templateLoad">
        <v-card-title>Loading...</v-card-title>
        <v-card-text>
          <v-progress-circular size="70" width="7" color="purple" indeterminate></v-progress-circular>
        </v-card-text>
      </v-card>
      <v-card v-else>
        <v-form v-model="valid" ref="form">
          <v-card-title>Add Score</v-card-title>
          <v-card-text>
            <!-- {{params}} -->
            <div class="ma-3">
              <template v-for="(data, index) in formTemplate.fields">
                <field-module :fields="data" :index="index" :key="data.id" />
              </template>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn @click="submit" :disabled="!valid" color="primary">Submit</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
import bus from "@/bus";
import auth from "@/config/auth";
import * as config from "@/config/app.config";

import { formMixins } from "@/mixins/formMixins";

import FieldModule from "@/components/field/field";

export default {
  mixins: [formMixins],
  data: function() {
    return {
      valid: false,
      tableLoad: false,
      templateLoad: false,
      dataList: { total: 0, list: [] },
      headers: [
        { text: "Team Name", value: "team.name", sortable: false },
        {
          text: "Current Phase",
          value: "current_phase.name",
          sortable: false
        },
        { text: "Status", value: "status", sortable: false },
        { text: "", value: "action", align: "right" }
      ],
      scoringForm: false,
      formData: "",
      formTemplate: "",
      params: {
        programme_id: this.$route.params.programId,
        phase_id: this.$route.params.phaseId,
        scoring_id: this.$route.params.scoringId,
        participant_id: "",
        data: []
      }
    };
  },
  components: {
    FieldModule
  },
  watch: {},
  created: function() {
    bus.$on("getValue", (params, index) => {
      this.params.data.splice(index, 1, params);
    });
  },
  mounted: function() {
    this.getDataList();
  },
  methods: {
    getDataList: function() {
      this.tableLoad = true;
      this.axios
        .get(
          config.APIENDPOINT +
            "/programme/" +
            this.$route.params.programId +
            "/participant",
          { headers: auth.getAuthHeader() }
        )
        .then(res => {
          if (res.data.data) {
            this.dataList = res.data.data;
          } else {
            this.dataList = { total: 0, list: [] };
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.tableLoad = false;
        });
    },
    getFormTemplate: function() {
      this.templateLoad = true;
      this.axios
        .get(
          config.APIENDPOINT +
            "/team/form_template/" +
            this.$route.params.templateId,
          { headers: auth.getAuthHeader() }
        )
        .then(res => {
          this.formTemplate = res.data.data;
          this.setFormJSONTemplate(res.data.data);
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.templateLoad = false;
        });
    },
    openScoring: function(item) {
      console.log(item);
      this.scoringForm = true;
      this.formData = item;
      this.params.participant_id = item.id;
      this.getFormTemplate();
    },
    submit: function() {
      if (this.$refs.form.validate()) {
        this.addData();
      } else {
        this.$vuetify.goTo(this.$refs.form, {
          duration: 500,
          offset: 0,
          easing: "linear"
        });
      }
    },
    addData: function() {
      this.templateLoad = true;
      this.axios
        .post(
          config.APIENDPOINT +
            "/tutor/" +
            this.$route.params.mentorId +
            "/score",
          {
            headers: auth.getAuthHeader()
          }
        )
        .then(() => {
          this.scoringForm = false;
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.templateLoad = false;
        });
    }
  }
};
</script>

<style scoped>
</style>