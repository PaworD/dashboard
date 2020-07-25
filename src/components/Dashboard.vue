<template>
  <v-app id="inspire">
    <v-app-bar app elevation="1" dense color="white">
      <v-icon class="pr-2">mdi-view-dashboard</v-icon>
      <v-toolbar-title>My Dashboard</v-toolbar-title>
      
      <v-spacer></v-spacer>
      <v-btn  text rounded href="https://khalimjanov.netlify.com/">
          <v-icon class="px-2">
              mdi-open-in-new
          </v-icon>
          Go to website
      </v-btn>
    </v-app-bar>

    <v-content>
        <v-container>
            <v-row>
                <v-col sm="4" lg="4" md="4">
  <v-card
    class="mt-4 mx-auto"
    max-width="400"
  >
    <v-sheet
    height="100"
      class="v-sheet--offset mx-auto"
      color="white"
      elevation="5"
      max-width="calc(100% - 32px)"
    >
      <v-sparkline

        :value="value"
        color="black"
        line-width="1"
        padding="16"
        stroke-linecap="round"
        smooth
      ></v-sparkline>
    </v-sheet>

    <v-card-text class="pt-0">
      <div class="display-1 font-weight-light mb-2">Views</div>
      <div class="subheading font-weight-light grey--text">Pathway views statistics</div>
      <v-divider class="my-2"></v-divider>
      <v-icon
        class="mr-2"
        small
        :color="status"
      >
        mdi-circle
      </v-icon>
      <span class="caption grey--text font-weight-light">Updated</span>
      <v-btn x-small absolute right icon></v-btn>
    </v-card-text>
  </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-content>
  </v-app>
</template>

<script>
  import {db} from '../firebase'

  export default {
    data: () => ({
      status: 'white',
      value: [],
    }),
    firebase : {
      
    },

    methods : {
      updateViews(){
        let root = db.ref("experience");
        try {
  root.once("value", (snapshot)=>{
          snapshot.forEach((child) => {
            this.value.push(child.child("views").val());
            this.status = 'green'
          })
        })
        } catch (e){
          this.status = 'red'
        }
      

      }
    },
    mounted() {
      this.updateViews();
    },
  }
</script>

<style scoped>
  .v-sheet--offset {
    top: -24px;
    position: relative;
  }
</style>