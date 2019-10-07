<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper" @click="$emit('close')">
        <div class="modal-container" @click.stop>
          <v-card class="pr-3 pl-3" :loading="loadForm" max-width="500">
            <v-form ref="form" v-model="valid">
              <v-card-title>
                <template v-if="!edit">{{$vuetify.lang.t('$vuetify.action.add')}}</template>
                <template v-else>{{$vuetify.lang.t('$vuetify.action.edit')}}</template>
                {{$vuetify.lang.t('$vuetify.idea.persona')}}
              </v-card-title>
              <v-card-text>
                <!-- {{params}} -->
                <v-layout row>
                  <v-flex md12>
                    <v-text-field label="Persona Name" :rules="rules" v-model="params.name"></v-text-field>
                  </v-flex>
                  <v-flex md12>
                    <v-textarea
                      v-model="params.description"
                      label="Description"
                      :rules="rules"
                      counter="500"
                      maxlength="500"
                    ></v-textarea>
                  </v-flex>
                  <v-flex md12 v-if="!edit">
                    <template v-for="(data, index) in personaAspect.list">
                      <field-module :fields="data" :index="index" :key="data.id" />
                    </template>
                  </v-flex>
                  <v-flex md12 v-else>
                    <template v-for="(data, index) in singleData.aspect">
                      <fieldedit-module :fields="data" :index="index" :key="data.id"></fieldedit-module>
                    </template>
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
import bus from "@/bus";

import auth from "@/config/auth";
import * as config from "@/config/app.config";

import { formMixins } from "@/mixins/formMixins";
import FieldModule from "@/components/field/field";
import FieldeditModule from "@/components/field/fieldEdit";

export default {
  props: ["value", "edit", "singleData"],
  mixins: [formMixins],
  data() {
    return {
      personaAspect: { total: 0, list: [] },
      valid: false,
      rules: [v => !!v || "Field is required"],
      loadBtn: false,
      loadForm: false,
      params: {
        name: "",
        description: "",
        aspects: []
      }
    };
  },
  components: {
    FieldModule,
    FieldeditModule
  },
  created: function() {
    bus.$on("getValue", (params, index) => {
      this.params.aspects.splice(index, 1, params);
    });

    if (this.edit) {
      this.getSingleData();
    } else {
      this.getPersonaAspect();
    }
  },
  methods: {
    getPersonaAspect() {
      this.loadForm = true;
      this.axios
        .get(config.baseUri + "/persona_aspect")
        .then(res => {
          this.personaAspect = res.data.data;
          this.setFormJSONPersona(res.data.data);
        })
        .catch(res => {
          bus.$emit("callNotif", "error", res);
        })
        .finally(() => {
          this.loadForm = false;
        });
    },
    getSingleData() {
      // this.loadForm = true;
      this.params.name = this.singleData.name;
      this.params.description = this.singleData.description;
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
              "/persona",
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
              this.$route.params.personaId,
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
@import "../../../../../css/modal.css";
</style>