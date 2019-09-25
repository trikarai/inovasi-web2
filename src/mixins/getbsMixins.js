import auth from "@/config/auth";
import * as config from "@/config/app.config";

export const getbsMixins = {
    data() {
        return {
            dataBS: { total: 0, list: [] },
            loadBS: false
        }
    },
    methods: {
        getBusinessStructure(name) {
            this.loadBS = true;
            // var bsId = "7a9974d1-2b01-4d09-82e0-0015fa69ee42";
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
                "/business_structure/template_name/" +
                encodeURI(name), { headers: auth.getAuthHeader() }
            ).then(res => {
                if (res.data.data.total != 0) {
                    this.dataBS = res.data.data;
                } else {
                    this.dataBS = { total: 0, list: [] }
                }
            }).catch(() => {
                this.dataBS = { total: 0, list: [] }
            }).finally(() => {
                this.loadBS = false;
            });
        }
    }
}
