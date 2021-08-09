<template>
 
<Nav/>
<div v-if="tv">
    <div class="film-grid">
      <div class="film-left">
          <img v-if="tv.poster_path" :src="'https://image.tmdb.org/t/p/w500' + tv.poster_path" alt="">
           <img class="bg-gray-300 h-full" v-else src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg" alt="">
      </div>
      <div class="film-right">
          <h1 class='tv-name'>{{tv.title}} <span>({{tv.release_date}})</span></h1>
          <div>
          <span class='text-sm font-semibold' v-for="genre in tv.genres" :key="genre.id">
               {{genre.name}} - 
          </span>
          <span>{{tv.runtime}}m</span>
          </div>
          <div class="user-score">
          <div class="vote-container mr-2">
              <span class="vote-tv">{{tv.vote_average}}</span>
              </div>
              <span class='font-bold text-black'>User Score</span>
          </div>
          <h2 v-if="tv.tagline" class='my-3 text-gray-700 italic text-lg'>{{tv.tagline}}</h2>
          <h2 v-else class='my-3 text-gray-700 italic text-lg'>There is no Tag for {{tv.title}}</h2>
          <h2 class='font-bold text-black text-xl mb-3'>Overview</h2>
          <p v-if="tv.overview" class='font-thin text-base text-black opacity-90'>{{tv.overview}}</p>
          <p v-else class='font-thin text-base text-black opacity-90'>We don't have an overview translated in English. Help us expand our database by adding one.</p>
          <div class="creator-tv-grid mt-5">
              <div v-for="creator in tv.created_by" :key="creator.id">
                  <h1 class='font-bold text-black'>{{creator.name}}</h1>
                  <h1 class="font-thin text-base text-black opacity-90">Creator</h1>
              </div>
          </div>
      </div>

  </div>
</div>
<MovieCredits v-if="tv" :id='tv.id'/>
<ReviewMovie v-if="tv" :id="tv.id" :tv='tv'/>
<div class="recommends-container ">
  <div class="Popular-section">
      <div class="ontv-flex">
      <h1 v-if="recommends">Recommendations</h1>
      </div>
  </div>
  <div v-if="recommends" class='px-2'>
  <transition name="fade" appear>
  <swiper 
    :scrollbar="{ draggable: true }"
    :breakpoints='breakpoints'
  >
    <swiper-slide v-for="recommend in recommends" :key='recommend.id' class='pb-4'>
        <div class="single-recommend">
            <router-link :to="{name:'Movie',params:{id:recommend.id}}">
            <div class="recommend-img-container">
           <img :src="'https://image.tmdb.org/t/p/w250_and_h141_face' + recommend.backdrop_path" alt="">
            </div>
             </router-link>
            <div>
                <router-link :to="{name:'Movie',params:{id:recommend.id}}">
            <h1 class='font-bold text-black text-xs pb-4 pt-2 show-name'>{{recommend.title}}</h1>      
                </router-link>
            </div>
        </div>
    </swiper-slide>
    ...
  </swiper>
  </transition>
  </div>
  <div v-else>
<Spinner/>
  </div>
     <div class='px-10 pb-8' v-if=" recommends && recommends.length === 0">
  We don't have any recommends.
  </div>
</div>
<div v-if="tv && recommends">
<Footer/>
</div>
</template>

<script>
import ReviewMovie from '../components/ReviewMovie.vue'
import MovieCredits from '../components/MovieCredits.vue'
import Footer from '../components/Footer.vue'
import { ref } from '@vue/reactivity'
import Nav from '../components/Nav.vue'
import Spinner from '../components/Spinner'
 import 'swiper/swiper-bundle.css';
  SwiperCore.use([ A11y,Navigation,EffectFade,Scrollbar]);
import SwiperCore, { Navigation, A11y, EffectFade, Scrollbar } from 'swiper';
  // Import Swiper Vue.js components
  import { Swiper, SwiperSlide } from 'swiper/vue';
export default {
    components:{Nav,MovieCredits,ReviewMovie,Swiper,SwiperSlide,Spinner,Footer},
    props:['id'],
    setup(props) {
        const tv = ref(null)
        const recommends = ref(null)
        const getTv = async(id)=>{
            try {
                const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=ed1aa33b88ae96e77b8399f90b321035&language=en-US`)
                const data = await res.json()
                tv.value = data 
            } catch (error) {
                console.log(error)
            }
        }

        getTv(props.id)
        const getRecommends = async(id)=>{
            try {
                const res = await fetch(`https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=ed1aa33b88ae96e77b8399f90b321035&language=en-US&page=1`)
                const data = await res.json()
                recommends.value = data.results
                console.log(data)
                
                
            } catch (error) {
                console.log(error)
            }
            
        }
      
        getRecommends(props.id)
             const breakpoints = ref({
          280: {
      slidesPerView: 2,
      spaceBetween: 10  
    },
    320: {
      slidesPerView: 2,
      spaceBetween: 10  
    },
    414:{
        slidesPerView:3,
        spaceBetween:5
    },
    492:{
        slidesPerView:3,
        spaceBetween:10
    },
    // when window width is >= 480px
    663: {
      slidesPerView: 3,
      spaceBetween: 10
    },
    1024: {
      slidesPerView: 4,
      spaceBetween: 10
    },
    // when window width is >= 640px
    1025: {
      slidesPerView: 5,
      spaceBetween: 10
    },
        })


       

        return{tv,recommends,breakpoints}
    }

}
</script>
