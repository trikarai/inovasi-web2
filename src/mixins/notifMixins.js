export const notifMixins = {
    methods: {
        testNotif() {
            this.status.success = true;
            this.err_msg = {
                code: 111,
                type: "type",
                details: ["This is Notif Test."]
            };
        },
        showError(res) {
            if (res.status >= 500) {
                this.err_msg = {
                    code: res.status,
                    type: res.statusText,
                    details: ["Internal Server Error | Don't Panic it's not your fault..."]
                };
            } else if (res.status === 405) {
                this.err_msg = {
                    code: res.status,
                    type: res.statusText,
                    details: ["Method Not Allowed"]
                };
            } else if (res.status >= 400) {
                this.err_msg = res.body.meta;
            } else if (res.status >= 300) {
                this.err_msg = res.body.meta;
            } else {
                this.err_msg = res.body.meta;
            }
            this.status.error = true;
        },
        showInfo(res, details) {
            this.err_msg = {
                code: res.status,
                type: res.statusText,
                details: details
            };
            this.status.info = true;
        },
        showWarning(res) {
            this.status.warning = true;
            this.err_msg = res.body.meta;
        },
        showSuccess(res, details) {
            this.err_msg = {
                code: res.status,
                type: res.statusText,
                details: details
            };
            this.status.success = true;
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