import {createMemoryHistory, createRouter, createWebHistory} from 'vue-router'
import Home from "../pages/Home.vue";
import MovieDetail from "../components/MovieDetail.vue";
import Whishlist from "../components/Whishlist.vue";


const routes = [
    {path: '/', component: Home},
    {path: '/movie/:id', component: MovieDetail},
    {path: '/wishlist', component: Whishlist},
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router