<template>
  <div>
    <nav id="nav">
      <router-link to="/" id="logo-url">
        <img src="https://img.pikbest.com/png-images/20250520/pepperoni-pizza-with-melted-cheese-tomato-sauce-crispy-round-crust_11722490.png!sw800" id="logo" />
      </router-link>
      <router-link to="/">Home</router-link> |
      <router-link to="/menu">Cardapio</router-link> |
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
#logo {
  width: 60px;
  height: 60px;
}

#logo:hover {
  width: 70px;
  height: 70px;
  rotate: 360deg;
  transition: 0.2s;
}

#nav #logo-url {
  margin: auto;
  margin-left: 0;
}

#nav {
  background-color: #1a1a2e;
  border-bottom: #c0392b 4px solid;
  padding: 15px 50px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

#nav a {
  color: #e74c3c;
  text-decoration: none;
  margin-left: 20px;
  font-size: 18px;
}

#nav a:hover {
  color: #f5f5f5;
  font-size: 22px;
  transition: 0.2s;
}
</style>
