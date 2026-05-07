<template>
    <div>
        <h1>NavBarComponent</h1>
    <nav id="nav">
        <router-link to="/">
            <img src="/img/logo_tburguer.png" alt="Logo" />
        </router-link> |
        <router-link to="/">Menu</router-link> |
        <router-link to="/config">Configuração</router-link> |
        <router-link to="/pedidos">Pedidos</router-link>
    </nav>
    </div>
</template>
<script>
export default {
    name: 'NavBarComponent',
};
</script>
<style scoped>

#nav {
  padding: 30px;
}



</style>
  