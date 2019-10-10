<template>
  <transition name="modal">
    <div class="modal-mask">
      <!-- <div class="modal-wrapper" @click="$emit('close')"> -->
      <div class="modal-wrapper">
        <div class="modal-container" @click.stop>
          <v-card class="pr-3 pl-3">
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
                  <v-col md="6" sm="12" cols="12">
                    <v-text-field
                      v-model="params.start_year"
                      label="Start Year"
                      :rules="rulesYear"
                      maxlength="4"
                    ></v-text-field>
                  </v-col>
                  <v-col md="6" sm="12" cols="12">
                    <v-text-field
                      v-model="params.end_year"
                      label="End Year"
                      :rules="rulesYear"
                      maxlength="4"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col md="12" sm="12" cols="12">
                    <v-text-field
                      v-model="params.position"
                      label="Position"
                      counter="50"
                      maxlength="50"
                    ></v-text-field>
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
  props: ["value", "edit", "singleData"],
  mixins: [statusMixins, validationMixins],
  data() {
    return {
      valid: false,
      loadBtn: false,
      loadForm: false,
      params: {
        name: "",
        position: "",
        start_year: "",
        end_year: ""
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
          .post(config.baseUri + "/talent/organization", this.params, {
            headers: auth.getAuthHeader()
          })
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
          .put(config.baseUri + "/talent/organization", this.params, {
            headers: auth.getAuthHeader()
          })
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