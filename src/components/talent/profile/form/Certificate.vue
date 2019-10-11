<template>
  <transition name="modal">
    <div class="modal-mask">
      <!-- <div class="modal-wrapper" @click="$emit('close')"> -->
      <div class="modal-wrapper">
        <div class="modal-container" @click.stop>
          <v-card class="pr-3 pl-3" width="400">
            <v-form ref="form" v-model="valid">
              <v-card-title>
                <template v-if="!edit">{{$vuetify.lang.t('$vuetify.action.add')}}</template>
                <template v-else>{{$vuetify.lang.t('$vuetify.action.edit')}}</template>
                <!-- {{$vuetify.lang.t('$vuetify.idea.idea')}} -->
              </v-card-title>
              <v-card-text>
                <!-- {{singleData}} -->
                <v-row>
                  <v-col md="12" cols="12">
                    <v-text-field
                      label="Name"
                      :rules="rulesRequired"
                      counter="50"
                      maxlength="50"
                      v-model="params.name"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col md="12" cols="12">
                    <v-text-field
                      label="Organizer"
                      :rules="rulesRequired"
                      counter="50"
                      maxlength="50"
                      v-model="params.organizer"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col md="12" sm="12" cols="12">
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
                          v-model="params.issued_date"
                          label="Issued Date"
                          readonly
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        ref="picker"
                        :locale="$vuetify.lang.current"
                        v-model="params.issued_date"
                        min="1950-01-01"
                        @input="menu = false"
                      ></v-date-picker>
                    </v-menu>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col md="12" sm="12" cols="12">
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
                          v-model="params.valid_until"
                          label="Valid Until"
                          readonly
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        ref="picker"
                        :locale="$vuetify.lang.current"
                        v-model="params.valid_until"
                        min="1950-01-01"
                        @input="menu = false"
                      ></v-date-picker>
                    </v-menu>
                  </v-col>
                </v-row>
              </v-card-text>
              <v-card-actions>
                <v-btn
                  v-if="!edit"
                  color="primary"
                  class="ma-1"
                  :disabled="!valid"
                  @click="submit"
                  :loading="loadBtn"
                >
                  <v-icon small left>add</v-icon>
                  {{$vuetify.lang.t('$vuetify.action.add')}}
                </v-btn>
                <v-btn
                  v-if="edit"
                  color="primary"
                  class="ma-1"
                  :disabled="!valid"
                  @click="update"
                  :loading="loadBtn"
                >
                  <v-icon small left>edit</v-icon>
                  {{$vuetify.lang.t('$vuetify.action.update')}}
                </v-btn>
                <v-fade-transition>
                  <v-btn
                    v-show="!loadBtn"
                    color="red"
                    class="ma-1"
                    @click.native="$emit('close')"
                  >{{$vuetify.lang.t('$vuetify.action.cancel')}}</v-btn>
                </v-fade-transition>
              </v-card-actions>
            </v-form>
          </v-card>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import auth from "@/config/auth";
import bus from "@/bus";
import * as config from "@/config/app.config";
import { statusMixins } from "@/mixins/statusMixins";
import { validationMixins } from "@/mixins/validationMixins";

export default {
  props: ["value", "edit", "singleData", "skillId"],
  mixins: [statusMixins, validationMixins],
  data() {
    return {
      menu: false,
      menu2: false,
      valid: false,
      loadBtn: false,
      loadForm: false,
      params: {
        name: "",
        organizer: "",
        issued_date: "",
        valid_until: ""
      }
    };
  },
  created: function() {
    if (this.edit) {
      this.getSingleData();
    }
  },
  methods: {
    getSingleData() {
      this.loadForm = true;
      this.params = this.singleData;
    },
    submit() {
      if (this.$refs.form.validate()) {
        this.addData();
      }
    },
    update() {
      if (this.$refs.form.validate()) {
        this.addData();
      }
    },
    addData() {
      this.loadBtn = true;
      if (!this.edit) {
        this.axios
          .post(
            config.baseUri + "/talent/skill/" + this.skillId + "/certificate",
            this.params,
            {
              headers: auth.getAuthHeader()
            }
          )
          .then(() => {
            this.$emit("refresh");
          })
          .catch(res => {
            bus.$emit("callNotif", "error", res);
          })
          .finally(() => {
            this.loadBtn = false;
          });
      } else {
        this.axios
          .put(
            config.baseUri + "/talent/skill/" + this.skillId + "/certificate",
            this.params,
            {
              headers: auth.getAuthHeader()
            }
          )
          .then(() => {
            this.$emit("refresh");
          })
          .catch(res => {
            bus.$emit("callNotif", "error", res);
          })
          .finally(() => {
            this.loadBtn = false;
          });
      }
    }
  }
};
</script>
<style scoped>
@import "../../../css/modal.css";
</style>