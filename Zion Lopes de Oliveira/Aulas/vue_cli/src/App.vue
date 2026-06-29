<template>
  <div>
    <h1>Meu App Vue</h1>    <img alt="Vue logo" src="./assets/logo.png" />

    <p class="subtitulo">Meu Subtitulo</p>
    <br />
    <home-component />
    <br>
    <usuario-component v-show="isUsuarioVisivel" />
    <br>
    <estilo-component/>
    <br>
    <imagem-component 
    larguraImg = "100"
    urlImg ="https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg"/>
    <br>
    <imagem-component 
    @visibilidade-img="escutarVisibilidadeImg"
    urlImg ="https://cdn.mos.cms.futurecdn.net/v2/t:0,l:420,cw:1080,ch:1080,q:80,w:1080/TVR7E3Kuzg2iRhKkjZPeWk.jpg" 
    larguraImg = "100"/>

  </div>
</template>

<script>
import HomeComponent from './components/HomeComponent.vue';
import UsuarioComponent from './components/UsuarioComponent.vue';
import EstiloComponent from './components/EstiloComponent.vue';
import ImagemComponent from './components/ImagemComponent.vue';

export default {
  name: "App",
  components: {
    HomeComponent,
    UsuarioComponent,
    EstiloComponent,
    ImagemComponent,
  },
  data(){
    return{
      isUsuarioVisivel: false,
    };
  },
  methods: {
    escutarVisibilidadeImg(isImgComponentVisivel){
      this.isUsuarioVisivel = !isImgComponentVisivel;
    }
  },
  created(){
    console.log("created")
  },
  mounted(){
    console.log("mouted")
  },
  updated() {
    console.log("updated")
  },
  errorCaptured(){
    console.log("erro")
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

h1{
  color: darkmagenta;
}

.subtitulo{
  color: darkseagreen;
  font-family: "Gill Sans";
  text-align: center;
}
</style>
