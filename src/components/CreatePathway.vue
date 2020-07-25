<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-card class="mx-auto pa-2" outlined>
            <v-card-title class="headline pa-3">Pathway Wizard</v-card-title>
            <v-card-text>
              <v-text-field v-model="experience.title" label="Pathway Title" hint="For Example: How I found PHP" solo></v-text-field>
              <v-row>
                <v-col>
                    <v-combobox
      v-model="experience.tags"
      :items="items_tags"
      :search-input.sync="searchTag"
      hide-selected
      hint="Maximum of 5 tags"
      label="Pathway Tags"
      multiple
      persistent-hint
      small-chips
      item-color="teal"
      solo
                    >
                        <template v-slot:no-data>
                            <v-list-item>
                        <v-list-item-content>
                            <v-list-item-title>
                            No results matching "<strong>{{ searchTag }}</strong>". Press <kbd>enter</kbd> to create a new one
                            </v-list-item-title>
                        </v-list-item-content>
                        </v-list-item>
                    </template>
                    </v-combobox>
                </v-col>
              </v-row>
              <v-row>
                  <v-col>
                    <v-combobox
                    v-model="experience.imgUrl"
                    :items="items_image"
                    label="Select Image from My Storage"
                    outlined
                    hide-no-data
                    dense
                ></v-combobox>
                  </v-col>
              </v-row>
              <v-row>
                  <v-col>
                  <v-date-picker v-model="experience.date" full-width reactive landscape color="teal" year-icon="mdi-calendar">
                  </v-date-picker>
                  </v-col>

              </v-row>
              <v-row>
                <v-col>
                    <v-textarea v-model="experience.description" solo label="Experience Description">
                    </v-textarea>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions>
                <v-btn text color="teal" block @click="addPathway()">
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

import * as firebase from 'firebase'
import {db}from '../firebase'

export default {
  data() {
    return {
        items_tags : ['PHP', 'C++', 'C#', 'WebDev', 'Vuetify', 'Vue', 'Flutter', 'Material'],
        searchTag: null,
        items_image: [],
        experience: {
            date: new Date().toISOString().substr(0,10),
            description: '',
            imgUrl: '',
            tags: [],
            title: '',
            views: 0
        },


    };
  },

  watch: {
      tags (val) {
          if (val.length > 5) {
              this.$nextTick(() => this.tags.pop())
          }
      }
  },
  methods: {
    getImages(){
        const imageList = firebase.storage().ref().child('project-covers');
        imageList.listAll().then((res) => {
            res.items.map((val)=>{
                val.getDownloadURL().then((url) => {this.items_image.push(url)})
            })
        })

    },
    addPathway(){
        db.ref('experience').push(this.experience).then(() => {
            console.log('Done!')
        }).catch((err)=> {
            console.log(err);
        })
    }
  },

  mounted(){
      this.getImages()
  }
};
</script>

<style scoped>
.preview {
    border: 2px dashed #ccc;
}

</style>