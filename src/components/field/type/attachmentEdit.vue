<template>
  <v-container>
    <!-- {{field}} -->
    <v-divider />
    {{field.field_template.name}}
    <!-- https://jsfiddle.net/meyubaraj/fLbe7r72/ -->
    <v-flex xs12 class="text-xs-center text-sm-center text-md-center text-lg-center">
      <!-- {{response}} -->
      <v-expand-x-transition>
        <v-progress-circular
          v-if="progressShow"
          rotate="90"
          size="150"
          width="10"
          :value="valueDeterminate"
          color="red"
        >{{ valueDeterminate }} %</v-progress-circular>
      </v-expand-x-transition>
      <v-expand-transition>
        <template v-if="!progressShow">
          <v-img :src="imageUrl" contain max-height="150" v-if="imageUrl" />
        </template>
      </v-expand-transition>
      <template v-if="!edit">
        <template v-if="!uploaded">
          <v-btn
            @click.prevent="uploadFile"
            :disabled="progressShow"
            small
            fab
            color="warning"
            v-if="imageName"
          >
            <v-icon>cloud_upload</v-icon>
          </v-btn>
        </template>
      </template>
      <v-btn @click.prevent="removeAttachment" small fab color="red" v-else>
        <v-icon>delete</v-icon>
      </v-btn>
      <v-btn fab small color="green" v-if="uploaded">
        <v-icon>check</v-icon>
      </v-btn>
      <v-text-field
        v-if="!edit"
        label="Select Image"
        @click="pickFile"
        v-model="imageName"
        prepend-icon="attach_file"
      ></v-text-field>
      <!-- {{value}} -->
      <input type="file" style="display: none" ref="image" accept="image/*" @change="onFilePicked" />
    </v-flex>
  </v-container>
</template>
<script>
import bus from "@/bus";
import auth from "@/config/auth";
import * as config from "@/config/app.config";
import { notifMixins } from "@/mixins/notifMixins";
import { formMixins } from "@/mixins/formMixins";
import { uuid } from "vue-uuid";

export default {
  mixins: [notifMixins, formMixins],
  props: ["field", "index"],
  components: {},
  data: function() {
    return {
      edit: true,
      fieldId: "",
      response: "",
      clearable: true,
      readonly: true,
      valueDeterminate: 0,
      value: [],
      imageName: "",
      imageUrl: "",
      imageFile: "",
      headers: {},
      progressShow: false,
      uploaded: false,
      fileInfo: { id: "", filePath: "" },
      storageUri: "https://start.mikti.id/inovasi/public/uploads"
    };
  },
  created() {
    this.fieldId = this.field.field_template.id;

    this.imageUrl =
      this.storageUri + this.field.attachment[0].file_meta.file_path;

    this.value.push(this.field.attachment[0].file_meta.id);
    this.fileInfo.id = this.field.attachment[0].file_meta.id;
    this.fileInfo.filePath = this.field.attachment[0].file_meta.file_path;
  },
  watch: {
    fileInfo: function() {
      var params = { field_template_id: this.fieldId, value: this.value };
      bus.$emit("getValue", params, this.index);
    }
  },
  mounted() {},
  methods: {
    pickFile() {
      this.$refs.image.click();
    },
    onFilePicked(e) {
      this.progressShow = false;
      const files = e.target.files;
      if (files[0] !== undefined) {
        this.imageName = files[0].name;
        var name = this.$uuid.v4() + "_" + files[0].name;
        var str = name.replace(/\s/g, "");
        this.headers["name"] = str;
        if (this.imageName.lastIndexOf(".") <= 0) {
          return;
        }
        const fr = new FileReader();
        fr.readAsDataURL(files[0]);
        fr.addEventListener("load", () => {
          this.imageUrl = fr.result;
          this.imageFile = files[0]; // this is an image file that can be sent to server...
        });
      } else {
        this.imageName = "";
        this.imageFile = "";
        this.imageUrl = "";
      }
    },
    uploadFile: function() {
      this.headers["Content-Type"] = "image/*";
      this.headers["Authorization"] = auth.getToken();
      var app = this;
      this.progressShow = true;
      this.axios
        .post(
          config.baseUri + "/team/" + this.$route.params.teamId + "/file",
          this.imageFile,
          {
            headers: this.headers,
            onUploadProgress(e) {
              if (e.lengthComputable) {
                // console.log((e.loaded / e.total) * 100);
                app.valueDeterminate = Math.round((e.loaded / e.total) * 100);
              }
            }
          }
        )
        .then(res => {
          this.response = res.data.data;
          this.value[0] = res.data.data.id;
          this.fileInfo = res.data.data.file_path;
          this.uploaded = true;
        })
        .catch(res => {
          this.uploaded = false;
        })
        .finally(() => {
          this.progressShow = false;
        });
    },
    removeAttachment: function() {
      // this.field.attachment = [];
      this.imageUrl = null;
      this.edit = false;
    }
  }
};
</script>
<style scoped>
</style>
