<template>
  <div class='hero h-80 flex flex-col justify-center px-10'>
      <h1 class='welcome-header'>Welcome.</h1>
      <h2 class='para-hero'>Millions of movies, TV shows and people to discover. Explore now.</h2>
      <form @submit.prevent="handleSearch" class="search-container">
          <input class="hero-input" placeholder="Search for a movie,tv show...." type="text" v-model="search">
          <button class="search-btn">search</button>
      </form>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import { useRouter, useRoute } from 'vue-router'
export default {
    setup(props) {
        const router = useRouter()
        const search = ref('')
        
        const handleSearch = ()=>{
            if(search.value){
                router.push({name:'Search',params:{search:search.value.trim()}})
            }
        }
        


        return{handleSearch,search}
    }
}
</script>

<style>
.hero{
    background: rgba(2, 37, 65, 0.774);
    position: relative;
}
.welcome-header{
    font-size: 3.5rem;
    color:white;
    font-weight: bold;
}
.para-hero{
    color:white;
    font-weight: bold;
    font-size: 1.8rem;
}
.hero::after{
    content: '';
    position: absolute;
    z-index: -1;
    width: 100%;
    height: 100%;
    top: 0;
    right: 0;
    background-image: url(../assets/starwars.jpg);
    background-position: top;
    background-size: cover;
}
.hero-input{
    width: 100%;
    padding: .6rem;
    border-radius: 3rem;
}
.hero-input:focus{
    outline: none;
    
}
.search-btn{
    background: linear-gradient(to right, rgba(30,213,169, 1) 0%, rgba(1,180,228, 1) 100%);
    color: white;
    padding: .6rem 1.5rem;
    font-weight: bold;
    border-radius: 3rem;
    position: absolute;
    top: 0;
    right: 0;
}
.search-btn:hover{
    color: black;
}
.search-container{
    position: relative;
    margin-top: 3rem;
    
}

</style>