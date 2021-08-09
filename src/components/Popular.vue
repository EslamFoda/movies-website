<template>
<div class="popular-cont">
  <div class="Popular-section">
      <div class="ontv-flex">
      <h1>What's Popular</h1>
      <div @click="handleSwitch" class="ontv-container">
      <div  class="ontv-wrapper first wrapper-active"><span class="ontv first ontv-active">On Tv</span></div>      
      <div class="ontv-wrapper sec"><span class="ontv sec">In Theaters</span></div>    
      </div>
      </div>
  </div>
  <div v-if="tvShows && movies" class='px-2'>
      <transition name="fade" appear>
  <swiper v-if="hideShow" class='pouplerSlider'
    :scrollbar="{ draggable: true }"
    :breakpoints='breakpoints'
  >
    <swiper-slide v-for="show in tvShows" :key='show.id'>
        <div class="singleShow">
            <router-link :to="{name:'Tv',params:{id:show.id}}">
            <div class="show-img-container">
                <img v-if="show.poster_path" :src="'https://image.tmdb.org/t/p/w500' + show.poster_path" alt="tv show">
                <img v-else class="img-shadow bg-gray-200" src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg" alt="tv show">
                <div class="rate-container">
                    <span class="rate">{{show.vote_average}}</span>
                </div>
            </div>
            </router-link>
            <div class="show-name-date">
                <router-link :to="{name:'Tv',params:{id:show.id}}">
                <h1 class="show-name text-sm">{{show.name}}</h1>
                 </router-link>
                <span class='text-gray-400 text-sm block'>{{show.first_air_date}}</span>
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
    <swiper-slide v-for="movie in movies" :key='movie.id'>
        <div class="singleShow">
            <router-link :to="{name:'Movie',params:{id:movie.id}}">
            <div class="show-img-container">
                <img v-if="movie.poster_path" :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path" alt="tv show">
                <img v-else class="img-shadow bg-gray-200" src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg" alt="tv show">
                <div class="rate-container">
                    <span class="rate">{{movie.vote_average}}</span>
                </div>
            </div>
            </router-link>
            <div class="show-name-date">
                <router-link class="link" :to="{name:'Movie',params:{id:movie.id}}">
                <h1 class="show-name text-sm">{{movie.title}}</h1>
                </router-link>
                <span class='text-gray-400 text-sm block'>{{movie.release_date}}</span>
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
</div>
</template>

<script>
import Spinner from '../components/Spinner'
import SwiperCore, { Navigation, A11y, EffectFade, Scrollbar } from 'swiper';
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
        const tvShows = ref(null)
        const movies = ref(null)
        const getShow = async()=>{
            try {
                const res = await fetch('https://api.themoviedb.org/3/tv/popular?api_key=ed1aa33b88ae96e77b8399f90b321035&language=en-US&page=1',{
                method:'GET',
                headers: {'Content-Type': 'application/json'}})
                const data = await res.json()
                tvShows.value = data.results
                
            } catch (error) {
                console.log(error)
            }
            
        }
        const getMovies = async()=>{
            try {
                const res = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=ed1aa33b88ae96e77b8399f90b321035&language=en-US&page=1',{
                method:'GET',
                headers: {'Content-Type': 'application/json'}})
                const data = await res.json()
                movies.value = data.results
                
            } catch (error) {
                console.log(error)
            }
            
        }
        getShow()
        getMovies()

        const handleSwitch = (e)=>{
            const firstTv = document.querySelector('.ontv.first')
            const secTv = document.querySelector('.ontv.sec')
            const wrapperFirst = document.querySelector('.ontv-wrapper.first')
            const wrapperSec = document.querySelector('.ontv-wrapper.sec')
            hideActive()
            if(e.target.textContent === 'On Tv' || e.target.classList.contains('ontv-wrapper first')){
               firstTv.classList.add('ontv-active')
               wrapperFirst.classList.add('wrapper-active')
               hideMovies.value = false
               hideShow.value = true
            }if(e.target.textContent === 'In Theaters' || e.target.classList.contains('ontv-wrapper sec')){
                secTv.classList.add('ontv-active')
               wrapperSec.classList.add('wrapper-active')
               hideMovies.value = true
               hideShow.value = false
            }
        }


        const hideActive = ()=>{
            const tvWrapper = document.querySelectorAll('.ontv-wrapper')
            const tv = document.querySelectorAll('.ontv')
            tvWrapper.forEach(wrap=>{
                wrap.classList.remove('wrapper-active')
            })
            tv.forEach(t=>{
                t.classList.remove('ontv-active')
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
        

        return{handleSwitch,tvShows,hideShow,movies,hideMovies,breakpoints}
    }
}
</script>

<style>
.popular-cont{
    background-image: url(https://www.themoviedb.org/assets/2/v4/misc/trending-bg-39afc2a5f77e31d469b25c187814c0a2efef225494c038098d62317d923f8415.svg);
    background-position: bottom;
    background-repeat:no-repeat;
}
.Popular-section{
    padding: 2.3rem 2.5rem;
}
.ontv-wrapper{
    display: inline-block;
    padding: .2rem .8rem;
    border-radius: 3rem;
    cursor: pointer;
  
}
.img-shadow{
     box-shadow: 0 0 .3rem rgba(0, 0, 0, 0.247);
}
.ontv{
  padding: 0 .5rem;
  font-weight: bold;
}
.ontv-active{
  background-image: linear-gradient(to right, rgba(30,213,169, 1) 0%, rgba(1,180,228, 1) 100%);
    background-size: 100%;
    -webkit-background-clip: text;
    -moz-background-clip: text;
    -webkit-text-fill-color: transparent; 
    -moz-text-fill-color: transparent;
}
.wrapper-active{
    background-color: #032541;
    transition: all .5s ease;
}
.ontv-flex{
    display: flex;
    align-items: center;
}
.pouplerSlider{
    padding-bottom: 1.3rem;
    padding-top: 1rem;
}
.ontv-flex h1{
    font-size:1.3rem;
    font-weight: bold;
    margin-right: 1rem;
}
.ontv-container{
    display: flex;
    align-items: center;
    border: 1px solid black;
    border-radius: 3rem;
}

.show-img-container{
    height: 250px;
    width: 100%;
    position: relative;
    border-radius: 8px;
   
}
.show-img-container img{
    height: 100%;
    width: 100%;
    overflow: hidden;
    border-radius: 8px;
    box-shadow: 0 0 .3rem rgba(0, 0, 0, 0.274);
}
.rate-container{
    background-color: #032541;
    display: inline-block;
    text-align: center;
    border-radius: 50%;
    border: 2px solid rgba(30,213,169, 1);
    height: 2.5rem;
    width: 2.5rem;
    position: absolute;
    bottom: -1rem;
    left: .5rem;
    z-index: 1561561;
}
.rate{
    color: white;
    display: inline-block;
    margin-top: .4rem;
}
.show-name-date{
    margin-top: 1.5rem;
    width: fit-content;
}
.show-name{
    font-size:1rem;
    font-weight: bold;
    width: fit-content;
    width: moz-fit-content;
    display: inline;
}
.show-name:hover{
    color: rgb(0, 0, 0);
}
.link{
    width:fit-content;
    width: moz-fit-content;
}
.fade-enter-from{
    opacity: 0;
}
.fade-enter-to{
    opacity: 1;
}
.fade-enter-active{
    transition: all .6s ease-in-out;
}

</style>