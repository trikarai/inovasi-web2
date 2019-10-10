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
        }
    },
    methods: {
        openEducationForm() {
            this.dialogEducation = true;
            this.edit = false;
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
        }
    },
}
