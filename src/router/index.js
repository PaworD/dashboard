import Vue from 'vue'
import VueRouter from 'vue-router';
import Pathway from '../components/Pathway'
import Projects from '../components/Projects'
import Dashboard from '../components/Dashboard'
import ImageUpload from '../components/ImageUpload'
import CreateProject from '../components/CreateProject'
import MyStorage from '../components/MyStorage'
import CreatePathway from '../components/CreatePathway'
import EditPathway from '../components/EditPathway'
import EditProject from '../components/EditProject'
import MyPartions from '../components/MyPartions'


Vue.use(VueRouter)

const router = new VueRouter({
    routes: [
        {path: '/', component: Dashboard},
        {path: '/my-dashboard', name: 'my-dashboard' , component: Dashboard},
        {path: '/my-pathway', component: Pathway},
        {path: '/my-pathway/create-new', component: CreatePathway},
        {path: '/my-pathway/edit-pathway/:ExpId',name: 'edit-pathway', component: EditPathway},
        {path: '/my-projects',name: 'my-projects' , component: Projects},
        {path: '/my-projects/upload', component: ImageUpload},
        {path: '/my-projects/create-new', component: CreateProject},
        {path: '/my-projects/edit-project/:ProId', name: 'edit-project' , component: EditProject},
        {path: '/my-storage', component: MyStorage},
        {path: '/my-partions', component: MyPartions},

    ] 
}); 

export default router;