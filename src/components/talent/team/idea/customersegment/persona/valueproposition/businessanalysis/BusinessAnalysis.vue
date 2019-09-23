<template>
  <v-container>
    <notification ref="notif" :err_msg2="err_msg" :status2="status" />

    <v-card>
      <v-tabs v-model="tab" background-color="sidebar" center-active show-arrows>
        <v-tabs-slider></v-tabs-slider>

        <v-tab href="#tab-vp">Value Proposition</v-tab>

        <v-tab href="#tab-leancanvas">Lean Canvas</v-tab>

        <v-tab href="#tab-bmc">Business Model Canvas</v-tab>

        <v-tab href="#tab-ms">Market Size</v-tab>

        <v-tab href="#tab-ma">Market Analysis</v-tab>

        <v-tab href="#tab-competitor">Competitor</v-tab>

        <v-tab href="#tab-valuecurve">Value Curve</v-tab>

        <v-tab href="#tab-swot">SWOT Analysis</v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item value="tab-vp">
          <v-layout>
            <v-flex md6>
              <v-card class="ma-2">
                <template v-if="loadVP">
                  <v-card-text>
                    <v-progress-circular size="70" width="7" color="primary" indeterminate></v-progress-circular>
                  </v-card-text>
                </template>
                <template v-else>
                  <v-card-title>{{$vuetify.lang.t('$vuetify.idea.valueproposition')}}</v-card-title>
                  <v-card-text style="white-space: pre-wrap;">{{parentValueproposition.description}}</v-card-text>
                </template>
              </v-card>
            </v-flex>
            <v-flex md6>
              <v-card class="ma-2">
                <template v-if="loadCS">
                  <v-card-text>
                    <v-progress-circular size="70" width="7" color="primary" indeterminate></v-progress-circular>
                  </v-card-text>
                </template>
                <template v-else>
                  <v-card-title>{{$vuetify.lang.t('$vuetify.idea.customersegment')}}</v-card-title>
                  <v-card-text>{{parentCustomersegment.name}}</v-card-text>
                  <v-card-text style="white-space: pre-wrap;">{{parentCustomersegment.description}}</v-card-text>
                </template>
              </v-card>
            </v-flex>
          </v-layout>

          <v-layout>
            <v-flex md6>
              <template v-if="loadSolution">
                <v-progress-linear indeterminate color="yellow darken-2"></v-progress-linear>
              </template>
              <v-layout v-else>
                <v-flex>
                  <div class="lt-grid-container">
                    <div class="lt-Gain">
                      <v-card flat>
                        <template v-if="dataSolution.fields.length != 0">
                          <v-card-title>{{dataSolution.fields[0].field_template.name}}</v-card-title>
                          <v-card-text
                            style="white-space: pre-wrap;"
                          >{{dataSolution.fields[0].value}}</v-card-text>
                        </template>
                      </v-card>
                    </div>
                    <div class="lt-Pain">
                      <v-card flat>
                        <template v-if="dataSolution.fields.length != 0">
                          <v-card-title>{{dataSolution.fields[1].field_template.name}}</v-card-title>
                        </template>
                        <v-card-text style="white-space: pre-wrap;">{{dataSolution.fields[1].value}}</v-card-text>
                      </v-card>
                    </div>
                    <div class="lt-Goal">
                      <v-card flat>
                        <template v-if="dataSolution.fields.length != 0">
                          <v-card-title>{{dataSolution.fields[2].field_template.name}}</v-card-title>
                        </template>
                        <v-card-text style="white-space: pre-wrap;">{{dataSolution.fields[2].value}}</v-card-text>
                      </v-card>
                    </div>
                  </div>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex md6>
              <v-card flat class="ma-2">
                <v-expansion-panels mandatory popout>
                  <v-expansion-panel>
                    <v-expansion-panel-header>{{$vuetify.lang.t('$vuetify.idea.persona')}}</v-expansion-panel-header>
                    <template v-if="loadPersona">
                      <v-progress-linear indeterminate color="yellow darken-2"></v-progress-linear>
                    </template>
                    <v-expansion-panel-content v-else>
                      <v-list>
                        <template v-if="parentPersona.aspect.length != 0">
                          <v-list-item
                            v-for="aspect in parentPersona.aspect.slice(0,3)"
                            :key="aspect.id"
                          >
                            <v-list-item-content>
                              <v-list-item-title>{{aspect.field_template.name}}</v-list-item-title>
                              <v-list-item-subtitle style="white-space: pre-wrap;">{{aspect.value}}</v-list-item-subtitle>
                            </v-list-item-content>
                          </v-list-item>
                        </template>
                      </v-list>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                  <v-expansion-panel>
                    <v-expansion-panel-header>Pain & Gain</v-expansion-panel-header>
                    <template v-if="loadPersona">
                      <v-progress-linear indeterminate color="yellow darken-2"></v-progress-linear>
                    </template>
                    <v-expansion-panel-content v-else>
                      <v-layout>
                        <v-flex>
                          <div class="lt-grid-container">
                            <div class="lt-Gain">
                              <v-card>
                                <template v-if="parentPersona.aspect.length != 0">
                                  <v-card-title>{{parentPersona.aspect[6].field_template.name}}</v-card-title>
                                  <v-card-text
                                    style="white-space: pre-wrap;"
                                  >{{parentPersona.aspect[6].value}}</v-card-text>
                                </template>
                              </v-card>
                            </div>
                            <div class="lt-Pain">
                              <v-card>
                                <template v-if="parentPersona.aspect.length != 0">
                                  <v-card-title>{{parentPersona.aspect[4].field_template.name}}</v-card-title>
                                  <v-card-text
                                    style="white-space: pre-wrap;"
                                  >{{parentPersona.aspect[4].value}}</v-card-text>
                                </template>
                              </v-card>
                            </div>
                            <div class="lt-Goal">
                              <v-card>
                                <template v-if="parentPersona.aspect.length != 0">
                                  <v-card-title>{{parentPersona.aspect[5].field_template.name}}</v-card-title>
                                  <v-card-text
                                    style="white-space: pre-wrap;"
                                  >{{parentPersona.aspect[5].value}}</v-card-text>
                                </template>
                              </v-card>
                            </div>
                          </div>
                        </v-flex>
                      </v-layout>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
              </v-card>
            </v-flex>
          </v-layout>
        </v-tab-item>
        <v-tab-item value="tab-leancanvas">
          <v-layout>
            <v-flex>
              <div class="lean-grid-container">
                <div class="lean-Problem">
                  <v-card>
                    <template v-if="loadLean">
                      <v-card-text>
                        <v-progress-circular size="70" width="7" color="primary" indeterminate></v-progress-circular>
                      </v-card-text>
                    </template>
                    <template v-else>
                      <template v-if="dataLean.fields.length != 0">
                        <v-card-title>Problem</v-card-title>
                        <v-card-text>{{dataLean.fields[0].value}}</v-card-text>
                      </template>
                    </template>
                  </v-card>
                </div>
                <div class="lean-Solution">
                  <v-card>
                    <template v-if="loadSolution">
                      <v-card-text>
                        <v-progress-circular size="70" width="7" color="primary" indeterminate></v-progress-circular>
                      </v-card-text>
                    </template>
                    <template v-else>
                      <template v-if="dataSolution.fields.length != 0">
                        <v-card-title>{{dataSolution.fields[0].field_template.name}}</v-card-title>
                        <v-card-text>{{dataSolution.fields[0].value}}</v-card-text>
                      </template>
                    </template>
                  </v-card>
                </div>
                <div class="lean-metrics">
                  <v-card>
                    <template v-if="dataLean.fields.length != 0">
                      <v-card-title>Metrics</v-card-title>
                      <v-card-text>{{dataLean.fields[2].value}}</v-card-text>
                    </template>
                  </v-card>
                </div>
                <div class="lean-vp">
                  <v-card>
                    <template v-if="loadVP">
                      <v-card-text>
                        <v-progress-circular size="70" width="7" color="primary" indeterminate></v-progress-circular>
                      </v-card-text>
                    </template>
                    <template v-else>
                      <v-card-title>Value Proposition</v-card-title>
                      <v-card-text>{{parentValueproposition.description}}</v-card-text>
                    </template>
                  </v-card>
                </div>
                <div class="lean-unfair">
                  <v-card>
                    <template v-if="loadLean">
                      <v-card-text>
                        <v-progress-circular size="70" width="7" color="primary" indeterminate></v-progress-circular>
                      </v-card-text>
                    </template>
                    <template v-else>
                      <template v-if="dataLean.fields.length != 0">
                        <v-card-title>Unfair</v-card-title>
                        <v-card-text>{{dataLean.fields[1].value}}</v-card-text>
                      </template>
                    </template>
                  </v-card>
                </div>
                <div class="lean-channel">
                  <v-card>
                    <template v-if="dataLean.fields.length != 0">
                      <v-card-title>Channel</v-card-title>
                      <v-card-text>{{dataLean.fields[3].value}}</v-card-text>
                    </template>
                  </v-card>
                </div>
                <div class="lean-customersegment">
                  <v-card>
                    <v-card-title>Customer Segment</v-card-title>
                    <v-card-text>{{parentCustomersegment.name}}</v-card-text>
                    <v-card-text>{{parentCustomersegment.description}}</v-card-text>
                  </v-card>
                </div>
                <div class="lean-cost">
                  <v-card>
                    <template v-if="loadLean">
                      <v-card-text>
                        <v-progress-circular size="70" width="7" color="primary" indeterminate></v-progress-circular>
                      </v-card-text>
                    </template>
                    <template v-else>
                      <template v-if="dataLean.fields.length != 0">
                        <v-card-title>Cost Structure</v-card-title>
                        <v-card-text>{{dataLean.fields[4].value}}</v-card-text>
                      </template>
                    </template>
                  </v-card>
                </div>
                <div class="lean-revenue">
                  <v-card>
                    <template v-if="loadLean">
                      <v-card-text>
                        <v-progress-circular size="70" width="7" color="primary" indeterminate></v-progress-circular>
                      </v-card-text>
                    </template>
                    <template v-else>
                      <template v-if="dataLean.fields.length != 0">
                        <v-card-title>Revenue Stream</v-card-title>
                        <v-card-text>{{dataLean.fields[5].value}}</v-card-text>
                      </template>
                    </template>
                  </v-card>
                </div>
              </div>
            </v-flex>
          </v-layout>
        </v-tab-item>
        <v-tab-item value="tab-bmc">
          <v-layout>
            <!-- {{dataBMC}} -->
            <v-flex>
              <div class="lean-grid-container">
                <div class="lean-Problem">
                  <v-card>
                    <template v-if="loadBMC">
                      <v-card-text>
                        <v-progress-circular size="70" width="7" color="primary" indeterminate></v-progress-circular>
                      </v-card-text>
                    </template>
                    <template v-else>
                      <template v-if="dataBMC.fields.length != 0">
                        <v-card-title>Key Partner</v-card-title>
                        <v-card-text>{{dataBMC.fields[0].value}}</v-card-text>
                      </template>
                    </template>
                  </v-card>
                </div>
                <div class="lean-Solution">
                  <v-card>
                    <template v-if="loadBMC">
                      <v-card-text>
                        <v-progress-circular size="70" width="7" color="primary" indeterminate></v-progress-circular>
                      </v-card-text>
                    </template>
                    <template v-else>
                      <template v-if="dataBMC.fields.length != 0">
                        <v-card-title>Key Activities</v-card-title>
                        <v-card-text>{{dataBMC.fields[1].value}}</v-card-text>
                      </template>
                    </template>
                  </v-card>
                </div>
                <div class="lean-metrics">
                  <v-card>
                    <template v-if="dataBMC.fields.length != 0">
                      <v-card-title>Key Resource</v-card-title>
                      <v-card-text>{{dataBMC.fields[2].value}}</v-card-text>
                    </template>
                  </v-card>
                </div>
                <div class="lean-vp">
                  <v-card>
                    <template v-if="loadVP">
                      <v-card-text>
                        <v-progress-circular size="70" width="7" color="primary" indeterminate></v-progress-circular>
                      </v-card-text>
                    </template>
                    <template v-else>
                      <v-card-title>Value Proposition</v-card-title>
                      <v-card-text>{{parentValueproposition.description}}</v-card-text>
                    </template>
                  </v-card>
                </div>
                <div class="lean-unfair">
                  <v-card>
                    <template v-if="loadBMC">
                      <v-card-text>
                        <v-progress-circular size="70" width="7" color="primary" indeterminate></v-progress-circular>
                      </v-card-text>
                    </template>
                    <template v-else>
                      <template v-if="dataBMC.fields.length != 0">
                        <v-card-title>Relationship</v-card-title>
                        <v-card-text>{{dataBMC.fields[3].value}}</v-card-text>
                      </template>
                    </template>
                  </v-card>
                </div>
                <div class="lean-channel">
                  <v-card>
                    <template v-if="dataBMC.fields.length != 0">
                      <v-card-title>Channel</v-card-title>
                      <v-card-text>{{dataBMC.fields[4].value}}</v-card-text>
                    </template>
                  </v-card>
                </div>
                <div class="lean-customersegment">
                  <v-card>
                    <v-card-title>Customer Segment</v-card-title>
                    <v-card-text>{{parentCustomersegment.name}}</v-card-text>
                    <v-card-text>{{parentCustomersegment.description}}</v-card-text>
                  </v-card>
                </div>
                <div class="lean-cost">
                  <v-card>
                    <template v-if="loadBMC">
                      <v-card-text>
                        <v-progress-circular size="70" width="7" color="primary" indeterminate></v-progress-circular>
                      </v-card-text>
                    </template>
                    <template v-else>
                      <template v-if="dataBMC.fields.length != 0">
                        <v-card-title>Cost Structure</v-card-title>
                        <v-card-text>{{dataBMC.fields[5].value}}</v-card-text>
                      </template>
                    </template>
                  </v-card>
                </div>
                <div class="lean-revenue">
                  <v-card>
                    <template v-if="loadBMC">
                      <v-card-text>
                        <v-progress-circular size="70" width="7" color="primary" indeterminate></v-progress-circular>
                      </v-card-text>
                    </template>
                    <template v-else>
                      <template v-if="dataBMC.fields.length != 0">
                        <v-card-title>Revenue Stream</v-card-title>
                        <v-card-text>{{dataBMC.fields[6].value}}</v-card-text>
                      </template>
                    </template>
                  </v-card>
                </div>
              </div>
            </v-flex>
          </v-layout>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </v-container>
