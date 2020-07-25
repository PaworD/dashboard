<template>
    <div>
        <v-container>
            <v-row>
                <v-col md="6" lg="6" sm="6">
                    <v-card outlined class="mx-auto pa-2">
                        <v-row>
                            <v-col>
                                <v-text-field v-model="exp.title" solo label="Pathway Label" hint="Name of Pathway"></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <v-combobox
      v-model="exp.tags"
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
                    v-model="exp.imgUrl"
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
                                <v-date-picker landscape show-current="false" v-model="exp.date"></v-date-picker>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <v-textarea solo label="Tags" v-model="exp.description"></v-textarea>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <v-btn text block @click="save()">Save & Changes</v-btn>
                            </v-col>
                        </v-row>
                        
                    </v-card>
                </v-col>
            </v-row>
            <v-snackbar v-model="isUpdated" timeout="1000" right top color="success">
                Successfuly Updated !
                <v-btn color="white" text @click="isUpdated = false">
                    Close
                </v-btn>
            </v-snackbar>
        </v-container>
    </div>
</template>


<script>

import * as firebase from 'firebase'
import {db}from '../firebase'

export default {
    data(){
        return {
            items_image: [],
            items_tags : ['PHP', 'C++', 'C#', 'WebDev', 'Vuetify', 'Vue', 'Flutter', 'Material'],
            ExpId : this.$route.params.ExpId,
            exp: {},
            images: [], 
            searchTag: null,
            isUpdated: false

        };
    },
    methods: {
        get(){
            db.ref('experience').child(this.ExpId).once('value').then((snapshot) => {
                this.exp = snapshot.val();

            })
        },
        save(){
            db.ref('experience').child(this.ExpId).update(this.exp).then(() => {
                this.isUpdated = true;
            });
        },
        getImages(){
        const imageList = firebase.storage().ref().child('project-covers');
        imageList.listAll().then((res) => {
            res.items.map((val)=>{
                val.getDownloadURL().then((url) => {this.items_image.push(url)})
            })
        })

    },
    },
      watch: {
        tags(val) {
          if (val.length > 5) {
              this.$nextTick(() => this.exp.tags.pop())
          }
      }
  },
    mounted(){
        this.ExpId = this.$route.params.ExpId;
        this.get();
        this.getImages();
    }
}
</script>

<style scoped>
    
</style>