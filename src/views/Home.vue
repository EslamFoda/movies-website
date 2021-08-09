<template>

<Nav/>
<Hero/>
<Popular/>
<Trending/>
<Leaderboard/>
<Footer/>
</template>

<script>
import Nav from '../components/Nav.vue'
import Hero from '../components/Hero.vue'
import Popular from '../components/Popular.vue'
import Trending from '../components/Trending.vue'
import Leaderboard from '../components/Leaderboard.vue'
import Footer from '../components/Footer.vue'
export default {
  components:{Nav,Hero,Popular,Trending,Leaderboard,Footer},
  setup(props) {
   

  }

}
</script>

<style>

</style>