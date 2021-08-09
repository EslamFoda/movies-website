<template>
<div class="footer">
    <div class="footer-top">
        <div class="footer-box-left">
            <h1 class="logo">TMDB</h1>
            <p>Millions of movies, TV shows and people to discover. Explore now.</p>
        </div>
        <div class="footer-box">
            <h5>Customer Care</h5>
            <div class="footer-line"></div>
            <h5 href="#">About Us</h5>
            <h5 href="#">Privacy Policy</h5>
            <h5 href="#">Terms & Conditions</h5>
            <h5 href="#">Leaderboard</h5>
            <h5 href="#">System Status</h5>
        </div>
        <div class="footer-box">
            <h5>GET INVOLVED</h5>
            <div class="footer-line"></div>
            <h5 href="#">Pagination</h5>
            <h5 href="#">Terms & Conditions</h5>
            <h5 href="#">Add New Tv Show</h5>
            <h5 href="#">Add New Movie</h5>
            <h5 href="#">Term of use</h5>
        </div>
        <div class="footer-box">
            <h5>Company</h5>
            <div class="footer-line"></div>
            <h5 href="#">Help Center</h5>
            <h5 href="#">Address</h5>
            <h5 href="#">Privacy Policy</h5>
            <h5 href="#">Receivers & Amplifiers</h5>
            <h5 href="#">Api</h5>
        </div>
    </div>
    <div class="footer-bottom">
        <p>© Copyright 2021 | Made By <span class="myName">Eslam Mohamed.</span> Powered by <span class="vue">Vue js</span>.</p>
    </div>
</div>
</template>

<script>
export default {

}
</script>

<style>
.logo{
   background-image: linear-gradient(to right, rgba(30,213,169, 1) 0%, rgba(1,180,228, 1) 100%);
    background-size: 100%;
    -webkit-background-clip: text;
    -moz-background-clip: text;
    -webkit-text-fill-color: transparent; 
    -moz-text-fill-color: transparent;
    margin-bottom: 1rem;
    font-weight: bold;
    font-size: 2rem;
}
.footer-icons{
    display: flex;
}
.footer-icons img{
    width: 1rem;
    height: 1rem;
}
.footer-top{
    display: grid;
    grid-template-columns: repeat(4,1fr);
    gap: 1rem;
    border-bottom: 1px solid #25e083;
    border-top: 1px solid rgba(0, 0, 0, 0.186);
    background: rgb(3, 36, 63);
    color: white;
}
.footer-box-left{
    padding: 1.3rem 1rem;
    line-height: 1.5;
}
.footer-icons{
    margin: 2rem 0;
}
.footer-icons img{
    margin-right: 1rem;
    cursor: pointer;
}

.footer-box{
    padding: 0 .5rem;
    padding: 1rem 1rem;
}
.footer-box h5{
    transition: all .3s ease;
    width: fit-content;
    margin: .7rem 0;
}
.footer-box h5:hover{
    cursor: pointer;
    color: #25e083;
}
.footer-line{
    width: 2rem;
    height: 1px;
    background-color: #25e083;
    margin: .5rem 0 1.5rem 0;
}
.myName{
    color: gray;
    cursor: pointer;
}
.myName:hover{
    border-bottom: 1px solid #25e083;

}
.vue{
    color: rgb(20, 199, 136);
}
.footer-bottom{
    padding: 1rem 1rem;
     background: rgb(3, 36, 63);
     color: white;
}

</style>