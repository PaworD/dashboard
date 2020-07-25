<template>
  <div>
    <v-container>
      <v-row>
        <v-col md="6" lg="6" sm="6">
          <v-card class="mx-auto pa-2" outlined>
            <v-card-title class="headline pa-3">Project Wizard</v-card-title>
            <v-card-text>
              <v-text-field v-model="project.title" label="Project Name" hint="For Example: My First Project"></v-text-field>
              <v-row>
                <v-col cols="8">
                  <v-text-field
                    v-model="link"
                    label="Link to your project"
                    hint="For example, http://my-site.com/project-name/download"
                    aria-required
                  ></v-text-field>
                </v-col>
                <v-col cols="4">
                  <v-checkbox v-model="project.isApp" label=" is Application">
                  </v-checkbox>
                </v-col>
              </v-row>
              <v-row>
                <v-combobox
                    v-model="project.coverImg"
                    :items="items_link"
                    :item-text="items_text"
                    label="Select Images from My Storage"
                    outlined
                    hide-no-data
                    dense
                ></v-combobox>
              </v-row>
              <v-row>
                <v-textarea v-model="project.description" outlined label="Description"></v-textarea>
              </v-row>
            </v-card-text>
            <v-card-actions>
              <v-btn text block @click="addNewProject()">Save Changes & Upload</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
            
            <!-- Preview Section -->
        <v-col md="6" lg="6" sm="6">
          <v-card :class="!project.link == '' ? '' : 'mx-auto pa-2 preview' " max-width="290" :elevation="project.link != '' ? '2' : '0'">
            <v-img
                class="align-end"
                contain
                :src="project.coverImg"
              >
                <v-row align="center" justify="center" class="mx-auto">
                <v-card-title  class="grey--text" v-if="project.title == ''">
                    Preview
                </v-card-title>
                <v-card-title>
                    {{project.title}}
                </v-card-title>
                </v-row>

                  </v-img>           
          </v-card>
        </v-col>
      </v-row>
      <v-snackbar v-model="isPublished" right bottom color="teal">
          Completed
      </v-snackbar>
    </v-container>
  </div>
</template>

<script>

import {db} from '../firebase'
import * as firebase from "firebase/app";

export default {
  data() {
    return {
      link: "",
      project: {
        title: "",
        description: "",
        imgUrl: '',
        coverImg: '',
        link: '',
        isApp: false

      },
      items_link: [],
      items_text: [],
      isPublished: false
    };
  },
  firebase : { 
      firedb : db.ref('projects'),
},
  methods: {


    arrayRemove(arr, value) {
      return arr.filter(function(ele) {
        return ele != value;
      });
    },

    getCoverImages(){
        const imageList = firebase.storage().ref().child('project-covers');
        imageList.listAll().then((res) => {
            res.items.map((val)=>{
                val.getDownloadURL().then((url) => {this.items_link.push(url)})
                this.items_text.push(val.name)
            })
        })

    },

    addNewProject(){
        db.ref('projects').push(this.project).then(() => {
            this.isPublished = true;
        }).catch((err)=> {
            return err;
        }).then(() => {
            this.$router.push({name: 'my-projects'})
        })
    },

    addTag() {
      this.project.tags.push(this.tag);
    },

    removeTag(tag) {
      this.project.tags = this.arrayRemove(this.project.tags, tag);
    }
  },
  mounted(){
      this.getCoverImages()
  }
};
</script>

<style scoped>
.preview {
    border: 2px dashed #ccc;
}

</style>