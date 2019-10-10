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
                    <v-select
                      :loading="loadTrack"
                      :items="itemTrack.list"
                      item-text="name"
                      item-value="id"
                      v-model="params.track_id"
                      label="Track Category"
                      :rules="rulesRequired"
                    ></v-select>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col md="12" cols="12">
                    <v-select
                      :loading="loadSkill"
                      :disabled="itemTrack.total == 0"
                      :items="itemSkill.list"
                      item-text="name"
                      item-value="id"
                      v-model="params.skill_reference_id"
                      label="Skill Reference"
                      :rules="rulesRequired"
                    ></v-select>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col md="12" cols="12">
                    <v-rating v-model="params.score"></v-rating>
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
      itemTrack: { total: 0, list: [] },
      itemSkill: { total: 0, list: [] },
      params: {
        track_id: "",
        skill_reference_id: "",
        score: ""
      },
      loadTrack: false,
      loadSkill: false
    };
  },
  watch: {
    "params.track_id": "getSkill"
  },
  mounted: function() {
    if (this.edit) {
      this.getSingleData();
    } else {
      this.getTrack();
    }
  },
  methods: {
    getTrack() {
      this.loadTrack = true;
      this.axios
        .get(config.baseUri + "/track", this.params, {
          headers: auth.getAuthHeader()
        })
        .then(res => {
          if (res.data.data) {
            this.itemTrack = res.data.data;
          } else {
            this.itemTrack = { total: 0, list: [] };
          }
        })
        .catch(res => {
          // bus.$emit("callNotif", "error", res);
        })
        .finally(() => {
          this.loadTrack = false;
        });
    },
    getSkill() {
      this.loadSkill = true;
      this.axios
        .get(
          config.baseUri +
            "/track/" +
            this.params.track_id +
            "/skill_reference",
          this.params,
          {
            headers: auth.getAuthHeader()
          }
        )
        .then(res => {
          if (res.data.data) {
            this.itemSkill = res.data.data;
          } else {
            this.itemSkill = { total: 0, list: [] };
          }
        })
        .catch(res => {
          // bus.$emit("callNotif", "error", res);
        })
        .finally(() => {
          this.loadSkill = false;
        });
    },
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
          .post(config.baseUri + "/talent/skill", this.params, {
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
          .put(config.baseUri + "/talent/skill", this.params, {
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