</template>
<script>
import auth from "@/config/auth";
import * as config from "@/config/app.config";
import { notifMixins } from "@/mixins/notifMixins";

export default {
  mixins: [notifMixins],
  data() {
    return {
      tab: null,
      parentValueproposition: { name: "", description: "" },
      loadVP: false,
      parentCustomersegment: { name: "", description: "" },
      loadCS: false,
      parentPersona: {
        aspect: []
      },
      loadPersona: false,
      dataSolution: {
        fields: []
      },
      loadSolution: false,
      dataLean: {
        fields: []
      },
      loadLean: false,
      dataBMC: {
        fields: []
      },
      loadBMC: false
    };
  },
  mounted() {
    this.getValueProposition();
    this.getCustomersegment();
    this.getPersona();
    this.getSolutionCanvas();
    this.getLeanCanvas();
    this.getBMC();
  },
  methods: {
    getValueProposition() {
      this.loadVP = true;
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
            this.$route.params.valuepropositionId,
          { headers: auth.getAuthHeader() }
        )
        .then(res => {
          this.parentValueproposition = res.data.data;
        })
        .catch(res => {
          this.showError(res);
        })
        .finally(() => {
          this.loadVP = false;
        });
    },
    getPersona() {
      this.loadPersona = true;
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
            this.$route.params.personaId,
          { headers: auth.getAuthHeader() }
        )
        .then(res => {
          this.parentPersona = res.data.data;
        })
        .catch(res => {
          this.showError(res);
        })
        .finally(() => {
          this.loadPersona = false;
        });
    },
    getCustomersegment() {
      this.loadCS = true;
      this.axios
        .get(
          config.baseUri +
            "/team/" +
            this.$route.params.teamId +
            "/idea/" +
            this.$route.params.ideaId +
            "/customer_segment/" +
            this.$route.params.customersegmentId,
          { headers: auth.getAuthHeader() }
        )
        .then(res => {
          this.parentCustomersegment = res.data.data;
        })
        .catch(res => {
          this.showError(res);
        })
        .finally(() => {
          this.loadCS = false;
        });
    },
    getSolutionCanvas() {
      var canvasname = "Solution";
      this.loadSolution = true;
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
            "/business_structure/template_name/" +
            encodeURI(canvasname),
          { headers: auth.getAuthHeader() }
        )
        .then(res => {
          this.dataSolution = res.data.data;
        })
        .catch(res => {
          this.showError(res);
        })
        .finally(() => {
          this.loadSolution = false;
        });
    },
    getLeanCanvas() {
      var canvasname = "Lean Canvas";
      this.loadLean = true;
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
            "/business_structure/template_name/" +
            encodeURI(canvasname),
          { headers: auth.getAuthHeader() }
        )
        .then(res => {
          this.dataLean = res.data.data;
        })
        .catch(res => {
          this.showError(res);
        })
        .finally(() => {
          this.loadLean = false;
        });
    },
    getBMC() {
      var canvasname = "Business Model Canvas";
      this.loadBMC = true;
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
            "/business_structure/template_name/" +
            encodeURI(canvasname),
          { headers: auth.getAuthHeader() }
        )
        .then(res => {
          this.dataBMC = res.data.data;
        })
        .catch(res => {
          this.showError(res);
        })
        .finally(() => {
          this.loadBMC = false;
        });
    }
  }
};
</script>
<style scoped>
.lt-grid-container {
  display: grid;
  /* grid-template-columns: 1fr 1fr; */
  grid-template-columns: repeat(auto-fit, 50%);
  grid-template-rows: 1fr 1fr;
  grid-column-gap: 5px;
  grid-row-gap: 5px;
}

.lt-Gain {
  grid-area: 1 / 1 / 2 / 2;
}

.lt-Pain {
  grid-area: 2 / 1 / 3 / 2;
}

.lt-Goal {
  grid-area: 1 / 2 / 3 / 3;
}

.lean-grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  grid-column-gap: 5px;
  grid-row-gap: 5px;
}

.lean-problem {
  grid-area: 1 / 1 / 3 / 2;
}

.lean-solution {
  grid-area: 1 / 2 / 2 / 3;
}

.lean-metrics {
  grid-area: 2 / 2 / 3 / 3;
}

.lean-vp {
  grid-area: 1 / 3 / 3 / 5;
}

.lean-unfair {
  grid-area: 1 / 5 / 2 / 6;
}

.lean-channel {
  grid-area: 2 / 5 / 3 / 6;
}

.lean-customersegment {
  grid-area: 1 / 6 / 3 / 7;
}

.lean-cost {
  grid-area: 3 / 1 / 4 / 4;
}

.lean-revenue {
  grid-area: 3 / 4 / 4 / 7;
}
</style>