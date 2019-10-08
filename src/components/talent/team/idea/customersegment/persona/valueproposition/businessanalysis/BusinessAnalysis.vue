<template>
  <v-container>
    <v-card>
      <v-tabs v-model="tab" background-color="sidebar" center-active show-arrows>
        <v-tabs-slider></v-tabs-slider>

        <v-tab href="#tab-vp">Value Proposition</v-tab>

        <v-tab href="#tab-leancanvas">Lean Canvas</v-tab>

        <v-tab href="#tab-bmc">Business Model Canvas</v-tab>

        <v-tab href="#tab-ms">Market Size</v-tab>

        <v-tab href="#tab-ma">Market Analysis</v-tab>

        <!-- <v-tab href="#tab-competitor">Competitor</v-tab> -->

        <v-tab href="#tab-valuecurve">Value Curve</v-tab>

        <v-tab href="#tab-swot">SWOT Analysis</v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item value="tab-vp">
          <v-layout>
            <v-flex md6>
              <v-card class="ma-1">
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
              <v-card class="ma-1">
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
                <v-progress-linear class="ma-2" indeterminate color="yellow darken-2"></v-progress-linear>
              </template>
              <template v-if="!loadSolution">
                <template v-if="dataSolution.fields.length == 0">
                  <v-btn
                    @click="openBsForm('1dbe1d6c-04cc-4c5a-9d22-46e97c9ffc69', 'Solution')"
                    class="ma-2"
                    color="primary"
                  >
                    <v-icon>add</v-icon>Add Solution
                  </v-btn>
                </template>
                <template v-else>
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
                          <v-card-text
                            style="white-space: pre-wrap;"
                          >{{dataSolution.fields[1].value}}</v-card-text>
                        </v-card>
                      </div>
                      <div class="lt-Goal">
                        <v-card flat>
                          <template v-if="dataSolution.fields.length != 0">
                            <v-card-title>{{dataSolution.fields[2].field_template.name}}</v-card-title>
                          </template>
                          <v-card-text
                            style="white-space: pre-wrap;"
                          >{{dataSolution.fields[2].value}}</v-card-text>
                        </v-card>
                      </div>
                    </div>
                  </v-flex>
                  <v-flex>
                    <v-card flat>
                      <v-card-actions>
                        <!-- <div class="flex-grow-1"></div> -->
                        <v-btn
                          :loading="loadDelete"
                          @click="deleteBS(dataSolution.id, 'Solution')"
                          small
                          class="ma-1"
                          color="warning"
                        >
                          <v-icon>delete</v-icon>
                        </v-btn>
                        <v-btn
                          @click="editBsForm(dataSolution, 'Solution')"
                          small
                          class="ma-1"
                          color="primary"
                        >
                          <v-icon>edit</v-icon>
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-flex>
                </template>
              </template>
            </v-flex>

            <v-flex md6>
              <v-card flat class="ma-1">
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
            <v-flex v-if="dataLean.fields.length == 0 ">
              <v-btn
                color="primary"
                class="ma-3"
                @click="openBsForm('51b8c9f3-dd4b-47f0-ab9d-cd23f416e8d9', 'Lean Canvas')"
              >
                <v-icon>add</v-icon>Add Lean Canvas
              </v-btn>
            </v-flex>
            <v-flex v-else>
              <div class="lean-grid-container">
                <div class="lean-Problem">
                  <v-card class="ma-1">
                    <template v-if="loadLean">
                      <v-card-text>
                        <v-progress-circular size="70" width="7" color="primary" indeterminate></v-progress-circular>
                      </v-card-text>
                    </template>
                    <template v-else>
                      <v-card-title>Problem</v-card-title>
                      <v-card-text style="white-space: pre-wrap;">{{dataLean.fields[0].value}}</v-card-text>
                    </template>
                  </v-card>
                </div>
                <div class="lean-Solution">
                  <v-card class="ma-1">
                    <template v-if="loadSolution">
                      <v-card-text>
                        <v-progress-circular size="70" width="7" color="primary" indeterminate></v-progress-circular>
                      </v-card-text>
                    </template>
                    <template v-else>
                      <template v-if="dataSolution.fields.length != 0">
                        <v-card-title>{{dataSolution.fields[0].field_template.name}}</v-card-title>
                        <v-card-text style="white-space: pre-wrap;">{{dataSolution.fields[0].value}}</v-card-text>
                      </template>
                      <template v-else>
                        <v-card-text style="white-space: pre-wrap;">No Solution Data Found</v-card-text>
                      </template>
                    </template>
                  </v-card>
                </div>
                <div class="lean-metrics">
                  <v-card class="ma-1">
                    <template v-if="loadLean">
                      <v-card-text>
                        <v-progress-circular size="70" width="7" color="primary" indeterminate></v-progress-circular>
                      </v-card-text>
                    </template>
                    <template v-else>
                      <v-card-title>Metrics</v-card-title>
                      <v-card-text style="white-space: pre-wrap;">{{dataLean.fields[2].value}}</v-card-text>
                    </template>
                  </v-card>
                </div>
                <div class="lean-vp">
                  <v-card class="ma-1">
                    <template v-if="loadVP">
                      <v-card-text>
                        <v-progress-circular size="70" width="7" color="primary" indeterminate></v-progress-circular>
                      </v-card-text>
                    </template>
                    <template v-else>
                      <v-card-title>Value Proposition</v-card-title>
                      <v-card-text
                        style="white-space: pre-wrap;"
                      >{{parentValueproposition.description}}</v-card-text>
                    </template>
                  </v-card>
                </div>
                <div class="lean-unfair">
                  <v-card class="ma-1">
                    <template v-if="loadLean">
                      <v-card-text>
                        <v-progress-circular size="70" width="7" color="primary" indeterminate></v-progress-circular>
                      </v-card-text>
                    </template>
                    <template v-else>
                      <v-card-title>Unfair</v-card-title>
                      <v-card-text style="white-space: pre-wrap;">{{dataLean.fields[1].value}}</v-card-text>
                    </template>
                  </v-card>
                </div>
                <div class="lean-channel">
                  <v-card class="ma-1">
                    <v-card-title>Channel</v-card-title>
                    <v-card-text style="white-space: pre-wrap;">{{dataLean.fields[3].value}}</v-card-text>
                  </v-card>
                </div>
                <div class="lean-customersegment">
                  <v-card class="ma-1">
                    <v-card-title>Customer Segment</v-card-title>
                    <v-card-text>{{parentCustomersegment.name}}</v-card-text>
                    <v-card-text
                      style="white-space: pre-wrap;"
                    >{{parentCustomersegment.description}}</v-card-text>
                  </v-card>
                </div>
                <div class="lean-cost">
                  <v-card class="ma-1">
                    <template v-if="loadLean">
                      <v-card-text>
                        <v-progress-circular size="70" width="7" color="primary" indeterminate></v-progress-circular>
                      </v-card-text>
                    </template>
                    <template v-else>
                      <v-card-title>Cost Structure</v-card-title>
                      <v-card-text style="white-space: pre-wrap;">{{dataLean.fields[4].value}}</v-card-text>
                    </template>
                  </v-card>
                </div>
                <div class="lean-revenue">
                  <v-card class="ma-1">
                    <template v-if="loadLean">
                      <v-card-text>
                        <v-progress-circular size="70" width="7" color="primary" indeterminate></v-progress-circular>
                      </v-card-text>
                    </template>
                    <template v-else>
                      <v-card-title>Revenue Stream</v-card-title>
                      <v-card-text style="white-space: pre-wrap;">{{dataLean.fields[5].value}}</v-card-text>
                    </template>
                  </v-card>
                </div>
              </div>
            </v-flex>
            <v-card flat>
              <v-card-actions>
                <!-- <div class="flex-grow-1"></div> -->
                <v-btn
                  :loading="loadDelete"
                  @click="deleteBS(dataLean.id, 'Lean Canvas')"
                  small
                  class="ma-1"
                  color="warning"
                >
                  <v-icon>delete</v-icon>
                </v-btn>
                <v-btn
                  @click="editBsForm(dataLean, 'Lean Canvas')"
                  small
                  class="ma-1"
                  color="primary"
                >
                  <v-icon>edit</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-layout>
        </v-tab-item>

        <v-tab-item value="tab-bmc">
          <template v-if="loadBMC">
            <v-card>
              <v-card-text>
                <v-progress-circular size="70" width="7" color="primary" indeterminate></v-progress-circular>
              </v-card-text>
            </v-card>
          </template>
          <v-layout v-else>
            <!-- {{dataBMC}} -->
            <v-flex v-if="dataBMC.fields.length == 0">
              <v-btn
                color="primary"
                class="ma-3"
                @click="openBsForm('947500a2-4fe1-4891-acca-a5e1f5e088a3', 'Business Model Canvas')"
              >
                <v-icon>add</v-icon>Add Business Model Canvas
              </v-btn>
            </v-flex>
            <v-flex v-else>
              <div class="lean-grid-container">
                <div class="lean-Problem">
                  <v-card>
                    <template v-if="loadBMC">
                      <v-card-text>
                        <v-progress-circular size="70" width="7" color="primary" indeterminate></v-progress-circular>
                      </v-card-text>
                    </template>
                    <template v-else>
                      <v-card-title>Key Partner</v-card-title>
                      <v-card-text style="white-space: pre-wrap;">{{dataBMC.fields[0].value}}</v-card-text>
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
                      <v-card-title>Key Activities</v-card-title>
                      <v-card-text style="white-space: pre-wrap;">{{dataBMC.fields[1].value}}</v-card-text>
                    </template>
                  </v-card>
                </div>
                <div class="lean-metrics">
                  <v-card>
                    <v-card-title>Key Resource</v-card-title>
                    <v-card-text style="white-space: pre-wrap;">{{dataBMC.fields[2].value}}</v-card-text>
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
                      <v-card-text
                        style="white-space: pre-wrap;"
                      >{{parentValueproposition.description}}</v-card-text>
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
                      <v-card-title>Relationship</v-card-title>
                      <v-card-text style="white-space: pre-wrap;">{{dataBMC.fields[3].value}}</v-card-text>
                    </template>
                  </v-card>
                </div>
                <div class="lean-channel">
                  <v-card>
                    <v-card-title>Channel</v-card-title>
                    <v-card-text style="white-space: pre-wrap;">{{dataBMC.fields[4].value}}</v-card-text>
                  </v-card>
                </div>
                <div class="lean-customersegment">
                  <v-card>
                    <v-card-title>Customer Segment</v-card-title>
                    <v-card-text>{{parentCustomersegment.name}}</v-card-text>
                    <v-card-text
                      style="white-space: pre-wrap;"
                    >{{parentCustomersegment.description}}</v-card-text>
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
                      <v-card-title>Cost Structure</v-card-title>
                      <v-card-text style="white-space: pre-wrap;">{{dataBMC.fields[5].value}}</v-card-text>
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
                      <v-card-title>Revenue Stream</v-card-title>
                      <v-card-text style="white-space: pre-wrap;">{{dataBMC.fields[6].value}}</v-card-text>
                    </template>
                  </v-card>
                </div>
              </div>
            </v-flex>
            <v-card flat>
              <v-card-actions>
                <!-- <div class="flex-grow-1"></div> -->
                <v-btn
                  :loading="loadDelete"
                  @click="deleteBS(dataBMC.id, 'Business Model Canvas')"
                  small
                  class="ma-1"
                  color="warning"
                >
                  <v-icon>delete</v-icon>
                </v-btn>
                <v-btn
                  @click="editBsForm(dataBMC, 'Business Model Canvas')"
                  small
                  class="ma-1"
                  color="primary"
                >
                  <v-icon>edit</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-layout>
        </v-tab-item>

        <v-tab-item value="tab-ms">
          <template v-if="loadMS">
            <v-card>
              <v-card-text>
                <v-progress-circular size="70" width="7" color="primary" indeterminate></v-progress-circular>
              </v-card-text>
            </v-card>
          </template>
          <v-layout v-else>
            <v-flex md12 v-if="dataMS.fields.length == 0">
              <v-btn
                color="primary"
                class="ma-3"
                @click="openBsForm('7b80797b-10c8-4a96-9235-196707ddcd87', 'Market Size')"
              >
                <v-icon>add</v-icon>Add Market Size
              </v-btn>
            </v-flex>
            <v-flex md12 v-else>
              <!-- {{dataMS}} -->
              <v-list v-for="field in dataMS.fields" :key="field.id">
                <v-list-item three-line>
                  <v-list-item-content>
                    <v-list-item-subtitle>{{field.field_template.name}}</v-list-item-subtitle>
                    <v-list-item-title>{{field.value}}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-flex>
            <v-flex md12 v-if="dataMS.fields.length != 0">
              <v-card flat class="elevation-0">
                <v-card-actions>
                  <!-- <div class="flex-grow-1"></div> -->
                  <v-btn
                    :loading="loadDelete"
                    @click="deleteBS(dataMS.id, 'Market Size')"
                    small
                    class="ma-1"
                    color="warning"
                  >
                    <v-icon>delete</v-icon>
                  </v-btn>
                  <v-btn
                    @click="editBsForm(dataMS, 'Marke Size')"
                    small
                    class="ma-1"
                    color="primary"
                  >
                    <v-icon>edit</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </v-tab-item>

        <v-tab-item value="tab-ma">
          <template v-if="loadMA">
            <v-card>
              <v-card-text>
                <v-progress-circular size="70" width="7" color="primary" indeterminate></v-progress-circular>
              </v-card-text>
            </v-card>
          </template>
          <v-layout v-else>
            <v-flex v-if="dataMA.fields.length == 0">
              <v-btn
                color="primary"
                class="ma-3"
                @click="openBsForm('d15cb7bc-c85d-4883-bd5f-7b109fb6df2d', 'Market Analysis')"
              >
                <v-icon>add</v-icon>Add Market Analysis
              </v-btn>
            </v-flex>
            <v-flex v-else>
              <!-- {{dataMA}} -->
              <v-list v-for="field in dataMA.fields" :key="field.id">
                <v-list-item three-line >
                  <v-list-item-content>
                    <v-list-item-subtitle>{{field.field_template.name}}</v-list-item-subtitle>
                    <v-list-item-title>{{field.value}}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-flex>
            <v-flex md12 v-if="dataMA.fields.length != 0">
              <v-card flat>
                <v-card-actions>
                  <!-- <div class="flex-grow-1"></div> -->
                  <v-btn
                    :loading="loadDelete"
                    @click="deleteBS(dataMA.id, 'Market Analysis')"
                    small
                    class="ma-1"
                    color="warning"
                  >
                    <v-icon>delete</v-icon>
                  </v-btn>
                  <v-btn
                    @click="editBsForm(dataMA, 'Market Analysis')"
                    small
                    class="ma-1"
                    color="primary"
                  >
                    <v-icon>edit</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </v-tab-item>

        <v-tab-item value="tab-swot">
          <template v-if="loadVC">
            <v-card>
              <v-card-text>
                <v-progress-circular size="70" width="7" color="primary" indeterminate></v-progress-circular>
              </v-card-text>
            </v-card>
          </template>
          <v-layout v-else>
            <v-flex v-if="dataSwot.fields.length == 0">
              <v-btn
                color="primary"
                class="ma-3"
                @click="openBsForm('a08c05ef-60ff-409c-8d19-3dbf477fe825', 'SWOT Analysis')"
              >
                <v-icon>add</v-icon>Add SWOT Analysis
              </v-btn>
            </v-flex>
            <v-flex v-else>
              <!-- {{dataSwot}} -->
              <v-list v-for="field in dataSwot.fields" :key="field.id">
                <v-list-item three-line >
                  <v-list-item-content>
                    <v-list-item-subtitle>{{field.field_template.name}}</v-list-item-subtitle>
                    <v-list-item-title>{{field.value}}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-flex>
            <v-card flat>
              <v-card-actions>
                <!-- <div class="flex-grow-1"></div> -->
                <v-btn
                  :loading="loadDelete"
                  @click="deleteBS(dataSwot.id, 'SWOT Analysis')"
                  small
                  class="ma-1"
                  color="warning"
                >
                  <v-icon>delete</v-icon>
                </v-btn>
                <v-btn
                  @click="editBsForm(dataSwot, 'SWOT Analysis')"
                  small
                  class="ma-1"
                  color="primary"
                >
                  <v-icon>edit</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-layout>
        </v-tab-item>

        <v-tab-item value="tab-valuecurve">
          <v-row>
            <v-col>
              <v-card md12 flat v-if="dataVC.fields.length != 0">
                <v-card-actions>
                  <!-- <div class="flex-grow-1"></div> -->
                  <v-btn
                    :loading="loadDelete"
                    @click="deleteBS(dataVC.id, 'Value Curve')"
                    small
                    class="ma-1"
                    color="warning"
                  >
                    <v-icon>delete</v-icon>
                  </v-btn>
                  <v-btn
                    @click="editBsForm(dataVC, 'Value Curve')"
                    small
                    class="ma-1"
                    color="primary"
                  >
                    <v-icon>edit</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
          <template v-if="loadVC">
            <v-card>
              <v-card-text>
                <v-progress-circular size="70" width="7" color="primary" indeterminate></v-progress-circular>
              </v-card-text>
            </v-card>
          </template>
          <v-row v-else>
            <v-col v-if="dataVC.fields.length == 0">
              <v-card flat>
                <v-btn
                  color="primary"
                  class="ma-3"
                  @click="openBsForm('4e208600-abab-41ac-8864-a950ff74e0fb', 'Value Curve')"
                >
                  <v-icon>add</v-icon>Add Value Curve
                </v-btn>
              </v-card>
            </v-col>
            <v-col md12 v-else>
              <v-list v-for="data in dataVC.fields" :key="data.id">
                <v-list-item
                  
                  style="padding-left:26px;padding-right:26px"
                  :three-line="true"
                >
                  <v-list-item-content>
                    <v-list-item-title>{{data.field_template.name}}</v-list-item-title>
                    <!-- <span class="grey--text font-weight-light" v-if="data.value">{{data.value}}</span> -->
                    <span class="grey--text font-weight-light" v-if="data.attachment.length != 0">
                      <template v-for="file in data.attachment">
                        <!-- {{file.file_meta.file_path}} -->
                        <v-row align="center" justify="center" :key="file.id">
                          <v-img
                            :src="'https://start.mikti.id/inovasi/public/uploads' + file.file_meta.file_path"
                            lazy-src="https://picsum.photos/id/11/10/6"
                            aspect-ratio="1"
                            class="grey lighten-2"
                            max-width="750"
                            contain
                            max-height="500"
                          ></v-img>
                          <!-- @click="openImageDialog(file.fileInfo.filePath)" -->
                        </v-row>
                      </template>
                    </span>
                    <!-- <span class="grey--text font-weight-light" v-if="data.selectedOptions">
                      <template v-for="opt in data.selectedOptions">
                        {{opt.option.name}}
                        <template v-if="data.selectedOptions.length > 1">,</template>
                      </template>
                    </span>-->
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-col>
          </v-row>
        </v-tab-item>
      </v-tabs-items>
    </v-card>

    <canvas-form
      v-if="dialogCanvas"
      :edit="edit"
      :template="templateData"
      :templateId="templateId"
      :templateName="templateName"
      @close="dialogCanvas = false"
      @refresh="refreshCanvas"
    ></canvas-form>
  </v-container>
