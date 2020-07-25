<template>
  <v-app>
    <div class="d-flex">
      <v-navigation-drawer app v-model="drawer" color="white" mini-variant permanent>
        <v-list dense nav class="py-0">
          <v-list-item two-line class="px-0">
            <v-list-item-avatar color="grey">
              <span class="white--text">J</span>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>PERSONAL BLOG</v-list-item-title>
              <v-list-item-subtitle>Javlon Khalimjanov</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-divider class="mb-1"></v-divider>

          <v-list-item v-for="item in items" :key="item.title" link :to="item.link">
            <v-tooltip right>
              <template v-slot:activator="{on}">
                <v-list-item-icon v-if="!item.disabled" class="teal--text" >
                  <v-icon v-on="on" >{{ item.icon }}</v-icon>
                </v-list-item-icon>
              </template>
              <span>{{item.hint}}</span>
            </v-tooltip>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-content>
        <transition name="fade">
          <router-view></router-view>
        </transition>
      </v-content>
    </div>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data: () => ({
    drawer: true,
    items: [
      {
        title: "Dashboard",
        icon: "mdi-view-dashboard",
        hint: "Dashboard",
        link: "/my-dashboard",
        disabled: false
      },
      {
        title: "Posts",
        icon: "mdi-cards",
        hint: "My Posts",
        link: "/my-pathway",
        disabled: false
      },
      {
        title: "Projects",
        icon: "mdi-folder",
        hint: "My Projects",
        link: "/my-projects",
        disabled: false
      },
            {
        title: "Partions",
        icon: "mdi-bookshelf",
        hint: "My Partions",
        link: "/my-partions",
        disabled: false
      },
      {
        title: "Media",
        icon: "mdi-folder-multiple-image",
        hint: "My Storage",
        link: "/my-storage",
        disabled: false
      }
    ]
  }),
  methods: {}
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>