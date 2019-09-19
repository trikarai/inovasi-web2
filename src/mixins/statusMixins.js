export const statusMixins = {
    methods: {
        getColor: function (status) {
            if (status == "active") {
                return "green";
            } else if (status == "cancelled") {
                return "#FFD700";
            } else if (status == "registered") {
                return "blue";
            } else if (status == "rejected") {
                return "red";
            }else if(status == "resigned"){
                return "red";
            }else if(status == "failed"){
                return "#8B0000";
            }else if(status == "graduated"){
                return "blue";
            }
        }
    },
    filters: {
        truncate: function (value, limit) {
            if (value.length > limit) {
                value = value.substring(0, limit - 3) + "...";
            }
            return value;
        }
    },
}