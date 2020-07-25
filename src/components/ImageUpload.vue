<template>
  <div>
    <v-container>
      <v-row class="mx-auto">
        <v-col sm="4" md="4" lg="4">
          <v-card outlined :loading="isLoading" loader-height="2" light>
            <v-card-title class="titile font-weight-bold">Upload Image to My Storage</v-card-title>
            <v-card-text>
              <v-row class="px-3">
                <v-select
                label="Choose DB folder"
                :items="locations"
                v-model="location"
                aria-required="true">

                </v-select>
              </v-row>
              <v-row align="center" class="px-3">
                <v-file-input
                  type="file"
                  solo
                  label="File Input"
                  @change="previewImage"
                  accept="image/*"
                  aria-required
                ></v-file-input>
              </v-row>
            </v-card-text>
            <v-card-text>
              <span>Uplod path in the server:  </span> <v-text-field disabled v-model="location"></v-text-field>
                          <v-row align="center" class="px-3" justify="center">
                <v-progress-linear id="progress" :value="uploadValue" aria-valuemax="100"></v-progress-linear>
              </v-row>
            </v-card-text>
            <v-card-actions>
              <v-btn color="teal" class="white--text" block right small @click="onUpload">
                <v-icon class="mr-2" small>
                  mdi-cloud-upload
                </v-icon>
                Upload
                </v-btn>
            </v-card-actions>
            
          </v-card>
        </v-col>
      </v-row>
    </v-container>

  </div>
</template>

<script>
import * as firebase from "firebase/app";

export default {
  name: "Upload",
  data() {
    return {
      imageData: null,
      picture: null,
      uploadValue: 0,
      isLoading: false,
      locations: ['projects', 'project-covers'],
      location: ''
    };
  },
  methods: {
    previewImage() {
      this.uploadValue = 0;
      this.picture = null;
      this.imageData = event.target.files[0];
    },

    onUpload() {
      this.picture = null;
      const storageRef = firebase
        .storage()
        .ref(`${this.location}/${this.imageData.name}`)
        .put(this.imageData);
      storageRef.on(
        `state_changed`,
        (snapshot) => {
          this.uploadValue =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        error => {
          console.log(error.message);
        },
        ()=>{this.uploadValue=100;
          storageRef.snapshot.ref.getDownloadURL().then((url) => {
            this.picture = url;
          });
        }
    );
    }
  }
};
</script>

<style scoped>
img.preview {
  width: 200px;
}
</style>