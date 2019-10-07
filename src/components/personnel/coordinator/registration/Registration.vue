<template>
  <v-container>
    <!-- {{registration}} -->
    <v-btn @click="openForm" color="primary" class="ma-3">Add New Registration</v-btn>
    <v-card class="elevation-0 mb-3">
      <v-card-title>
        <div class="flex-grow-1"></div>
        <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
      </v-card-title>
      <v-layout>
        <v-flex md12>
          <v-data-table
            :search="search"
            :loading="tableLoad"
            :headers="headers"
            :items="registration.list"
            class="elevation-1"
          >
            <template v-slot:item.action="{ item }">
              <v-btn
                v-if="selectedId != item.id"
                @click="removeAct(item.id)"
                class="ma-1"
                color="warning"
              >Remove</v-btn>
              <v-expand-transition>
                <div v-if="item.id == selectedId">
                  Are You Sure to remove this Registration ?!
                  <br />
                  <v-btn color="red" class="mt-2 mb-2 mr-2" @click="removeReg(item.id)">Yes</v-btn>
                  <v-btn color="warning" class="mt-2 mb-2 mr-2" @click="selectedId = null">Cancel</v-btn>
                </div>
              </v-expand-transition>
            </template>
          </v-data-table>
        </v-flex>
      </v-layout>
    </v-card>

    <v-dialog v-model="dialogForm" persistent max-width="450">
      <v-card>
        <v-form v-model="valid" ref="form">
          <v-card-title>Add Registration</v-card-title>
          <v-card-text>
            <v-layout row wrap>
              <v-flex md12>
                <v-text-field
                  v-model="params.name"
                  label="Name"
                  hint="Registration Name"
                  :rules="rules"
                />
              </v-flex>
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
                      label="Start Date"
                      hint="Start Date"
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
                      label="End Date"
                      hint="End Date"
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
import bus from "@/bus";
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
      registration: { total: 0, list: [] },
      headers: [
        { text: "Name", value: "name", sortable: false },
        {
          text: "Start Date",
          value: "start_date",
          sortable: false
        },
        {
          text: "End Date",
          value: "end_date",
          sortable: false
        },
        { text: "", value: "action", sortable: false, align: "right" }
      ],
      params: { name: "", start_date: "", end_date: "" },
      rules: [v => !!v || "This field is required"]
    };
  },
  watch: {},
  created: function() {},
  mounted: function() {
    this.getRegistration();
  },
  methods: {
    getRegistration: function() {
      this.tableLoad = true;
      this.axios
        .get(
          config.baseUri +
            "/programme/" +
            this.$route.params.programId +
            "/registration",
          {
            headers: auth.getAuthHeader()
          }
        )
        .then(res => {
          if (res.data.data) {
            this.registration = res.data.data;
          } else {
            this.registration = { total: 0, list: [] };
          }
        })
        .catch(res => {
          bus.$emit("callNotif", "error", res);
        })
        .finally(() => {
          this.tableLoad = false;
        });
    },
    openForm: function() {
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
        .post(
          config.baseUri + "/programme/" + this.programId + "/registration/",
          this.params,
          {
            headers: auth.getAuthHeader()
          }
        )
        .then(() => {
          this.dialogForm = false;
        })
        .catch(res => {
          bus.$emit("callNotif", "error", res);
        })
        .finally(() => {
          this.onsubmit = false;
        });
    },
    removeAct: function(id) {
      if (this.selectedId == id) {
        this.selectedId = null;
      } else {
        this.selectedId = id;
      }
    },
    removeReg: function(id) {
      this.tableLoad = true;
      this.axios
        .delete(
          config.baseUri +
            "/programme/" +
            this.$route.params.programId +
            "/registration/" +
            id,
          {
            headers: auth.getAuthHeader()
          }
        )
        .then(() => {
          this.getRegistration();
        })
        .catch(res => {
          bus.$emit("callNotif", "error", res);
        })
        .finally(() => {
          this.selectedId = null;
          this.tableLoad = false;
        });
    }
  }
};
</script>
<style scoped>
</style>
