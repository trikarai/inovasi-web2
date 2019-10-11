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
        refreshEntrepreneurship() {
            this.dialogEntrepreneurship = false;
            this.getEntrepreneurship();
        },
        openOrganizationForm() {
            this.dialogOrganization = true;
            this.edit = false;
        },
        refreshOrganization() {
            this.dialogOrganization = false;
            this.getOrganization();
        },
        openTrainingForm() {
            this.dialogTraining = true;
            this.edit = false;
        },
        refreshTraining() {
            this.dialogTraining = false;
            this.getTraining();
        },
        openWorkingForm() {
            this.dialogWorking = true;
            this.edit = false;
        },
        refreshWorking() {
            this.dialogWorking = false;
            this.getTraining();
        },
        openSkillForm() {
            this.dialogSkill = true;
            this.edit = false;
        },
        refreshSkill() {
            this.dialogSkill = false;
            this.getSkill();
        },
        openCertificateForm() {
            this.dialogCertificate = true;
            this.edit = false;
        },
        refreshCertificate() {
            this.dialogCertificate = false;
        },
        deleteAct() {
            this.loaderDelete = true;
            this.axios.delete(config.baseUri + "/talent/" + this.deletepath + this.deleteId, { headers: auth.getAuthHeader() })
                .then(() => {
                    this.dialogDelete = false;
                    this.refreshEducation();
                }).catch(res => {
                    bus.$emit("callNotif", "error", res);
                })
                .finally(() => {
                    this.loaderDelete = false;
                });
        }
    },
}
