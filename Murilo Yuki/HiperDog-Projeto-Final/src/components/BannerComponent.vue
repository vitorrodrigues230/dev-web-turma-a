<template>
    <div id="main-banner">
        <h1>Hiperdog</h1>
    </div>
</template>

<script>
export default {
    name: "BannerComponent"
};
</script>

<style scoped>
#main-banner {
    background-image: url("../assets/banner.png"); 
    height: 300px;
    background-position: 0 -150px;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: flex-end;
}
#main-banner h1 {
    font-size: 40px;
    color: white;
    background: #c0392b; 
    padding: 25px;
    border-radius: 100px 0px 0px 100px;
}
</style>