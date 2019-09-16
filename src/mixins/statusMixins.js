export const statusMixins = {
    methods: {
        getColor: function (status) {
            if (status == "active") {
                return "green";
            } else if (status == "cancelled") {
                return "yellow";
            } else if (status == "registered") {
                return "blue";
            } else if (status == "rejected") {
                return "red"
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