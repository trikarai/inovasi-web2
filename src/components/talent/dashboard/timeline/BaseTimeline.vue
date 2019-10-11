<template>
  <v-container>
    <v-row>
      <!-- {{teamId}} -->
      <!-- {{program}} -->
      <v-col md2>
        <v-switch v-model="reverse" label="Toggle reverse"></v-switch>
      </v-col>
      <v-col md2>
        <v-switch v-model="dense" label="Toggle dense" class="hidden-sm-and-down"></v-switch>
      </v-col>
    </v-row>

    <v-timeline :reverse="reverse" :dense="dense">
      <v-timeline-item color="primary" icon="person" large>
        <template v-slot:opposite>
          <span class="subtitle-2 font-weight-bold">Yakinkan Investor dengan Profil Anda</span>
        </template>
        <v-card>
          <v-card-title class="title">
            <!-- <v-menu
              transition="slide-y-transition"
              :open-on-hover="true"
              bottom
              :offset-x="false"
              :offset-y="true"
            >
              <template v-slot:activator="{ on }">
                <v-btn dark color="omikti" class="mr-2" fab x-small v-on="on">
                  <v-icon small>keyboard_arrow_down</v-icon>
                </v-btn>
              </template>
              <v-list color="accent">
                <v-list-item v-for="(item, i) in items" :key="i" :to="item.to">
                  <v-icon
                    left
                    small
                    :color="$store.state.profile[i].total > 0 ? 'teal' : 'grey'"
                  >check</v-icon>
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>-->
            <span class="headline">{{ $vuetify.lang.t('$vuetify.profile.profile')}}</span>
          </v-card-title>
          <v-card-text>
            <p v-show="dense">Yakinkan Investor dengan Profil Anda</p>
            <p>
              Mengapa langkah ini penting? Karena investor, mentor, dan inkubator
              sangat menganggap penting profil dari pendiri Startup. Oleh karena itu
              tahap ini merupakan fondasi awal keberhasilan startup kalian.
            </p>
          </v-card-text>
        </v-card>
      </v-timeline-item>
      <v-timeline-item color="primary" icon="group" large>
        <template v-slot:opposite>
          <span class="subtitle-2 font-weight-bold">Buatlah Tim yang Solid</span>
        </template>
        <v-card>
          <v-card-title class="title">
            <v-menu
              transition="slide-y-transition"
              :open-on-hover="true"
              bottom
              :offset-x="false"
              :offset-y="true"
            >
              <template v-slot:activator="{ on }">
                <v-btn dark color="omikti" class="mr-2" fab x-small v-on="on">
                  <v-icon small>keyboard_arrow_down</v-icon>
                </v-btn>
              </template>
              <v-list color="accent">
                <v-list-item v-for="(item, i) in itemTeam" :key="i" :to="item.to">
                  <v-icon left small>{{item.icon}}</v-icon>
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
            {{ $vuetify.lang.t('$vuetify.team.team')}}
          </v-card-title>
          <v-card-text>
            <p v-show="dense">Buatlah Tim yang Solid</p>
            <p>Tim yang solid sangatlah penting bagi keberhasilan sebuah startup. Oleh karena itu lengkapi tim anda dan bentuk "Dream Team" anda.</p>
            <v-alert
              dense
              border="left"
              type="info"
              v-if="teamId == ''"
            >You don't have any active team</v-alert>
          </v-card-text>
        </v-card>
      </v-timeline-item>
      <v-timeline-item color="primary" icon="local_library" large>
        <template v-slot:opposite>
          <span class="subtitle-2 font-weight-bold">Bergabung pada Program Inkubasi</span>
        </template>
        <v-card>
          <v-card-title class="title">
            <v-menu
              transition="slide-y-transition"
              :open-on-hover="true"
              bottom
              :offset-x="false"
              :offset-y="true"
            >
              <template v-slot:activator="{ on }">
                <v-btn dark color="omikti" class="mr-2" fab x-small v-on="on">
                  <v-icon small>keyboard_arrow_down</v-icon>
                </v-btn>
              </template>
              <v-list color="accent">
                <v-list-item @click="openParticipation">
                  <v-icon left small>view_list</v-icon>
                  <v-list-item-title>Participation List</v-list-item-title>
                </v-list-item>
                <v-list-item :to="'/talent/team/' + this.teamId +'/participation/register'">
                  <v-icon left small>how_to_vote</v-icon>
                  <v-list-item-title>Register a Program</v-list-item-title>
                </v-list-item>
                <!-- <v-list-item @click="openMentoring">
                  <v-icon left small>insert_invitation</v-icon>
                  <v-list-item-title>Propose a Mentoring</v-list-item-title>
                </v-list-item>-->
              </v-list>
            </v-menu>
            {{ $vuetify.lang.t('$vuetify.program.programParticipation')}}
          </v-card-title>
          <v-card-text v-if="loaderProgram">
            <v-progress-circular size="70" width="7" color="omikti" indeterminate></v-progress-circular>
          </v-card-text>
          <v-card-text v-if="!loaderProgram">
            <!-- {{program}} -->
            <p v-show="dense">Bergabung pada Program Inkubasi</p>
            <p>Program Inkubasi akan sangat bermanfaat untuk membantu startup terutama pada tahap awal. Maka bergabunglah pada program yang tersedia dan sesuai dengan startup anda untuk mempercepat pertumbuhan startup anda.</p>
            <v-alert
              dense
              border="left"
              type="warning"
              v-if="teamId == ''"
            >Create or Join Team First</v-alert>
            <template v-if="teamId != ''">
              <v-alert
                dense
                border="left"
                type="warning"
                v-if="program.list.length == 0"
              >{{$vuetify.lang.t('$vuetify.team.noProgram')}}</v-alert>
            </template>
          </v-card-text>
        </v-card>
      </v-timeline-item>
      <v-timeline-item color="primary" icon="wb_incandescent" large>
        <template v-slot:opposite>
          <span class="subtitle-2 font-weight-bold">Tuliskan ide terbaik anda</span>
        </template>
        <v-card>
          <v-card-title class="title">
            <v-btn
              dark
              color="omikti"
              class="mr-2"
              fab
              x-small
              @click="openIdea"
              :disabled="teamId == ''"
            >
              <v-icon small>edit</v-icon>
            </v-btn>
            {{ $vuetify.lang.t('$vuetify.idea.idea')}}
          </v-card-title>
          <v-card-text>
            <p v-show="dense">Tuliskan ide terbaik anda</p>
            <p>Sebelum membuat suatu produk/jasa semua diawali oleh ide. Tuliskan ide terbaik kalian dan jadilah "The Next Unicorn"!</p>
            <v-alert
              dense
              border="left"
              type="warning"
              v-if="teamId == ''"
            >Create or Join Team First</v-alert>
          </v-card-text>
          <v-card-text>
            <!-- {{idea.list}} -->
            <v-select
              v-model="ideaId"
              :loading="loaderIdea"
              :items="idea.list"
              :no-data-text="$vuetify.lang.t('$vuetify.noDataText')"
              item-text="name"
              item-value="id"
              :label="$vuetify.lang.t('$vuetify.idea.idea')"
              outlined
              prepend-icon="visibility"
              @click:prepend="gotoIdeaDetail"
              placeholder="Select Idea"
            ></v-select>
          </v-card-text>
          <!-- <v-card-actions>
            <v-btn
              class="mx-0"
              outlined
              @click="openIdea"
              :disabled="teamId == ''"
            >{{ $vuetify.lang.t('$vuetify.idea.idea')}}</v-btn>
          </v-card-actions>-->
        </v-card>
      </v-timeline-item>
      <v-timeline-item color="primary" ref="customersegment" icon="person_pin" large>
        <template v-slot:opposite>
          <span class="subtitle-2 font-weight-bold">Tuliskan siapa pengguna produk/jasa anda</span>
        </template>
        <v-card>
          <v-card-title class="title">{{ $vuetify.lang.t('$vuetify.idea.customersegment')}}</v-card-title>
          <v-card-text>
            <p v-show="dense">Tuliskan siapa pengguna produk/jasa anda</p>
            <p>Ide tanpa adanya pengguna tidak memiliki nilai. Maka anda perlu mendeskripsikan siapa saja yang nantinya akan menggunakan ide anda.</p>
            <v-alert
              dense
              border="left"
              type="warning"
              v-if="teamId == ''"
            >Create or Join Team First</v-alert>
          </v-card-text>
          <v-card-text>
            <v-select
              :disabled="ideaId == ''"
              :loading="loaderCs"
              v-model="customersegmentId"
              :items="customersegment.list"
              :no-data-text="$vuetify.lang.t('$vuetify.noDataText')"
              item-text="name"
              item-value="id"
              :label="$vuetify.lang.t('$vuetify.idea.customersegment')"
              outlined
              prepend-icon="visibility"
              @click:prepend="gotoCustomerSegmentDetail"
            ></v-select>
          </v-card-text>
        </v-card>
      </v-timeline-item>
      <v-timeline-item color="primary" ref="persona" icon="sentiment_very_satisfied" large>
        <template v-slot:opposite>
          <span class="subtitle-2 font-weight-bold">Kenali lebih dalam siapa pelanggan anda</span>
        </template>
        <v-card>
          <v-card-title class="title">{{ $vuetify.lang.t('$vuetify.idea.persona')}}</v-card-title>
          <v-card-text>
            <p v-show="dense">Kenali lebih dalam siapa pelanggan anda</p>
            <p>
              Tak kenal maka tak sayang. Kenali terlebih dahulu pelanggan anda dan pahami
              Apa yang mereka rasakan, sehingga solusi yang nantinya anda tawarkan
              Akan memberikan impact yang jauh lebih besar.
            </p>
            <v-alert
              dense
              border="left"
              type="warning"
              v-if="teamId == ''"
            >Create or Join Team First</v-alert>
          </v-card-text>
          <v-card-text>
            <v-select
              :disabled="customersegmentId == ''"
              :loading="loaderPersona"
              v-model="personaId"
              :items="persona.list"
              :no-data-text="$vuetify.lang.t('$vuetify.noDataText')"
              item-text="name"
              item-value="id"
              :label="$vuetify.lang.t('$vuetify.idea.persona')"
              outlined
              prepend-icon="visibility"
              @click:prepend="gotoPersonaDetail"
            ></v-select>
          </v-card-text>
        </v-card>
      </v-timeline-item>
      <v-timeline-item color="primary" ref="valueproposition" icon="table_chart" large>
        <template v-slot:opposite>
          <span class="subtitle-2 font-weight-bold">Rayu pelanggan anda dengan value proposition</span>
        </template>
        <v-card>
          <v-card-title class="title">{{ $vuetify.lang.t('$vuetify.idea.valueproposition')}}</v-card-title>
          <v-card-text>
            <p v-show="dense">Rayu pelanggan anda dengan value proposition</p>
            <p>
              Rayu pelanggan anda dengan sesuatu yang tidak bisa mereka tolak. Beritahu
              Pelanggan anda mengapa produk/jasa yang anda buat merupakan
              Solusi terbaik bagi masalah yang mereka hadapi.
            </p>
            <v-alert
              dense
              border="left"
              type="warning"
              v-if="teamId == ''"
            >Create or Join Team First</v-alert>
          </v-card-text>
          <v-card-text>
            <v-select
              :disabled="personaId == ''"
              :loading="loaderVp"
              v-model="valuepropositionId"
              :items="valueproposition.list"
              :no-data-text="$vuetify.lang.t('$vuetify.noDataText')"
              item-text="description"
              item-value="id"
              :label="$vuetify.lang.t('$vuetify.idea.valueproposition')"
              outlined
              prepend-icon="visibility"
              @click:prepend="gotoValuepropositionDetail"
            ></v-select>
          </v-card-text>
        </v-card>
      </v-timeline-item>
      <v-timeline-item color="primary" ref="analysis" icon="show_chart" large>
        <template v-slot:opposite>
          <span class="subtitle-2 font-weight-bold">Buatlah Hipotesa Untuk Bisnis Anda</span>
        </template>
        <v-card>
          <v-card-title class="title">{{ $vuetify.lang.t('$vuetify.idea.analysis')}}</v-card-title>
          <v-card-text>
            <p v-show="dense">Buatlah Hipotesa Untuk Bisnis Anda</p>
            <p>
              Melakukan bisnis tanpa menganalisa keadaan yang mungkin terjadi seperti layaknya
              Anda berlari ke area ranjau darat, anda bisa kapan saja terkena ranjau dan meledak
              Seketika. Persiapkan sebaik mungkin bisnis anda untuk meningkatkan tingkat
              Keberhasilan anda. Ini adalah level yang sulit, tapi akan sangat bermanfaat
              Untuk perkembangan startup anda.
            </p>
            <v-alert
              dense
              border="left"
              type="warning"
              v-if="teamId == ''"
            >Create or Join Team First</v-alert>
          </v-card-text>
          <v-card-actions>
            <v-row>
              <v-col cols="12" sm="6">
                <v-btn
                  color="primary"
                  :disabled="valuepropositionId == ''"
                  @click="gotoCanvas"
                >Business Analysis</v-btn>
              </v-col>
              <v-col sm="6">
                <v-btn
                  color="primary"
                  :disabled="valuepropositionId == ''"
                  @click="gotoExp('businessdata')"
                >Business Data</v-btn>
              </v-col>
            </v-row>
          </v-card-actions>
          <!-- <v-card-text>
            <v-layout row>
              <template v-for="canvas in canvas.list">
                <v-flex :key="canvas.id" md2 class="mr-1 ml-1">
                  <v-btn @click="gotoCanvas(canvas.id)" color="primary">
                    <v-icon left>pageview</v-icon>
                    {{canvas.name}}
                  </v-btn>
                </v-flex>
              </template>
            </v-layout>
          </v-card-text>-->
        </v-card>
      </v-timeline-item>
      <v-timeline-item color="primary" icon="beenhere" large>
        <template v-slot:opposite>
          <span class="subtitle-2 font-weight-bold">Validasi Ide Anda</span>
        </template>
        <v-card>
          <v-card-title class="title">{{ $vuetify.lang.t('$vuetify.idea.experiment')}}</v-card-title>
          <v-card-text>
            <p v-show="dense">Validasi Ide Anda</p>
            <p>
              Ide yang tidak tervalidasi memiliki banyak sekali celah untuk gagal.
              Seperti ketidakcocokan antara solusi yang ditawarkan dengan kebutuhan yang dirasakan oleh pelanggan atau menawarkan solusi pada segmen pasar yang salah. Kedua hal tersebut sangat fatal dan akan mengakibatkan gagalnya startup anda. Oleh karena itu melakukan validasi sangatlah penting sebelum anda melangkah ke tahap selanjutnya. Ini adalah level yang paling sulit, karena mengakui bahwa idealisme anda salah dan perlu melakukan pivot merupakan hal yang sangat sulit. Namun, kami yakin startup anda dapat melewati tahap ini untuk berkembang menjadi “The Next Unicorn”.
            </p>
            <v-alert
              dense
              border="left"
              type="warning"
              v-if="teamId == ''"
            >Create or Join Team First</v-alert>
          </v-card-text>
          <v-card-actions>
            <v-row>
              <v-col cols="12" sm="4" md="2" lg="4">
                <v-btn
                  color="primary"
                  :disabled="valuepropositionId == ''"
                  @click="gotoExp('javelin')"
                >Experiment</v-btn>
              </v-col>
              <v-col sm="4" md="2" lg="3">
                <v-btn
                  color="primary"
                  :disabled="valuepropositionId == ''"
                  @click="gotoExp('metric')"
                >Metric</v-btn>
              </v-col>
              <v-col sm="4" md="4" lg="5">
                <v-btn
                  color="primary"
                  :disabled="valuepropositionId == ''"
                  @click="gotoExp('developmentplan')"
                >Development Plan</v-btn>
              </v-col>
            </v-row>
          </v-card-actions>
          <!-- <v-card-text>
            <v-layout row>
              <template v-for="exp in experiments.list">
                <v-flex :key="exp.id" md2 class="mr-1 ml-1">
                  <v-btn @click="gotoExp(exp.id)" color="primary">
                    <v-icon left>pageview</v-icon>
                    {{exp.name}}
                  </v-btn>
                </v-flex>
              </template>
            </v-layout>
          </v-card-text>-->
        </v-card>
      </v-timeline-item>
    </v-timeline>

    <v-dialog v-model="formMentoring" content-class="operplow" max-width="450">
      <v-form v-model="valid" ref="form">
        <v-card style="padding:0px 30px 30px 30px;">
          <v-card class="taitel2 primary white--text elevation-5">
            <v-btn
              style="float:right;left: 20px;bottom: 20px;"
              small
              fab
              color="white"
              text
              @click="formMentoring = false"
            >
              <v-icon small>close</v-icon>
            </v-btn>
            <h3 class="headline mb-0 font-weight-light">Propose Mentoring</h3>
          </v-card>

          <v-card-text class="ma-0 pa-0">
            <v-container grid-list-md>
              <v-layout wrap>
                <!-- {{program.list}} -->
                <v-flex v-if="program.total == 0">{{$vuetify.lang.t('$vuetify.team.noProgram')}}</v-flex>
                <v-flex v-else xs12 sm12 md12>
                  <v-select
                    v-model="programId"
                    :items="program.list"
                    :no-data-text="$vuetify.lang.t('$vuetify.noDataText')"
                    :loading="loader"
                    item-text="programme.name"
                    item-value="id"
                    :label="$vuetify.lang.t('$vuetify.team.programParticipation')"
                    hint="Select Program"
                    persistent-hint
                    outlined
                  ></v-select>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-btn
              @click="gotoMentoringEvent"
              color="primary"
              :disabled="programId == ''"
              block
            >{{$vuetify.lang.t('$vuetify.mentoring.propose')}}</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
  </v-container>
