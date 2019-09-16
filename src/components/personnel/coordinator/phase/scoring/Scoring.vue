<template>
  <v-container>
    <!-- {{phasescoring}} -->
    <v-card class="elevation-0 mb-3">
      <v-card-title>
        <div class="flex-grow-1"></div>
        <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
      </v-card-title>
      <v-layout>
        <v-flex md12>
          <v-data-table
            dark
            :search="search"
            :loading="tableLoad"
            :headers="headers"
            :items="phasescoring.list"
            class="elevation-1"
          >
            <template v-slot:item.action="{ item }">
              <v-btn
                @click="openForm(item.id, item.start_date, item.end_date)"
                small
                class="mr-2 mt-2"
                color="warning"
              >Change Period</v-btn>
            </template>
          </v-data-table>
        </v-flex>
      </v-layout>
    </v-card>

    <v-dialog v-model="dialogForm" persistent max-width="450">
      <v-card>
        <v-form v-model="valid" ref="form">
          <v-card-title>Change Period</v-card-title>
          <v-card-text>
            <v-layout row wrap>
              <v-flex xs12>
                <v-menu
                  ref="menu"
                  v-model="menu"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  full-width
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="params.start_date"
                      label="Start Period"
                      hint="Start Period"
                      prepend-icon="today"
                      readonly
                      v-on="on"
                      :rules="rules"
                    ></v-text-field>
                  </template>
                  <v-date-picker ref="picker" v-model="params.start_date" @input="menu = false"></v-date-picker>
                </v-menu>
              </v-flex>
              <v-flex xs12>
                <v-menu
                  ref="menu2"
                  v-model="menu2"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  full-width
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="params.end_date"
                      label="End Period"
                      hint="End Period"
                      prepend-icon="today"
                      readonly
                      v-on="on"
                      :rules="rules"
                    ></v-text-field>
                  </template>
                  <v-date-picker ref="picker" v-model="params.end_date" @input="menu2 = false"></v-date-picker>
                </v-menu>
              </v-flex>
            </v-layout>
          </v-card-text>
          <v-card-actions>
            <v-btn :loading="onsubmit" :disabled="!valid" color="primary" @click="submit">Submit</v-btn>
            <v-btn v-if="!onsubmit" color="red" @click="dialogForm = false">Cancel</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
import auth from "@/config/auth";
import * as config from "@/config/app.config";

export default {
  data: function() {
    return {
      onsubmit: false,
      selectedId: null,
      search: "",
      valid: false,
      dialogForm: false,
      tableLoad: false,
      phasescoring: { total: 0, list: [] },
      scoringId: "",
      headers: [
        { text: "Name", value: "name", sortable: false },
        {
          text: "Start Period",
          value: "start_date",
          sortable: false
        },
        {
          text: "End Period",
          value: "end_date",
          sortable: false
        },
        {
          text: "Scoring Template",
          value: "scoring_template.name",
          sortable: false
        },
        { text: "", value: "action", sortable: false, align: "right" }
      ],
      params: { start_date: "", end_date: "" },
      rules: [v => !!v || "This field is required"]
    };
  },
  watch: {},
  created: function() {},
  mounted: function() {
    this.getphasescoring();
  },
  methods: {
    getphasescoring: function() {
      this.tableLoad = true;
      this.axios
        .get(
          config.APIENDPOINT +
            "/programme/" +
            this.$route.params.programId +
            "/phase/" +
            this.$route.params.phaseId +
            "/scoring",
          {
            headers: auth.getAuthHeader()
          }
        )
        .then(res => {
          if (res.data.data) {
            this.phasescoring = res.data.data;
          } else {
            this.phasescoring = { total: 0, list: [] };
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.tableLoad = false;
        });
    },
    openForm: function(id, start, end) {
      this.scoringId = id;
      this.params.start_date = start;
      this.params.end_date = end;
      this.dialogForm = true;
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
      this.onsubmit = true;
      this.axios
        .put(
          config.APIENDPOINT +
            "/programme/" +
            this.programId +
            "/phase/" +
            this.phaseId +
            "/scoring/" +
            this.scoringId + "/update_period",
          this.params,
          {
            headers: auth.getAuthHeader()
          }
        )
        .then(() => {
          this.dialogForm = false;
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.onsubmit = false;
        });
    }
  }
};
</script>
<style scoped>
</style>
