<template>
<div class="spin">

</div>
  
</template>



<style>

.spin{
    width: 100px;
    height: 100px;
    background-color: rgb(255, 255, 255);
    margin: 2rem auto;
    border-radius: 50%;
    padding: 1rem;
    border-top: orangered solid 3px;
    animation: spin 1s ease infinite;
}
@keyframes spin {

    to{transform: rotateZ(360deg);}
    
}
</style>