</template>
<script>
import bus from "@/bus";
import auth from "@/config/auth";
import * as config from "@/config/app.config";

export default {
  props: ["teamId"],
  data: () => ({
    valid: false,
    formMentoring: false,
    loader: false,
    loaderIdea: false,
    loaderCs: false,
    loaderPersona: false,
    loaderVp: false,
    loaderProgram: false,
    reverse: false,
    dense: true,
    items: [
      { title: "Education", to: "/talent/education" },
      { title: "Work", to: "/talent/work" },
      { title: "Organization", to: "/talent/organization" },
      { title: "Entrepreneurship", to: "/talent/entrepreneurship" },
      { title: "Training", to: "/talent/training" },
      { title: "Skill", to: "/talent/skill" }
    ],
    itemTeam: [
      { title: "Create Team", icon: "add", to: "/talent/team/create" },
      // { title: "Manage Team", icon: "check", to: "/talent/team/" + localStorage.teamId },
      { title: "Team List", icon: "view_list", to: "/talent/team" }
    ],
    program: { total: 0, list: [] },
    programId: "",
    idea: { total: 0, list: [] },
    ideaId: "",
    customersegment: { total: 0, list: [] },
    customersegmentId: "",
    persona: { total: 0, list: [] },
    personaId: "",
    valueproposition: { total: 0, list: [] },
    valuepropositionId: "",
    canvas: { total: 0, list: [] },
    experiments: { total: 0, list: [] }
  }),
  components: {},
  computed: {},
  watch: {
    "$vuetify.breakpoint.name": "checkDense",
    teamId: function() {
      this.getProgramList();
      this.getIdea();
    },
    ideaId: function() {
      sessionStorage.ideaId = this.ideaId;
      // sessionStorage.removeItem("customersegmentId");
      // sessionStorage.removeItem("personaId");
      sessionStorage.removeItem("valuepropositionId");
      this.getCustomerSegments();
    },
    customersegmentId: function() {
      sessionStorage.customersegmentId = this.customersegmentId;
      // sessionStorage.removeItem("personaId");
      sessionStorage.removeItem("valuepropositionId");
      if (this.customersegmentId !== "") {
        this.getPersona();
      }
    },
    personaId: function() {
      sessionStorage.personaId = this.personaId;
      sessionStorage.removeItem("valuepropositionId");
      this.getValueproposition();
    },
    valuepropositionId: function() {
      // this.getBusinessCanvas();
      // this.getExperiments();
      this.$vuetify.goTo(this.$refs.analysis, {
        duration: 500,
        offset: 10,
        easing: "linear"
      });
    }
  },
  created() {
    this.checkDense();
  },
  mounted: function() {
    if (localStorage.teamId) {
      this.getProgramList();
      this.getIdea();
    }
  },
  methods: {
    checkDense() {
      // console.log(this.$vuetify.breakpoint.name);
      var bp = this.$vuetify.breakpoint.name;
      switch (bp) {
        case "xs":
          this.dense = true;
          break;
        case "sm":
          this.dense = true;
          break;
        case "md":
          this.dense = false;
          break;
        case "lg":
          this.dense = false;
          break;
        case "xl":
          this.dense = false;
          break;
      }
    },
    gotoIdeaDetail: function() {
      if (this.ideaId === "") {
        bus.$emit("callNotif", "info", ["Idea Not Selected"]);
      } else {
        this.$router.push({
          path: "/talent/team/" + localStorage.teamId + "/idea/" + this.ideaId
        });
      }
    },
    gotoCustomerSegmentDetail: function() {
      if (this.customersegmentId === "") {
        bus.$emit("callNotif", "info", ["Customer Segment Not Selected"]);
      } else {
        this.$router.push({
          path:
            "/talent/team/" +
            localStorage.teamId +
            "/idea/" +
            this.ideaId +
            "/customersegment/" +
            this.customersegmentId
        });
      }
    },
    gotoPersonaDetail: function() {
      if (this.personaId === "") {
        bus.$emit("callNotif", "info", ["Persona Not Selected"]);
      } else {
        this.$router.push({
          path:
            "/talent/team/" +
            localStorage.teamId +
            "/idea/" +
            this.ideaId +
            "/customersegment/" +
            this.customersegmentId +
            "/persona/" +
            this.personaId
        });
      }
    },
    gotoValuepropositionDetail: function() {
      if (this.valuepropositionId === "") {
        bus.$emit("callNotif", "info", ["Value Proposition Not Selected"]);
      } else {
        this.$router.push({
          path:
            "/talent/team/" +
            localStorage.teamId +
            "/idea/" +
            this.ideaId +
            "/customersegment/" +
            this.customersegmentId +
            "/persona/" +
            this.personaId +
            "/valueproposition/" +
            this.valuepropositionId
        });
      }
    },
    gotoCanvasList: function() {
      this.$router.push({
        path:
          "/talent/team/" +
          localStorage.teamId +
          "/idea/" +
          this.ideaId +
          "/customersegment/" +
          this.customersegmentId +
          "/persona/" +
          this.personaId +
          "/valueproposition/" +
          this.valuepropositionId +
          "/businessanalysis"
      });
    },
    gotoExpList: function() {
      this.$router.push({
        path:
          "/talent/team/" +
          localStorage.teamId +
          "/idea/" +
          this.ideaId +
          "/customersegment/" +
          this.customersegmentId +
          "/persona/" +
          this.personaId +
          "/valueproposition/" +
          this.valuepropositionId +
          "/experiment"
      });
    },
    getProgramList: function() {
      this.loaderProgram = true;
      this.axios
        .get(
          config.baseUri +
            "/team/" +
            localStorage.teamId +
            "/programme_participation?status[]=active",
          { headers: auth.getAuthHeader() }
        )
        .then(res => {
          if (res.data.data) {
            // this.program = res.data.data;
            this.filterProgramList(res.data.data);
          } else {
            this.program = { total: 0, list: [] };
          }
        })
        .catch(res => {
          bus.$emit("callNotif", "error", res);
        })
        .finally(() => {
          this.loaderProgram = false;
        });
    },
    filterProgramList(data) {
      this.program.list = data.list.filter(function(status) {
        return status.status == "active";
      });
    },
    getIdea: function() {
      this.loaderIdea = true;
      this.ideaId = "";
      this.axios
        .get(config.baseUri + "/team/" + localStorage.teamId + "/idea", {
          headers: auth.getAuthHeader()
        })
        .then(res => {
          if (res.data.data) {
            this.idea = res.data.data;
            if (sessionStorage.ideaId) {
              this.ideaId = sessionStorage.ideaId;
            } else {
              this.ideaId = this.idea.list[0].id;
              sessionStorage.setItem("ideaId", this.idea.list[0].id);
            }
          } else {
            this.idea = { total: 0, list: [] };
          }
        })
        .catch(res => {
          bus.$emit("callNotif", "error", res);
        })
        .finally(() => {
          this.customersegment = { total: 0, list: [] };
          this.customersegmentId = "";
          this.persona = { total: 0, list: [] };
          this.personaId = "";
          this.loaderIdea = false;
        });
    },
    getCustomerSegments: function() {
      this.loaderCs = true;
      this.axios
        .get(
          config.baseUri +
            "/team/" +
            localStorage.teamId +
            "/idea/" +
            this.ideaId +
            "/customer_segment",
          {
            headers: auth.getAuthHeader()
          }
        )
        .then(res => {
          if (res.data.data) {
            if (res.data.data.total === 0) {
              this.customersegmentId = "";
              sessionStorage.removeItem("customersegmentId");
              this.customersegment = { total: 0, list: [] };
            } else {
              this.customersegment = res.data.data;
              if (sessionStorage.customersegmentId) {
                this.customersegmentId = sessionStorage.customersegmentId;
              } else {
                this.customersegmentId = this.customersegment.list[0].id;
                sessionStorage.setItem(
                  "customersegmentId",
                  this.customersegment.list[0].id
                );
                this.$vuetify.goTo(this.$refs.customersegment, {
                  duration: 500,
                  offset: 10,
                  easing: "linear"
                });
              }
            }
          } else {
            sessionStorage.removeItem("customersegmentId");
            this.customersegment = { total: 0, list: [] };
          }
        })
        .catch(res => {
          bus.$emit("callNotif", "error", res);
        })
        .finally(() => {
          this.loaderCs = false;
          this.persona = { total: 0, list: [] };
          this.personaId = "";
        });
    },
    getPersona: function() {
      this.loaderPersona = true;
      this.axios
        .get(
          config.baseUri +
            "/team/" +
            localStorage.teamId +
            "/idea/" +
            this.ideaId +
            "/customer_segment/" +
            this.customersegmentId +
            "/persona",
          {
            headers: auth.getAuthHeader()
          }
        )
        .then(res => {
          if (res.data.data) {
            this.persona = res.data.data;
            if (sessionStorage.loaderPersona) {
              this.personaId = sessionStorage.personaId;
            } else {
              this.personaId = this.persona.list[0].id;
              sessionStorage.setItem("personaId", this.persona.list[0].id);

              this.$vuetify.goTo(this.$refs.persona, {
                duration: 500,
                offset: 10,
                easing: "linear"
              });
            }
          } else {
            this.persona = { total: 0, list: [] };
          }
        })
        .catch(res => {
          this.personaId = "";
          sessionStorage.removeItem("personaId");
          bus.$emit("callNotif", "error", res);
        })
        .finally(() => {
          this.loaderPersona = false;
          this.valueproposition = { total: 0, list: [] };
          this.valuepropositionId = "";
        });
    },
    getValueproposition: function() {
      this.loaderVp = true;
      this.axios
        .get(
          config.baseUri +
            "/team/" +
            localStorage.teamId +
            "/idea/" +
            this.ideaId +
            "/customer_segment/" +
            this.customersegmentId +
            "/persona/" +
            this.personaId +
            "/value_proposition",
          {
            headers: auth.getAuthHeader()
          }
        )
        .then(res => {
          if (res.data.data) {
            this.valueproposition = res.data.data;
            this.$vuetify.goTo(this.$refs.valueproposition, {
              duration: 500,
              offset: 10,
              easing: "linear"
            });
          } else {
            this.valueproposition = { total: 0, list: [] };
          }
        })
        .catch(res => {
          bus.$emit("callNotif", "error", res);
        })
        .finally(() => {
          this.loaderVp = false;
        });
    },
    openParticipation: function() {
      var id = localStorage.teamId;
      this.$store.commit("setTeamId", id);
      this.$router.push({ path: "/talent/team/" + id + "/participation" });
    },
    openIdea: function() {
      var id = localStorage.teamId;
      this.$store.commit("setTeamId", id);
      this.$router.push({ path: "/talent/team/" + id + "/idea" });
    },
    getBusinessCanvas: function() {
      this.loader = true;
      this.axios
        .get(config.baseUri + "/talent/forms?types[]=can", {
          headers: auth.getAuthHeader()
        })
        .then(res => {
          if (res.data.data) {
            this.canvas = res.data.data;
          } else {
            this.canvas = { total: 0, list: [] };
          }
        })
        .catch(res => {
          bus.$emit("callNotif", "error", res);
        })
        .finally(() => {
          this.loader = false;
        });
    },
    gotoCanvas: function() {
      this.$router.push({
        path:
          "/talent/team/" +
          this.teamId +
          "/idea/" +
          this.ideaId +
          "/customersegment/" +
          this.customersegmentId +
          "/persona/" +
          this.personaId +
          "/valueproposition/" +
          this.valuepropositionId +
          "/businessanalysis"
      });
    },
    getExperiments: function() {
      this.loader = true;
      this.axios
        .get(config.baseUri + "/talent/forms?types[]=exp")
        .then(res => {
          if (res.data.data) {
            this.experiments = res.data.data;
          } else {
            this.experiments = { total: 0, list: [] };
          }
        })
        .catch(res => {
          bus.$emit("callNotif", "error", res);
        })
        .finally(() => {
          this.loader = false;
        });
    },
    gotoExp: function(name) {
      this.$router.push({
        path:
          "/talent/team/" +
          this.teamId +
          "/idea/" +
          this.ideaId +
          "/customersegment/" +
          this.customersegmentId +
          "/persona/" +
          this.personaId +
          "/valueproposition/" +
          this.valuepropositionId +
          "/" +
          name
      });
    },
    openMentoring: function() {
      this.formMentoring = true;
    },
    gotoMentoringEvent: function() {
      this.$router.push({
        path:
          "/talent/team/" +
          this.teamId +
          "/participation/" +
          this.programId +
          "/mentoring-event"
      });
    }
  }
};
</script>
<style scoped>
</style>