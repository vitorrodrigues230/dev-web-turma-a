<template>
  <div>
    <h1>Bebidas Quentes</h1>
    <div id="scroll-horizontal">
      <div id="card-content" v-for="item in listaBebidasQuentes" :key="item.id">
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
  name: "BebidasQuentesView",
  data() {
    return {
      listaBebidasQuentes: [],
    };
  },
  methods: {
    async consultarMenu() {
      const response = await fetch(`${this.$apiUrl}/menu_bebidas_quentes`);
      const dados = await response.json();
      this.listaBebidasQuentes = dados;
    },
    selecionarItem(itemSelecionado) {
      const param = JSON.stringify(itemSelecionado);
      const itemJson = encodeURIComponent(param);
      this.$router.push({ path: "/config-quente", query: { item: itemJson } });
    },
  },
  mounted() {
    this.consultarMenu();
  },
};
</script>
<style scoped></style>
