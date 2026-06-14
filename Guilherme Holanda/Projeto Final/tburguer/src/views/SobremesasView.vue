<template>
  <div>
    <h1>Sobremesas</h1>
    <div id="scroll-horizontal">
      <div id="card-content" v-for="item in listaSobremesas" :key="item.id">
        <div id="card-linha">
          <div class="foto-item">
            <img :src="item.foto" alt="foto do item" />
            <div class="card-coluna">
              <p id="nome-content">{{ item.nome }}</p>
              <p id="preco-content">R$ {{ item.valor }},00</p>
              <p id="descricao-content">{{ item.descricao }}</p>
              <button @click="selecionarItem(item)">Selecionar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "SobremesasView",
  data() {
    return {
      listaSobremesas: [],
    };
  },
  methods: {
    async consultarMenu() {
      const response = await fetch(`${this.$apiUrl}/menu_sobremesas`);
      const dados = await response.json();
      this.listaSobremesas = dados;
    },
    selecionarItem(itemSelecionado) {
      const param = JSON.stringify(itemSelecionado);
      const itemJson = encodeURIComponent(param);
      this.$router.push({ path: "/config-simples", query: { item: itemJson } });
    },
  },
  mounted() {
    this.consultarMenu();
  },
};
</script>
<style scoped></style>