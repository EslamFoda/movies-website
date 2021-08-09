import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Movie from '../views/Movie.vue'
import Tv from '../views/Tv.vue'
import TvRecommend from '../views/RecommendTv.vue'
import MovieRecommend from '../views/RecommendMovies.vue'
import Search from '../views/Search.vue'
import Movies from '../views/Movies.vue'
import Tvs from '../views/Tvs.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path:'/movie/:id',
    name:'Movie',
    component:Movie,
    props:true
  },
  {
    path:'/tv/:id',
    name:'Tv',
    component:Tv,
    props:true
  },
  {
    path:'/tv/recommend/:id',
    name:'TvRecommend',
    component:TvRecommend,
    props:true
  },
  {
    path:'/movie/recommend/:id',
    name:'MovieRecommend',
    component:MovieRecommend,
    props:true
  },
  {
    path:'/search/:search',
    name:'Search',
    component:Search,
    props:true
  },
  {
    path:'/movie',
    name:'Movies',
    component:Movies
  },
  {
    path:'/tv',
    name:'Tvs',
    component:Tvs
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
