<template>
  <div>
    <nav id="nav">
      <router-link to="/" id="logo-url">
        <span id="logo">☕</span>
        <span id="logo-nome">Café Dois Dedim</span>
      </router-link>
      <router-link to="/">Home</router-link> |
      <router-link to="/menu">Cardápio</router-link> |
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
  font-size: 2rem;
  transition: 0.2s;
  display: inline-block;
}

#logo-nome {
  font-size: 1.1rem;
  color: #F5E6C8;
  font-family: Georgia, serif;
  margin-left: 8px;
  letter-spacing: 0.04em;
}

#nav #logo-url {
  margin: auto;
  margin-left: 0;
  display: flex;
  align-items: center;
  text-decoration: none;
}

#logo:hover {
  transform: rotate(20deg) scale(1.2);
  display: inline-block;
}

#nav {
  background-color: #1C0A00;
  border-bottom: #C47A2B 4px solid;
  padding: 15px 50px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

#nav a {
  color: #C47A2B;
  text-decoration: none;
  margin-left: 20px;
  font-size: 18px;
}

#nav a:hover {
  color: #F5E6C8;
  font-size: 22px;
  transition: 0.2s;
}
</style>