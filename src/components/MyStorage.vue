<template>
    <div>
        <v-container fluid class="fill-height">
            <v-row>
                <v-col md="4" lg="4" sm="4" v-for="str in store" :key="str">
                    <v-card>
                        <v-img contain :src="str" height="250"> </v-img>
                    </v-card>
                </v-col>
                
                <v-col md=4 lg="4" sm="4">
                    <v-card height="250" elevation="0" class="add-new" id="dropzone" @dragover="dragover" @dragleave="dragleave" @drop="drop">
                        <span class="display-4 add" id="dropzone_text">{{drop_text}}</span>       
                    </v-card>
                </v-col>
                

            </v-row>
        </v-container>
    </div>
</template>

<script>
import * as firebase from 'firebase'

export default {
    data(){
        return {
            store: [],
            drop_text: '+', 
        }
    },
    methods: {
        get(){
        const main = firebase.storage().ref().child('projects');
        const covers = firebase.storage().ref().child('project-covers');
        main.listAll().then((res) => {
            res.items.map((val)=>{
                val.getDownloadURL().then((url) => {this.store.push(url)})
                
            })
        });
        covers.listAll().then((res) => {
            res.items.map((val)=>{
                val.getDownloadURL().then((url) => {this.store.push(url)})
                
            })
        })
        },

        dragover(e){
            e.preventDefault();
            this.drop_text = "Drop"
            
        },
        dragleave(){
            this.drop_text = "+"
        },
        drop(e){
            e.preventDefault();
            const image = e.dataTransfer.files[0];

            this.drop_text =image.name;
        }
    },
    mounted(){
        this.get()
    }
}
</script>

<style scoped>
    .add-new {
        border: 2px dashed #ccc;
    }
    .add{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        color: #ccc;
    }
</style>