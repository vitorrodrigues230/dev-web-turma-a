<template>
  <div id="main-banner">
    <h1>Pizza Artesanal</h1>
  </div>
</template>
<script>
export default {
  name: "BannerComponent",
};
</script>
<style scoped>
#main-banner {
  background-image: url("https://images.pexels.com/photos/1166120/pexels-photo-1166120.jpeg?auto=compress&cs=tinysrgb&w=1260");
  height: 300px;
  background-position: center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

#main-banner h1 {
  font-size: 40px;
  color: #f5f5f5;
  background: #1a1a2e;
  padding: 25px;
  border-radius: 100px 0px 0px 100px;
}
</style>
