<template>
 
<Nav/>
<div v-if="tv">
    <div class="film-grid">
      <div class="film-left">
          <img v-if="tv.poster_path" :src="'https://image.tmdb.org/t/p/w500' + tv.poster_path" alt="">
           <img class="bg-gray-300 h-full" v-else src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg" alt="">
      </div>
      <div class="film-right">
          <h1 class='tv-name'>{{tv.name}} <span>({{tv.first_air_date}})</span></h1>
          <div>
          <span class='text-sm font-semibold' v-for="genre in tv.genres" :key="genre">
               {{genre.name}} - 
          </span>
          <span>{{tv.episode_run_time[0]}}m</span>
          </div>
          <div class="user-score">
          <div class="vote-container mr-2">
              <span class="vote-tv">{{tv.vote_average}}</span>
              </div>
              <span class='font-bold text-black'>User Score</span>
          </div>
          <h2 class='my-3 text-gray-700 italic text-lg'>{{tv.tagline}}</h2>
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
<TvCredits v-if="tv" :id='tv.id'/>
<ReviewTv v-if="tv" :id="tv.id" :tv='tv'/>
<div class="recommends-container ">
  <div class="Popular-section">
      <div class="ontv-flex">
      <h1 v-if="recommends">Recommendations</h1>
      </div>
  </div>
  <div v-if="recommends" class='px-2'>
  <transition name="fade" appear>
  <swiper v-if="recommends"
    :scrollbar="{ draggable: true }"
    :breakpoints='breakpoints'
  >
    <swiper-slide v-for="recommend in recommends" :key='recommend.id' class='pb-4'>
        <div class="single-recommend">
            <router-link :to="{name:'TvRecommend',params:{id:recommend.id}}">
            <div class="recommend-img-container">
           <img :src="'https://image.tmdb.org/t/p/w250_and_h141_face' + recommend.backdrop_path" alt="">
            </div>
             </router-link>
            <div>
                <router-link :to="{name:'TvRecommend',params:{id:recommend.id}}">
            <h1 class='font-bold text-black text-xs pb-4 pt-2 show-name'>{{recommend.name}}</h1>      
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
import ReviewTv from '../components/ReviewTv.vue'
import Footer from '../components/Footer.vue'
import TvCredits from '../components/TvCredits.vue'
import { ref } from '@vue/reactivity'
import Nav from '../components/Nav.vue'
import Spinner from '../components/Spinner'
 import 'swiper/swiper-bundle.css';
  SwiperCore.use([ A11y,Navigation,EffectFade,Scrollbar]);
import SwiperCore, { Navigation, A11y, EffectFade, Scrollbar } from 'swiper';
  // Import Swiper Vue.js components
  import { Swiper, SwiperSlide } from 'swiper/vue';
export default {
    components:{Nav,TvCredits,ReviewTv,Swiper,SwiperSlide,Spinner,Footer},
    props:['id'],
    setup(props) {
        const tv = ref(null)
        const recommends = ref(null)
        const getTv = async(id)=>{
            try {
                const res = await fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=ed1aa33b88ae96e77b8399f90b321035&language=en-US`)
                const data = await res.json()
                tv.value = data 
            } catch (error) {
                console.log(error)
            }
        }

        getTv(props.id)
        const getRecommends = async(id)=>{
            try {
                const res = await fetch(`https://api.themoviedb.org/3/tv/${id}/recommendations?api_key=ed1aa33b88ae96e77b8399f90b321035&language=en-US&page=1`,{
                method:'GET',
                headers: {'Content-Type': 'application/json'}})
                const data = await res.json()
                recommends.value = data.results
                
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

<style>
.film-grid{
    display: grid;
    grid-template-columns: 1fr 3fr;
    grid-gap: 1rem;
    background: linear-gradient(to right, rgb(0, 211, 98) 0%, rgb(7, 179, 170) 100%);
    padding: 1rem;

}
.film-left{
    border-radius: .4rem;
    overflow:hidden;
}
p{
    line-height: 1.5;
    font-weight: bold;
}
.vote{
    background: rgb(15, 232, 131);
    display: inline-block;
    border-radius: 50%;
}

H4{
    background: rgb(19, 221, 167);
    display: inline;
    padding: 1rem;
    margin-right: 1rem;
    border-radius: 2rem;
    cursor: pointer;
}
.nav{
    display: flex;
    align-items: center;
    
}
.tv-name{
    font-size: 1.5rem;
    color: black;
    font-weight: bolder;
}
.film-right{
    padding: 2rem 1rem; 
}
.vote-container{
    background-color: #032541;
    display: inline-block;
    text-align: center;
    border-radius: 50%;
    border: 2px solid rgb(74, 243, 204);
    height: 2.5rem;
    width: 2.5rem;
    z-index: 1561561;
}
.vote-tv{
    color: white;
    display: inline-block;
    margin-top: .4rem;
}
.creator-tv-grid{
    display: grid;
    grid-template-columns: repeat(3,1fr);
    gap: 3rem;
}
.recommend-img-container{
    border-radius: .5rem;
    overflow: hidden;
}
.recommend-img-container img{
    width: 100%;
    object-fit: cover;
}

@media only screen and (max-width: 562px){
    .film-grid{
        grid-template-columns: repeat(1,1fr);
    }
    .nav{
        font-size: smaller;
    }
    .nav h4{
        font-size: 1rem;
    }
}
@media only screen and (max-width: 356px){
    .nav{
        margin: .5rem 0;
    }
    .nav h4 {
        font-size: .7rem;
    }
    .header{
        font-size: 1.4rem;
    }
}
</style>