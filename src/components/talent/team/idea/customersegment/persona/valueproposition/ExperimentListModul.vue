<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="12">
        <template v-for="data in template.fields">
          <v-card flat>
            <v-card-title class="subtitle-1">{{data.field_template.name}}</v-card-title>

            <v-card-text v-if="data.selected_options" class="subtitle-1">
              <template v-for="opt in data.selected_options">
                <v-icon :key="opt.id" left v-if="opt.option.name == 'Pivot'">call_split</v-icon>
                <v-icon :key="opt.id" left v-if="opt.option.name == 'Persevere'">lock</v-icon>
                {{opt.option.name}}
              </template>
            </v-card-text>
            <v-card-text
              v-if="data.value"
              style="white-space: pre-wrap;"
              class="subtitle-1"
            >{{data.value}}</v-card-text>
            <v-card-text v-for="data in data.attachment" class="subtitle-1">
              <template v-if="getExtension(data.file_meta.file_path) == 'pdf'">
                <v-row>
                  <v-col md="4">
                    <v-img
                      src="https://www.sandhata.com/wp-content/uploads/2016/11/pdf-icon.png"
                      contain
                      max-height="100"
                    />
                  </v-col>
                  <v-col md="4">
                    <v-btn
                      fab
                      small
                      color="accent"
                      :href="storageUri + data.file_meta.file_path"
                      target="_blank"
                    >
                      <v-icon>pageview</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </template>

              <template v-else>
                <span class="grey--text font-weight-light" v-if="data.attachment.length != 0">
                  <template v-for="file in data.attachment">
                    <!-- {{file.file_meta.file_path}} -->
                    <v-row align="center" justify="center" :key="file.id">
                      <v-img
                        :src="storageUri + file.file_meta.file_path"
                        lazy-src="https://picsum.photos/id/11/10/6"
                        aspect-ratio="1"
                        class="grey lighten-2"
                        max-width="750"
                        contain
                        max-height="500"
                      ></v-img>
                    </v-row>
                  </template>
                </span>
              </template>
            </v-card-text>
          </v-card>
        </template>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  props: ["template"],
  data() {
    return {
      ext: "",
      storageUri: "https://start.mikti.id/inovasi/public/uploads"
    };
  },
  methods: {
    getExtension(filepath) {
      return filepath.split(".").pop();
    },
    inludesYoutube(str) {
      return str.includes("youtube.com");
    }
  }
};
</script>
<style scoped>
</style>