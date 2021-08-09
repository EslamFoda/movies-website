<template>
<Nav/>
  <div v-if="tvs" class="Popular-section">
      <div class="ontv-flex">
      <h1>Popular Movies</h1>
      </div>
      <div class="allmovies-grid">
          <div v-for="tv in tvs" :key="tv.id">
              <div class="singleShow someShadow h-full">
            <router-link :to="{name:'Tv',params:{id:tv.id}}">
            <div class="show-img-container">
                <img v-if="tv.poster_path" :src="'https://image.tmdb.org/t/p/w500' + tv.poster_path" alt="tv show">
                <img v-else class="img-shadow bg-gray-200" src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg" alt="tv show">
                <div class="rate-container">
                    <span class="rate">{{tv.vote_average}}</span>
                </div>
            </div>
            </router-link>
            <div class="show-name-date p-2">
                <router-link class="link" :to="{name:'Tv',params:{id:tv.id}}">
                <h1 class="show-name text-sm">{{tv.name}}</h1>
                </router-link>
                <span class='text-gray-400 text-sm block'>{{tv.first_air_date}}</span>
            </div>
        </div>
          </div>


      </div>
      <button @click="loadMore" class="loadmore">Load more</button>
  </div>
  <div v-else>
      <Spinner/>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import Nav from '../components/Nav.vue'
import Spinner from '../components/Spinner.vue'
export default {
    components:{Nav,Spinner},
    setup(props) {
        const tvs = ref(null)
        const page = ref(1)
         const getTvs = async()=>{
            try {
                const res = await fetch('https://api.themoviedb.org/3/tv/popular?api_key=ed1aa33b88ae96e77b8399f90b321035&language=en-US&page=1',{
                method:'GET',
                headers: {'Content-Type': 'application/json'}})
                const data = await res.json()
                tvs.value = data.results
                console.log(tvs.value)
                
            } catch (error) {
                console.log(error)
            }
            
        }
        getTvs()
        const loadMore = async()=>{
            
            page.value++
             const res = await fetch(`https://api.themoviedb.org/3/tv/popular?api_key=ed1aa33b88ae96e77b8399f90b321035&language=en-US&page=${page.value}`,{
                method:'GET',
                headers: {'Content-Type': 'application/json'}})
                const data = await res.json()
                const list = document.querySelector('.allmovies-grid')
                data.results.forEach(tv=>{
                    if(tv.poster_path){
                        let html =  `
                         <div class="singleShow someShadow">
                     <a href="/tv/${tv.id}">
                     <div class="show-img-container">
                         <img  src="https://image.tmdb.org/t/p/w500${tv.poster_path}" alt="tv show">
                         <div class="rate-container">
                             <span class="rate">${tv.vote_average}</span>
                         </div>
                     </div>
                     </a>
                     <div class="show-name-date p-2">
                         <a class="link" href="/tv/${tv.id}">
                         <h1 class="show-name text-sm">${tv.name}</h1>
                         </a>
                         <span class='text-gray-400 text-sm block'>${tv.first_air_date}</span>
                     </div>
                 </div>
                         `
         
                     list.innerHTML += html
                    }else{
                         let html =  `
                         <div class="singleShow someShadow">
                     <a href="/tv/${tv.id}">
                     <div class="show-img-container">
                          <img class="img-shadow bg-gray-200" src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg" alt="tv show">
                         <div class="rate-container">
                             <span class="rate">${tv.vote_average}</span>
                         </div>
                     </div>
                     </a>
                     <div class="show-name-date p-2">
                         <a class="link" href="/tv/${tv.id}">
                         <h1 class="show-name text-sm">${tv.name}</h1>
                         </a>
                         <span class='text-gray-400 text-sm block'>${tv.first_air_date}</span>
                     </div>
                 </div>
                         `
         
                     list.innerHTML += html
                    }
                })


            
        }


        return{tvs,loadMore}
    }

}
</script>

<style>
.allmovies-grid{
    display: grid;
    grid-template-columns: repeat(6,1fr);
    gap: 1.5rem;
    margin: 1rem 0 2rem 0;
}
.someShadow{
    box-shadow: 0 0 .3rem rgba(0, 0, 0, 0.37);
    border-radius: .4rem;
}
.loadmore{
    background: rgb(0, 183, 255);
    display: block;
    color: white;
    width: 100%;
    padding: .7rem 0;
    border-radius: .7rem;
    font-weight: bold;
    font-size: 1.5rem;
}
</style>