<template>
  <div id="main-banner">
    <h1>Café Dois Dedim ☕</h1>
  </div>
</template>

<script>
export default {
  name: "BannerComponent",
};
</script>

<style scoped>
#main-banner {
  background: linear-gradient(135deg, #1C0A00 0%, #3B1A08 60%, #C47A2B 100%);
  height: 300px;
  background-position: center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

#main-banner h1 {
  font-size: 40px;
  color: #F5E6C8;
  background: rgba(28, 10, 0, 0.75);
  padding: 25px;
  border-radius: 100px 0px 0px 100px;
  letter-spacing: 0.04em;
}
</style>