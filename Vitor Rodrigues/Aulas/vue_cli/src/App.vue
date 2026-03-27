<template>
  <div>
    <img alt="Vue logo" src="./assets/logo.png" />
    <h1>Meu App vue</h1>
    <p class="subtitulo">Meu subtitulo</p>
    <br />
    <usuario-component />
    <br />
    <estilo-component />
  </div>
</template>

<script>
import EstiloComponent from "./components/EstiloComponent.vue";
import UsuarioComponent from "./components/UsuarioComponent.vue";
export default {
  name: "App",
  components: {
    UsuarioComponent,
    EstiloComponent,
  },
  created(){
    console.log("created")
  },
  mounted(){
    console.log("mounted")
  },
  update(){
    console.log("update")
  },
  errorCaptured(){
    console.log("error")
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
  margin-top: 60px;
}
h1 {
  color: darkmagenta;
  text-align: center;
}
.subtitulo {
  color: darkseagreen;
  font-family: "Gill Sans";
  text-align: center;
}
</style>
