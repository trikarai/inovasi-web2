<template>
  <v-dialog :value="value" persistent @input="$emit('input')" width="400">
    <notification :err_msg2="err_msg" :status2="status" />

    <v-card class="pr-3 pl-3">
      <v-form ref="form" v-model="valid">
        <v-card-title>{{value}}</v-card-title>
        <v-card-text>
          <v-layout row>
            <v-flex md12>
              <v-text-field label="Idea Name" :rules="rules" v-model="params.name"></v-text-field>
            </v-flex>
            <v-flex md12>
              <v-textarea
                v-model="params.description"
                label="Elevator Pitch"
                :rules="rules"
                counter="250"
                maxlength="250"
              ></v-textarea>
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" class="ma-1" :disabled="!valid" @click="submit" :loading="loadBtn">
            <v-icon small left>add</v-icon>
            {{$vuetify.lang.t('$vuetify.action.add')}}
          </v-btn>
          <v-fade-transition>
            <v-btn
              v-show="!loadBtn"
              color="red"
              class="ma-1"
              @click.native="$emit('input')"
            >{{$vuetify.lang.t('$vuetify.action.cancel')}}</v-btn>
          </v-fade-transition>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>
<script>
import auth from "@/config/auth";
import * as config from "@/config/app.config";
import { statusMixins } from "@/mixins/statusMixins";
import { notifMixins } from "@/mixins/notifMixins";

export default {
  props: ["value", "edit"],
  mixins: [statusMixins, notifMixins],

  data() {
    return {
      valid: false,
      rules: [v => !!v || "Field is required"],
      loadBtn: false,
      params: {
        name: "",
        description: "",
        target_customer: "-",
        problem_confront: "-",
        value_proposed: "-",
        revenue_model: "-"
      }
    };
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.addData();
      }
    },
    addData() {
      this.loadBtn = true;
      this.axios
        .post(
          config.baseUri + "/team/" + this.$route.params.teamId + "/idea",
          this.params,
          { headers: auth.getAuthHeader() }
        )
        .then(() => {
          this.$emit("input");
        })
        .catch(error => {
          this.showError(error);
        })
        .finally(() => {
          this.loadBtn = false;
        });
    }
  }
};
</script>
<style scoped>
</style>