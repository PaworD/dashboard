<template>
  <v-app id="inspire">
    <v-app-bar app elevation="1" dense color="white">
      <v-icon class="pr-2">mdi-cards</v-icon>
      <v-toolbar-title>My Pathway</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text small color="teal" to="my-pathway/create-new">
        New Pathway
      </v-btn>
    </v-app-bar>

    <v-content>
      <v-container>
        <v-row>
          <span class="title" v-if="!pathway">No Pathway Information found</span>
          <v-col v-for="pw of pathway" :key="pw['.key']" md="4" lg="4" sm="6" xl="4">
            <v-card class="mx-auto">
              <v-img class="align-end" contain :src="pw.imgUrl" height="250"></v-img>
              <v-speed-dial top left absolute direction="right" open-on-hover>
                <template v-slot:activator>
                  <v-btn color="white" fab small>
                    <v-icon>mdi-dots-horizontal-circle-outline</v-icon>
                  </v-btn>
                </template>
                <v-btn fab dark small color="green" @click="edit(pw['.key'])">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn fab dark small color="red" @click="rmDialog = true">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </v-speed-dial>
            </v-card>
            <v-dialog v-model="rmDialog" max-width="300">
              <v-card class="pa-2">
              <v-card-text class="title">Are you sure to delete this post?</v-card-text>
              <v-card-actions>
                <v-btn text @click="rmDialog = false">Cancel</v-btn>
                <v-btn text @click="removeCard(pw['.key'])">Yes</v-btn>
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
  data() {
    return {
      rmDialog: false,
      pathway: []
    };
  },
  firebase: {
    pathway: db.ref("experience")
  },
  methods: {
    removeCard(id) {
      db.ref("experience")
        .child(id)
        .remove();
    },
    edit(ExpId){
      this.$router.push({name: 'edit-pathway', params : {ExpId: ExpId }})
    }
  }
};
</script>
