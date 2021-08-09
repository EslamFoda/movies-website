<template>
<div class="credits-container">
  <div class="Popular-section">
      <div class="ontv-flex">
      <h1>Series Cast</h1>
      </div>
  </div>
  <div v-if="casts" class='px-2'>
  <transition name="fade" appear>
  <swiper class='pouplerSlider pt-1'
    :scrollbar="{ draggable: true }"
    :breakpoints='breakpoints'
  >
    <swiper-slide v-for="cast in casts" :key='cast.id'>
        <div class="singleCast">
            <div class="cast-img-container">
                <img v-if=" cast.profile_path" :src="'https://image.tmdb.org/t/p/w400' + cast.profile_path" alt="">
                <img v-else class="img-cast-notfound" src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg" alt="">
            </div>
           <div class="cast-details">
               <h1 class="cast-orginalname">{{cast.original_name}}</h1>
               <span class='text-xs'>{{cast.character}}</span>
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
    props:['id'],
    setup(props) {
        const casts = ref(null)
        const getCredits = async(id)=>{
            try {
                const res = await fetch(`https://api.themoviedb.org/3/tv/${id}/credits?api_key=ed1aa33b88ae96e77b8399f90b321035&language=en-US`,{
                method:'GET',
                headers: {'Content-Type': 'application/json'}})
                const data = await res.json()
                casts.value = data.cast
                
            } catch (error) {
                console.log(error)
            }
            
        }
      
        getCredits(props.id)

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
      
        
        

        return{casts,breakpoints}
    }
}
</script>
<style>

.singleCast{
    border-radius: .5rem;
    overflow: hidden;
     box-shadow: 0 0 .2rem rgba(0, 0, 0, 0.349);
}
.cast-orginalname{
     font-size:1rem;
    font-weight: bold;
}
.cast-details{
    padding: .4rem;
    line-height: 1.2;
}
.cast-img-container{
    height: 230px;
}
.cast-img-container img{
    height: 100%;
    width: 100%;
    object-fit: cover;
}
</style>