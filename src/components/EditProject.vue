<template>
    <div>
        <v-container>
            <v-row>
                <v-col md="6" lg="6" sm="6">
                    <v-card outlined class="mx-auto pa-2">
                        <v-row>
                            <v-col>
                                <v-text-field  v-model="pro.title" outlined label="Project Label" hint="Title of Project" ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <v-text-field v-model="pro.link" outlined label="Link for Project" hint="Link for Project"></v-text-field>
                            </v-col>
                        </v-row>
                            <v-row>
                  <v-col>
                    <v-combobox
                    v-model="pro.coverImg"
                    :items="items_image"
                    label="Cover Image from My Storage"
                    outlined
                    hide-no-data
                    dense
                ></v-combobox>
                  </v-col>
              </v-row>
                                          <v-row>
                  <v-col>
                    <v-combobox
                    v-model="pro.imgUrl"
                    :items="items_full_image"
                    label="Main Image from My Storage"
                    outlined
                    hide-no-data
                    dense
                ></v-combobox>
                  </v-col>
              </v-row>

                        <v-row>
                            <v-col>
                                <v-textarea solo label="Tags" v-model="pro.description"></v-textarea>
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
            items_full_image: [],
            ProId : this.$route.params.ProId,
            pro: {},
            images: [], 
            isUpdated: false

        };
    },
    methods: {
        get(){
            db.ref('projects').child(this.ProId).once('value').then((snapshot) => {
                this.pro = snapshot.val();

            })
        },
        save(){
            db.ref('projects').child(this.ProId).update(this.pro).then(() => {
                this.isUpdated = true;
            }).then(() => {
                this.$router.push({name: 'my-projects'})
            });
        },
        getCoverImages(){
        const imageList = firebase.storage().ref().child('project-covers');
        imageList.listAll().then((res) => {
            res.items.map((val)=>{
                val.getDownloadURL().then((url) => {this.items_image.push(url)})
            })
        })

    },
        getFullImages(){
        const imageList = firebase.storage().ref().child('projects');
        imageList.listAll().then((res) => {
            res.items.map((val)=>{
                val.getDownloadURL().then((url) => {this.items_full_image.push(url)})
            })
        })

    },
},
    mounted(){
        this.ProId = this.$route.params.ProId;
        this.get();
        this.getCoverImages();
        this.getFullImages();
    }
}
</script>

<style scoped>
    
</style>