</template>
<script>
import bus from "@/bus";
import auth from "@/config/auth";
import * as config from "@/config/app.config";

import CanvasForm from "../BusinessForm";

export default {
  mixins: [],
  components: {
    CanvasForm
  },
  data() {
    return {
      dialogCanvas: false,
      edit: false,
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
      loadBMC: false,
      dataMS: {
        fields: []
      },
      loadMS: false,
      dataMA: {
        fields: []
      },
      loadMA: false,
      dataSwot: {
        fields: []
      },
      loadSwot: false,
      dataVC: {
        fields: []
      },
      loadVC: false,
      templateId: "",
      templateName: "",
      templateData: "",
      loadDelete: false
    };
  },
  mounted() {
    this.getValueProposition();
    this.getCustomersegment();
    this.getPersona();
    this.getSolutionCanvas();
    this.getLeanCanvas();
    this.getBMC();
    this.getMarketSize();
    this.getMarketAnalysis();
    this.getSwotAnalysis();
    this.getValueCurve();
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
          bus.$emit("callNotif", "error", res);
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
          bus.$emit("callNotif", "error", res);
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
          bus.$emit("callNotif", "error", res);
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
        .catch(() => {
          this.dataSolution = { fields: [] };
          // bus.$emit("callNotif", "error", res);
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
        .catch(() => {
          // bus.$emit("callNotif", "error", res);
          this.dataLean = { fields: [] };
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
        .catch(() => {
          // bus.$emit("callNotif", "error", res);
          this.dataBMC = { fields: [] };
        })
        .finally(() => {
          this.loadBMC = false;
        });
    },
    getMarketSize() {
      var canvasname = "Market Size";
      this.loadMS = true;
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
          this.dataMS = res.data.data;
        })
        .catch(() => {
          // bus.$emit("callNotif", "error", res);
          this.dataMS = { fields: [] };
        })
        .finally(() => {
          this.loadMS = false;
        });
    },
    getMarketAnalysis() {
      var canvasname = "Market Analysis";
      this.loadMA = true;
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
          this.dataMA = res.data.data;
        })
        .catch(() => {
          // bus.$emit("callNotif", "error", res);
          this.dataMA = { fields: [] };
        })
        .finally(() => {
          this.loadMA = false;
        });
    },
    getSwotAnalysis() {
      var canvasname = "SWOT Analysis";
      this.loadSwot = true;
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
          this.dataSwot = res.data.data;
        })
        .catch(res => {
          bus.$emit("callNotif", "error", res);
        })
        .finally(() => {
          this.loadSwot = false;
        });
    },
    getValueCurve() {
      var canvasname = "Value Curve";
      this.loadVC = true;
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
          this.dataVC = res.data.data;
        })
        .catch(() => {
          // bus.$emit("callNotif", "error", res);
          this.dataVC = { fields: [] };
        })
        .finally(() => {
          this.loadVC = false;
        });
    },
    openBsForm(id, name) {
      this.templateId = id;
      this.templateName = name;
      this.edit = false;
      this.dialogCanvas = true;
    },
    editBsForm(template, name) {
      this.templateId = "";
      this.templateName = name;
      this.templateData = template;
      this.edit = true;
      this.dialogCanvas = true;
    },
    deleteBS(id, name) {
      this.loadDelete = true;
      this.axios
        .delete(
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
            "/business_structure/" +
            id,
          { headers: auth.getAuthHeader() }
        )
        .then(() => {
          this.refreshCanvas(name);
        })
        .catch(res => {
          bus.$emit("callNotif", "error", res);
        })
        .finally(() => {
          this.loadDelete = false;
        });
    },
    refreshCanvas(name) {
      if (name == "Solution") {
        this.getSolutionCanvas();
      } else if (name == "Lean Canvas") {
        this.getLeanCanvas();
      } else if (name == "Business Model Canvas") {
        this.getBMC();
      } else if (name == "Market Size") {
        this.getMarketSize();
      } else if (name == "Market Analysis") {
        this.getMarketAnalysis();
      } else if (name == "SWOT Analysis") {
        this.getSwotAnalysis();
      } else if (name == "Value Curve") {
        this.getValueCurve();
      }

      this.dialogCanvas = false;
    },
    refreshDelete(name) {
      if (name == "Solution") {
        this.dataSolution = { fields: [] };
      } else if (name == "Lean Canvas") {
        this.dataLean == { fields: [] };
      } else if (name == "Business Model Canvas") {
        this.dataBMC == { fields: [] };
      } else if (name == "Market Size") {
        this.dataMS = { fields: [] };
      } else if (name == "Market Analysis") {
        this.dataMA = { fields: [] };
      } else if (name == "SWOT Analysis") {
        this.dataSwot == { fields: [] };
      } else if (name == "Value Curve") {
        this.dataVC = { fields: [] };
      }
      this.dialogCanvas = false;
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