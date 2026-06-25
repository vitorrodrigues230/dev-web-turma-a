<template>
  <div id="main-banner">
    <h1>Gelato & Cia</h1>
  </div>
</template>
<script>
export default {
  name: "BannerComponent",
};
</script>
<style scoped>
#main-banner {
background-image: url("../../public/img/banner.svg"); 
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

#main-banner h1 {
  font-size: 40px;
  color: antiquewhite;
  background: #333;
  padding: 25px;
  border-radius: 100px 0px 0px 100px;
}
</style>
