import auth from "@/config/auth";
import * as config from "@/config/app.config";

export const getexpMixins = {
    data() {
        return {
        }
    },
    methods: {
        getConciergeData() {
            var templateId = "5e42614e-52aa-4219-94a3-31e3840b4ac9";
            this.axios.get(config.baseUri +
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
                "/experiment?experiment_template_id[]=" +
                templateId, { headers: auth.getAuthHeader() }
            ).then(res => {
                if (res.data.data.total != 0) {
                    // this.dataConcierge = res.data.data;
                    this.addToJavelin(res.data.data);
                    this.summary = true;
                } else {
                    this.summary = true;
                }
            }).catch(() => {
            }).finally();
        },
        getInterviewData() {
            var templateId = "d7dd37e2-d6fd-4eb9-ae00-7dd6d178fbe3";
            this.axios.get(config.baseUri +
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
                "/experiment?experiment_template_id[]=" +
                templateId, { headers: auth.getAuthHeader() }
            ).then(res => {
                if (res.data.data.total != 0) {
                    // this.dataInterview = res.data.data;
                    this.addToJavelin(res.data.data);
                    this.summary = true;
                } else {
                    this.summary = true;
                }
            }).catch(() => {
            }).finally();
        },
        getWoZData() {
            var templateId = "62e72e24-eefe-41dd-b518-450af356d876";
            this.axios.get(config.baseUri +
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
                "/experiment?experiment_template_id[]=" +
                templateId, { headers: auth.getAuthHeader() }
            ).then(res => {
                if (res.data.data.total != 0) {
                    // this.dataWoZ = res.data.data;
                    this.addToJavelin(res.data.data);
                    this.summary = true;
                } else {
                    this.summary = true;
                }
            }).catch(() => {
            }).finally();
        },
        getMetricData() {
            var templateId = "2caadcad-1481-4485-8e31-6be566dd0a8a";
            this.axios.get(config.baseUri +
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
                "/experiment?experiment_template_id[]=" +
                templateId, { headers: auth.getAuthHeader() }
            ).then(res => {
                if (res.data.data.total != 0) {
                    // this.dataMetric = res.data.data;
                    this.addToJavelin(res.data.data);
                    this.summary = true;
                } else {
                    this.summary = true;
                }
            }).catch(() => {
            }).finally();
        },
        getDevPlanData() {
            var templateId = "71ad288e-1c42-4319-b29f-3e26c4152ae6";
            this.axios.get(config.baseUri +
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
                "/experiment?experiment_template_id[]=" +
                templateId, { headers: auth.getAuthHeader() }
            ).then(res => {
                if (res.data.data.total != 0) {
                    // this.dataDevplan = res.data.data;
                    this.addToJavelin(res.data.data);
                    this.summary = true;
                } else {
                    this.summary = true;
                }
            }).catch(() => {
            }).finally();
        }
    }
}
