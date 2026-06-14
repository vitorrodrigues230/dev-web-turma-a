<template>
  <div id="home">
    <h1>Bem-vindo ao Cafezão Do Bom</h1>
    <p>
      O melhor da cafeteria, do café fresquinho às sobremesas caseiras. Escolha
      uma categoria no menu acima e monte o seu pedido.
    </p>
  </div>
</template>
<script>
export default {
  name: "HomeView",
};
</script>
<style scoped>
#home {
  max-width: 700px;
  margin: 40px auto;
  padding: 20px;
}

#home h1 {
  color: #333;
}

#home p {
  font-size: 18px;
  color: gray;
  margin-top: 16px;
}
</style>
