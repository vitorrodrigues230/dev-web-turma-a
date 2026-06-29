<template>
  <div>
    <h1>Menu</h1>
    <div id="scroll-horizontal">
      <div
        id="card-content"
        v-for="salgado in listaMenuSalgados"
        :key="salgado.id"
      >
        <div id="card-linha">
          <div class="foto-hamburguer">
            <img :src="salgado.foto" alt="nome do salgado" />
            <div class="card-coluna">
              <p id="nome-content">{{ salgado.nome }}</p>
              <p id="preco-content">R$ {{ salgado.valor }},00</p>
              <p id="descricao-content">{{ salgado.descricao }}</p>
              <button @click="selecionarSalgado(salgado)">Selecionar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "MenuView",
  data() {
    return {
      listaMenuSalgados: [],
    };
  },
  methods: {
    async consultarMenu() {
      const response = await fetch("http://localhost:3000/menu");
      const dados = await response.json();
      this.listaMenuSalgados = dados.salgados;
      console.log(this.listaMenuSalgados);
    },
    selecionarSalgado(salgadoSelecionado) {
      const param = JSON.stringify(salgadoSelecionado);
      const salgadoJson = encodeURIComponent(param);
      this.$router.push({ path: "/config", query: { salgado: salgadoJson } });
    },
  },
  mounted() {
    this.consultarMenu();
  },
};
</script>
<style scoped>
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

.foto-hamburguer img {
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
</style>
