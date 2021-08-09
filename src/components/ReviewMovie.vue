<template>
  <div class="review-section bg-gray-100 pb-2">
      <div class="Popular-section">
      <div class="ontv-flex">
      <h1>Social</h1>
      <h1 class="review">Reviews</h1>
      </div>
  </div>
  <div v-if="reviews && reviews.length">
  <div  class="reviews-list" v-for="review in reviews" :key="review.id">
      <div class="single-review bg-white">
          <div class='mr-4'>
          <div class="review-img-container">
              <img v-if="review.author_details.avatar_path" :src="'https://image.tmdb.org/t/p/w64_and_h64_face'+ review.author_details.avatar_path" alt="">
              <img v-else src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg" alt="">
          </div>
          </div>
          <div>
              <h1 class='font-bold text-lg text-black'>A review by {{review.author_details.username}}</h1>
              <span class='text-gray-500 text-sm'>Written by <span class='text-black'>{{review.author_details.username}}</span> on {{review.created_at}}</span>
              <p class='text-sm mt-4 text-gray-600'>{{review.content.substr(0, 600) + '...'}}</p>
          </div>
      </div>
  </div>
  </div>
  <div class="reviews-list pb-8" v-else>
          <p class='py-4'>We don't have any reviews for {{tv.title}}.</p>
  </div>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
export default {
    props:['id','tv'],
    setup(props) {
        const reviews = ref(null)
     const getReviews = async (id)=>{
            const res = await fetch(`https://api.themoviedb.org/3/movie/${id}/reviews?api_key=ed1aa33b88ae96e77b8399f90b321035&language=en-US&page=1`)
            const data = await res.json()
            reviews.value = data.results
            console.log(reviews.value)
        }

        getReviews(props.id)


        return{reviews}
    }
}
</script>