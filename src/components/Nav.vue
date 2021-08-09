<template>
  <nav class='text-white'>
      <div class="nav-flex">
          <router-link :to="{name:'Home'}">
            <img class='h-6' src="../assets/logo.svg" alt="">
          </router-link>
          <router-link :to="{name:'Movies'}">
            Movies
          </router-link>
            <router-link :to="{name:'Tvs'}">
            Tv
          </router-link>
            <a href="#">People</a>
            <a href="#">More</a>
      </div>
  </nav>
</template>

<script>

export default {

}
</script>

<style>

nav{
    background: rgb(3, 36, 63);
}
.nav-flex{
  display: flex;
  align-items: center;
  padding: 1.5rem 2.5rem;
}
.nav-flex img{
  margin-right: .5rem;
}
.nav-flex a {
  margin-right: 2rem;
  font-weight: bold;
  font-size: .9rem;
}

</style>