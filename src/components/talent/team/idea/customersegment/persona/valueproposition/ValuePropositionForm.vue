<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper" @click="$emit('close')">
        <div class="modal-container" @click.stop>
          <v-card class="pr-3 pl-3" width="500">
            <v-form ref="form" v-model="valid">
              <v-card-title>
                <template v-if="!edit">{{$vuetify.lang.t('$vuetify.action.add')}}</template>
                <template v-else>{{$vuetify.lang.t('$vuetify.action.edit')}}</template>
                {{$vuetify.lang.t('$vuetify.idea.valueproposition')}}
              </v-card-title>
              <v-card-text>
                <!-- {{singleData}} -->
                <v-layout row>
                  <v-flex md12>
                    <v-textarea
                      v-model="params.description"
                      label="Description"
                      :rules="rules"
                      rows="5"
                      counter="500"
                      maxlength="500"
                    ></v-textarea>
                  </v-flex>
                </v-layout>
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

export default {
  props: ["value", "edit", "singleData"],
  mixins: [statusMixins],
  data() {
    return {
      valid: false,
      rules: [v => !!v || "Field is required"],
      loadBtn: false,
      loadForm: false,
      params: {
        description: ""
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
      // this.loadForm = true;
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

            this.params,
            { headers: auth.getAuthHeader() }
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
              this.$route.params.valuepropositionId,
            this.params,
            { headers: auth.getAuthHeader() }
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
@import "../../../../../../css/modal.css";
</style>