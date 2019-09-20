export const notifMixins = {
    methods: {
        testNotif() {
            this.status.success = true;
            this.err_msg = {
                code: 111,
                type: "type",
                error_details: ["This is Notif Test."]
            };
        },
        showInfo(res, error_details) {
            this.err_msg = {
                code: '',
                type: 'OK',
                error_details: error_details
            };
            this.status.info = true;
        },
        showWarning(res) {
            this.status.warning = true;
            this.err_msg = res.response.data.meta;
        },
        showSuccess(res, error_details) {
            this.err_msg = {
                code: '',
                type: 'OK',
                error_details: error_details
            };
            this.status.success = true;
        },
        showError(res) {
            this.err_msg = res.response.data.meta;
            this.status.error = true;
        },
        resetNotif() {
            this.status = {
                success: false,
                error: false,
                info: false,
                warning: false
            }
        }
    }
}