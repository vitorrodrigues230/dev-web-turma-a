<template>
  <div>
    <nav id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/bebidas-quentes">Bebidas Quentes</router-link> |
      <router-link to="/bebidas-geladas">Bebidas Geladas</router-link> |
      <router-link to="/sobremesas">Sobremesas</router-link> |
      <router-link to="/pedidos">Pedidos</router-link>
    </nav>
  </div>
</template>
<script>
export default {
  name: "NavBarComponent",
};
</script>
<style scoped>

#nav {
  background-color: #2b1d12;
  border-bottom: #ffc107 4px solid;
  padding: 15px 50px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

#nav a {
  color: #ffc107;
  text-decoration: none;
  margin-left: 20px;
  font-size: 18px;
}

#nav a:hover {
  color: white;
  font-size: 22px;
  transition: 0.2s;
}
</style>