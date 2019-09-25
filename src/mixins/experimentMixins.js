export const experimentMixins = {
    data() {
        return {
        }
    },
    computed: {
        integrityCheck: function () {
            if (this.dataJavelin.total != 0) {
                for (var i = 0; i < this.dataJavelin.list.length; i++) {
                    if (this.dataJavelin.list[i].fields.length < 9) {
                        return false;
                    }
                }
            }
            return true;
        }
    },
    methods: {
        addToJavelin: function (data) {
            for (var i in data.list) {
                for (var k in data.list[i].fields) {
                    data.list[i].fields[k]["position"] =
                        data.list[i].fields[k].field_template.position;
                }
                this.dataJavelin.list.push(data.list[i]);
                this.dataJavelin.total += 1;
            }
        },
        reOrderField: function (params) {
            return this._.orderBy(params, "position", "asc");
        },
        reOrderDate: function (params) {
            return this._.orderBy(params, "date", "desc");
        },
    }
}
