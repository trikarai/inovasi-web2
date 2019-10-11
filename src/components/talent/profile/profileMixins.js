import bus from "@/bus";
import auth from "@/config/auth";
import * as config from "@/config/app.config";

export const profileMixins = {
    data() {
        return {
            edit: false,
            dialogEducation: false,
            dialogEntrepreneurship: false,
            dialogOrganization: false,
            dialogTraining: false,
            dialogWorking: false,
            dialogSkill: false,
            dialogCertificate: false,
            deleteId: "",
            deletename: "",
            deletepath: ""
        }
    },
    methods: {
        openEducationForm() {
            this.dialogEducation = true;
            this.edit = false;
        },
        deleteEducation(item) {
            this.deleteId = item.id;
            this.dialogDelete = true;
            this.deletepath = "/education/"
        },
        refreshEducation() {
            this.dialogEducation = false;
            this.getEducation();
        },
        openEntrepreneurshipForm() {
            this.dialogEntrepreneurship = true;
            this.edit = false;
        },
        deleteEntrepreneurship(item) {
            this.deleteId = item.id;
            this.dialogDelete = true;
            this.deletepath = "/entrepreneurship/"
        },
        refreshEntrepreneurship() {
            this.dialogEntrepreneurship = false;
            this.getEntrepreneurship();
        },
        openOrganizationForm() {
            this.dialogOrganization = true;
            this.edit = false;
        },
        deleteOrganization(item) {
            this.deleteId = item.id;
            this.dialogDelete = true;
            this.deletepath = "/organization/"
        },
        refreshOrganization() {
            this.dialogOrganization = false;
            this.getOrganization();
        },
        openTrainingForm() {
            this.dialogTraining = true;
            this.edit = false;
        },
        deleteTraining(item) {
            this.deleteId = item.id;
            this.dialogDelete = true;
            this.deletepath = "/training_experience/"
        },
        refreshTraining() {
            this.dialogTraining = false;
            this.getTraining();
        },
        openWorkingForm() {
            this.dialogWorking = true;
            this.edit = false;
        },
        deleteWorking(item) {
            this.deleteId = item.id;
            this.dialogDelete = true;
            this.deletepath = "/working_experience/"
        },
        refreshWorking() {
            this.dialogWorking = false;
            this.getTraining();
        },
        openSkillForm() {
            this.dialogSkill = true;
            this.edit = false;
        },
        deleteSkill(item) {
            this.deleteId = item.id;
            this.dialogDelete = true;
            this.deletepath = "/skill/"
        },
        refreshSkill() {
            this.dialogSkill = false;
            this.getSkill();
        },
        openCertificateForm() {
            this.dialogCertificate = true;
            this.edit = false;
        },
        deleteCertificate(item) {
            this.deleteId = item.id;
            this.dialogDelete = true;
            this.deletepath = "/skill/" + this.skillId + "/certificate/"
        },
        refreshCertificate() {
            this.dialogCertificate = false;
            this.getCertificate();
        },
        deleteAct() {
            this.loaderDelete = true;
            this.axios.delete(config.baseUri + "/talent/" + this.deletepath + this.deleteId, { headers: auth.getAuthHeader() })
                .then(() => {
                    this.dialogDelete = false;
                    switch (this.deletepath) {
                        case "/education/":
                            this.refreshEducation();
                            break;
                        case "/entrepreneurship/":
                            this.refreshEntrepreneurship();
                            break;
                        case "/organization/":
                            this.refreshOrganization();
                            break;
                        case "/training_experience/":
                            this.refreshTraining();
                            break;
                        case "/working_experience/":
                            this.refreshWorking();
                            break;
                        case "/skill/":
                            this.refreshSkill();
                            break;
                        default:
                            this.refreshCertificate();
                            break;
                    }
                }).catch(res => {
                    bus.$emit("callNotif", "error", res);
                })
                .finally(() => {
                    this.loaderDelete = false;
                });
        }
    },
}
