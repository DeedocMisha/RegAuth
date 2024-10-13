import { createRouter,createWebHashHistory } from "vue-router";
import MaIne from "./components/MaIne.vue";
import signin from "./components/SignIn.vue";


export default createRouter ({
    history: createWebHashHistory(),
    routes: [
       
        {path: '/',name:'home' ,component:MaIne},
        {path: '/signin',name:'signin' ,component:signin},

    ]
})
