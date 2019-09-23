import bus from "@/bus";

export const formMixins = {
    data() {
        return {
        }
    },
    watch: {
        value: function () {
            var params = { field_template_id: this.fieldId, value: this.value };
            bus.$emit("getValue", params, this.index);
        },
        
    },
    methods: {
        setFormJSONTemplate: function (data) {
            var array = [];
            for (var i = 0; i < data.fields.length; i++) {
                array.push(new Object({ field_template_id: data.fields[i].id, value: "" }));
            }
            this.params.data = array;
        },
        setFormJSONPersona: function (data) {
            var array = [];
            for (var i = 0; i < data.list.length; i++) {
                array.push(new Object({ field_template_id: data.list[i].id, value: "" }));
            }
            this.params.aspects = array;
        },
    }
}
