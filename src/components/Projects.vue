<template>
  <v-app id="inspire">
    <v-app-bar app elevation="1" dense color="white">
      <v-icon class="pr-2">mdi-folder</v-icon>
      <v-toolbar-title>My Projects</v-toolbar-title>
      
      <v-spacer></v-spacer>
      <v-btn x-small fab rounded color="white" elevation="3" class="mx-1" to="/my-projects/create-new">
          <v-icon  color="black">
              mdi-pencil
          </v-icon>
      </v-btn>
        <v-btn x-small fab rounded color="white" elevation="3" class="mx-1" to="/my-projects/upload">
          <v-icon  color="black">
              mdi-image-plus
          </v-icon>
      </v-btn>
    </v-app-bar>

    <v-content>
      <v-container>
        <v-row>
          <v-col v-for="project of projects" :key="project['.key']" md="4" lg="4" sm="6" xl="4">
            <v-card class="mx-auto">
              <v-img
                contain
                :src="project.coverImg"
                height="200"
                
              >
                  </v-img>           
                  <v-speed-dial top left absolute direction="right" open-on-hover>
    <template v-slot:activator>
        <v-btn
          color="white"
          fab
          small
        >
          <v-icon>mdi-dots-horizontal-circle-outline</v-icon>
        </v-btn>
      </template>
      <v-btn
        fab
        dark
        small
        color="green"
        @click="edit(project['.key'])"
      >
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
      <v-btn
        fab
        dark
        small
        color="red"
        @click="removeCard(project['.key'])"
      >
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </v-speed-dial>


                   </v-card>
              <v-dialog v-model="rmDialog" max-width="300">
              <v-card class="pa-2">
              <v-card-text class="title">Are you sure to delete this post?</v-card-text>
              <v-card-actions>
                <v-btn text @click="rmDialog = false">Cancel</v-btn>
                <v-btn text @click="removeCard(project['.key'])">Yes</v-btn>
              </v-card-actions>
              </v-card>
            </v-dialog>
          </v-col>
          
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { db } from "../firebase";

export default {
  data(){
    return {
      rmDialog: false,
      projects: []
    }
  },
  firebase : {
    projects : db.ref('projects')
  },
  methods: {
    removeCard(id) {
      db.ref("projects")
        .child(id)
        .remove();
        this.rmDialog = false;
    },
    
    edit(ProId){
      this.$router.push({name: 'edit-project', params : {ProId: ProId }})
    }
  }
};
</script>
