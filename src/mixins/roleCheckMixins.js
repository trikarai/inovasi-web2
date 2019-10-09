export const roleCheckMixins = {
    data() {
        return {
            role: "",
            isTalent: true,
            mentorUri: "",
            mentorUri2: "/"
        }
    },
    created() {
        this.role = localStorage.getItem("role");
        if (this.role !== "Talent") {
            this.isTalent = false;
            // this.mentorUri = "/tutor/" + this.$route.params.mentorId;
            this.mentorUri = "/tutor/" + sessionStorage.getItem("mentorId")
            this.mentorUri2 = "?value=";
        }
    },
}
