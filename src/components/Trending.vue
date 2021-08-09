<template>
<div class="trending-container">
  <div class="Popular-section">
      <div class="ontv-flex">
      <h1>Trending</h1>
      <div @click="handleSwitch" class="ontv-container">
      <div  class="today-wrapper first wrap-active"><span class="today first today-active">Today</span></div>      
      <div class="today-wrapper sec"><span class="today sec">This Week</span></div>    
      </div>
      </div>
  </div>
  <div v-if="trendingToday && trendingWeek" class='px-2'>
      <transition name="fade" appear>
      
  <swiper v-if="hideShow" class='pouplerSlider'
    :scrollbar="{ draggable: true }"
    :breakpoints='breakpoints'

  >
    <swiper-slide v-for="today in trendingToday" :key='today.id'>
        <div class="singleShow">
            <div class="show-img-container">
                <img v-if="today.poster_path" :src="'https://image.tmdb.org/t/p/w500' + today.poster_path" alt="tv show">
                <img v-else class="img-shadow bg-gray-200" src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg" alt="tv show">
                <div class="rate-container">
                    <span class="rate">{{today.vote_average}}</span>
                </div>
            </div>
            <div class="show-name-date">
                 <router-link :to="{name:'Movie',params:{id:today.id}}">
                <h1 v-if="today.title" class="show-name">{{today.title}}</h1>
                </router-link>
                 <router-link :to="{name:'Tv',params:{id:today.id}}">
                <h1 v-if="today.name" class="show-name text-sm">{{today.name}}</h1>
                 </router-link>
                <span v-if="today.release_date" class='text-white text-sm block'>{{today.release_date}}</span>
                <span v-if="today.first_air_date" class='text-white text-sm block'>{{today.first_air_date}}</span>
            </div>
        </div>
    </swiper-slide>
    
    
    ...
  </swiper>
      </transition>
  <transition name="fade" appear>
  
  <swiper v-if="hideMovies" class='pouplerSlider'
    :scrollbar="{ draggable: true }"
    :breakpoints='breakpoints'

  >
    <swiper-slide v-for="week in trendingWeek" :key='week.id'>
        <div class="singleShow">
            <div class="show-img-container">
                <img v-if="week.poster_path" :src="'https://image.tmdb.org/t/p/w500' + week.poster_path" alt="tv show">
                 <img v-else class="img-shadow bg-gray-200" src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg" alt="tv show">
                <div class="rate-container">
                    <span class="rate">{{week.vote_average}}</span>
                </div>
            </div>
            <div class="show-name-date">
                <router-link :to="{name:'Movie',params:{id:week.id}}">
               <h1 v-if="week.title" class="show-name">{{week.title}}</h1>
                </router-link>
                  <router-link :to="{name:'Tv',params:{id:week.id}}">
                <h1 v-if="week.name" class="show-name text-sm">{{week.name}}</h1>
                </router-link>
                <span v-if="week.release_date" class='text-white text-sm block'>{{week.release_date}}</span>
                <span v-if="week.first_air_date" class='text-white text-sm block'>{{week.first_air_date}}</span>
            </div>
        </div>
    </swiper-slide>
    
    
    ...
  </swiper>
  </transition>
  </div>
  <div  v-else>
      <Spinner/>
  </div>
</div>
</template>

<script>
import SwiperCore, { Navigation, A11y, EffectFade, Scrollbar } from 'swiper';
import Spinner from '../components/Spinner'
  // Import Swiper Vue.js components
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import { ref } from '@vue/reactivity'
  // Import Swiper styles
  import 'swiper/swiper-bundle.css';
  SwiperCore.use([ A11y,Navigation,EffectFade,Scrollbar]);
export default {
    components:{Swiper,SwiperSlide,Spinner},
    setup(props) {
        const hideShow = ref(true)
        const hideMovies = ref(false)
        const trendingToday = ref(null)
        const trendingWeek = ref(null)
        const getShow = async()=>{
            try {
                const res = await fetch('https://api.themoviedb.org/3/trending/all/day?api_key=ed1aa33b88ae96e77b8399f90b321035&language=en-US&page=1',{
                method:'GET',
                headers: {'Content-Type': 'application/json'}})
                const data = await res.json()
                trendingToday.value = data.results
                
            } catch (error) {
                console.log(error)
            }
            
        }
        const getMovies = async()=>{
            try {
                const res = await fetch('https://api.themoviedb.org/3/trending/all/week?api_key=ed1aa33b88ae96e77b8399f90b321035&language=en-US&page=1',{
                method:'GET',
                headers: {'Content-Type': 'application/json'}})
                const data = await res.json()
                trendingWeek.value = data.results
                
            } catch (error) {
                console.log(error)
            }
            
        }
        getShow()
        getMovies()

        const handleSwitch = (e)=>{
            const firstTv = document.querySelector('.today.first')
            const secTv = document.querySelector('.today.sec')
            const wrapperFirst = document.querySelector('.today-wrapper.first')
            const wrapperSec = document.querySelector('.today-wrapper.sec')
            hideActive()
            if(e.target.textContent === 'Today' || e.target.classList.contains('today-wrapper first')){
               firstTv.classList.add('today-active')
               wrapperFirst.classList.add('wrap-active')
               hideMovies.value = false
               hideShow.value = true
            }if(e.target.textContent === 'This Week' || e.target.classList.contains('today-wrapper sec')){
               secTv.classList.add('today-active')
               wrapperSec.classList.add('wrap-active')
               hideMovies.value = true
               hideShow.value = false
            }
        }


        const hideActive = ()=>{
            const tvWrapper = document.querySelectorAll('.today-wrapper')
            const tv = document.querySelectorAll('.today')
            tvWrapper.forEach(wrap=>{
                wrap.classList.remove('wrap-active')
            })
            tv.forEach(t=>{
                t.classList.remove('today-active')
            })
            
        }
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
        slidesPerView:2,
        spaceBetween:10
    },
    492:{
        slidesPerView:3,
        spaceBetween:10
    },
    // when window width is >= 480px
    663: {
      slidesPerView: 4,
      spaceBetween: 10
    },
   
    769:{
       slidesPerView: 5,
      spaceBetween: 20
    },
    // when window width is >= 640px
    1025: {
      slidesPerView: 7,
      spaceBetween: 20
    },
        })
        

        return{handleSwitch,trendingToday,hideShow,trendingWeek,hideMovies,breakpoints}
    }
}
</script>

<style>
.trending-container{
      background: linear-gradient(to right, rgb(0, 211, 98) 0%, rgb(7, 179, 170) 100%);
}
.today-wrapper{
    display: inline-block;
    padding: .2rem .8rem;
    border-radius: 3rem;
    cursor: pointer;
  
}
.today{
  padding: 0 .5rem;
  font-weight: bold;
}
.today-active{
  background-image: linear-gradient(to right, rgba(30,213,169, 1) 0%, rgba(1,180,228, 1) 100%);
    background-size: 100%;
    -webkit-background-clip: text;
    -moz-background-clip: text;
    -webkit-text-fill-color: transparent; 
    -moz-text-fill-color: transparent;
}
.wrap-active{
    background-color: #032541;
    transition: all .5s ease;
}
</style>