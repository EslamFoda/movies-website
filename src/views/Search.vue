<template>
  <Nav/>
  
  <div v-if="results" class="search-section">
      <div v-for="result in results" :key="result.id">
      <div class="single-result">
          <div class="left-result">
              <div class="result-img-container">
              <img v-if="result.poster_path" :src="'https://image.tmdb.org/t/p/w94_and_h141_bestv2' + result.poster_path" alt="">
              <img v-else class='bg-gray-200' src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg" alt="">
              </div>
          </div>
          <div class="right-result">
              <router-link v-if="result.title" :to="{name:'Movie',params:{id:result.id}}">
              <h1 class="show-name">{{result.title}} - <span class='text-red-500 text-sm'>{{result.media_type}}</span></h1> 
              </router-link>
              <router-link v-else :to="{name:'Tv',params:{id:result.id}}">
              <h1 class="show-name">{{result.name}} - <span class='text-yellow-500 text-sm'>{{result.media_type}}</span></h1>
              </router-link>
              <span v-if="result.release_date" class='text-gray-400 text-sm block pb-4'>{{result.release_date}}</span>
              <span v-if="result.first_air_date" class='text-gray-400 text-sm block pb-4'>{{result.first_air_date}}</span>
              <span v-if="result.overview" class='blabla'>{{result.overview.substr(0, 170) + '...'}}</span>
              <span v-else>There is no description yet.</span>
          </div>
      </div>
      </div>
      <div v-if="results.length">
      <button v-if="page > 1" @click="handlePrev" class="previous-btn">Previous</button>
      <button v-else disabled @click="handlePrev" class="previous-btn">Previous</button>
      <span class='font-bold'>( {{page}} )</span>
      <button @click="handle" class="next-btn">Next</button>
      </div>
  </div>
  <div v-if="!results">
      <Spinner/>
  </div>
  <Footer v-if="results &&results.length"/>
</template>

<script>
import { ref } from '@vue/reactivity'
import Nav from '../components/Nav.vue'
import Spinner from '../components/Spinner.vue'
import Footer from '../components/Footer.vue'
export default {
    components:{Nav,Spinner,Footer},
    props:['search'],
    setup(props) {
        const page = ref(1)
        const results = ref(null)
        const getSearch = async(search,page)=>{
            const res = await fetch(`https://api.themoviedb.org/3/search/multi?api_key=ed1aa33b88ae96e77b8399f90b321035&language=en-US&query=${search}&page=${page}&include_adult=false`)
            const data = await res.json()
            results.value = data.results
        }
        
        getSearch(props.search)
        const handle = async()=>{
            page.value++
            await getSearch(props.search,page.value)
          
        }
        const handlePrev = async()=>{
            if(page.value != 1 && page.value > 1){
              page.value--
              await getSearch(props.search,page.value)
            }
        }


        return{results,page,handle,handlePrev}
    }

}
</script>

<style>
.single-result{
    display: flex;
    margin-bottom: 1rem;
    box-shadow: 0 0 .3rem rgba(0, 0, 0, 0.247);
    border-radius: .3rem;
    overflow: hidden;
}
.search-section{
    padding: 2.5rem;
}
.result-img-container{
    width: 94px;
    height:141px;
}
.result-img-container img{
    width: 100%;
    height: 100%;
}
.left-result{
    flex-basis: 0 0 100%;
}
.right-result{
    padding: 1rem;
}
.previous-btn{
    background: rgb(3, 36, 63);
    color: white;
    padding: .5rem 1rem;
    text-align: center;
    margin-right:1rem;
    border-radius: .5rem;
}
.next-btn{
    background: rgb(3, 36, 63);
    color: white;
    padding: .5rem 1.8rem;
    text-align: center;
    margin-left:1rem;
    border-radius: .5rem;
}
button:disabled{
    opacity: .5;
    cursor: not-allowed;
}
</style>