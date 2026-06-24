<template>
  <div>
    <NavBarComponent />
    <BannerComponent />
    <router-view />
  </div>
</template>
<script>
import NavBarComponent from "./components/NavBarComponent.vue";
import BannerComponent from "./components/BannerComponent.vue";
export default {
  name: "App",
  components: {
    NavBarComponent,
    BannerComponent,
  },
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

/* ===== CSS Global dos cards do menu (compartilhado pelas telas de categoria) ===== */
#card-content {
  display: inline-block;
  width: 280px;
  min-height: 500px;
  margin: 20px;
  border: 1px solid #ddd;
  border-radius: 15px;
  box-shadow: 0 4px 8px #444;
  position: relative;
  overflow: hidden;
}

#scroll-horizontal {
  flex: 1;
  overflow-x: auto;
  white-space: nowrap;
  width: 700px;
  margin: 0 auto;
  box-shadow: inset -10px 0px 15px -15px grey;
}

.foto-item img {
  width: 100%;
  object-fit: cover;
  max-height: 200px;
  border-radius: 10px 0 0;
}

#nome-content {
  font-size: 25px;
  font-weight: bold;
  text-align: center;
  width: 100%;
  margin: 12px;
}

#preco-content {
  font-size: 35px;
  text-align: center;
  font-weight: bold;
  color: green;
  margin: 16px;
}

#descricao-content {
  font-size: 16px;
  text-align: left;
  color: gray;
  margin: 16px;
  white-space: pre-line;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 6;
  -webkit-box-orient: vertical;
}

.card-coluna button {
  margin-top: auto;
  padding: 10px;
  background-color: rgb(53, 108, 121);
  color: #fff;
  font-weight: bold;
  border-radius: 8px;
  border: none;
  font-size: 14px;
  width: 80%;
  margin: 20px;
  cursor: pointer;
  transition: 0.5s;
}

.card-coluna button:hover {
  background-color: transparent;
  color: darkslategray;
  border-radius: 8px;
  border: solid 1px rgb(53, 108, 121);
}

/* ===== CSS Global do formulário de pedido (compartilhado pelos componentes de pedido) ===== */
#foto-content {
  margin-bottom: 16px;
  border-radius: 16px;
  position: relative;
  z-index: -1;
  justify-content: center;
  width: 100%;
  height: 180px;
  object-fit: cover;
}

#nome-item-content {
  font-size: 43px;
  font-weight: bold;
  text-align: start;
  margin-bottom: -90px;
  margin-left: 40px;
  color: antiquewhite;
  padding: 16px;
}

#pedido-form {
  max-width: 750px;
  margin: 0 auto;
}

.inputs {
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
}

#pedido-form label {
  font-weight: bold;
  margin-bottom: 16px;
  color: #222;
  padding: 5px 12px;
  flex-direction: start;
  display: flex;
  border-left: 4px solid darkgoldenrod;
}

#pedido-form input[type="text"],
#pedido-form select {
  padding: 12px;
  width: 300px;
  border: solid #222 1px;
  border-radius: 8px;
  height: 20px;
  font-size: 12px;
}

#pedido-form select {
  height: 45px;
}

#opcionais-titulo {
  width: 100%;
}

#pedido-form label.secao-titulo {
  border-left: 8px solid darkgoldenrod;
  background-color: #fbf3e2;
  font-size: 20px;
  padding: 12px 14px;
  width: 100%;
  margin-bottom: 16px;
}

#opcionais-subtitulo {
  display: flex;
  align-items: flex-start;
  align-content: center;
  width: 100%;
  margin-bottom: 12px;
}

.checkbox-container {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 300px;
  margin: 0 auto 8px auto;
}

.checkbox-container span {
  margin-left: 6px;
  font-weight: bold;
}

.submit-btn {
  background-color: #222;
  color: darkgoldenrod;
  font-weight: bold;
  border: none;
  font-size: 18px;
  border-radius: 12px;
  padding: 16px;
  margin: 0 auto;
  cursor: pointer;
  width: 100%;
  height: auto;
  box-sizing: border-box;
  text-align: center;
  transition: 0.5s;
}

.submit-btn:hover {
  background-color: darkgoldenrod;
  color: #222;
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
