<template>
  <div>
    <form id="pedido-form" @submit="criarPedido($event)">
      <div>
        <p id="nome-item-content">
          {{ item && item.nome ? item.nome : "-" }}
        </p>
        <img id="foto-content" :src="item && item.foto ? item.foto : ''" />
      </div>
      <div class="inputs">
        <label for="nome-cliente">Nome</label>
        <input
          type="text"
          v-model="nomeCliente"
          id="nome-cliente"
          name="nome-cliente"
          placeholder="Digite seu Nome"
        />
      </div>
      <div class="inputs">
        <label id="opcionais-titulo"> Que tal um acompanhamento?</label>

        <div
          class="checkbox-container"
          v-for="acompanhamento in listaAcompanhamentos"
          :key="acompanhamento.id"
        >
          <input
            type="checkbox"
            :name="acompanhamento.nome"
            :value="acompanhamento"
            v-model="listaAcompanhamentosSelecionados"
          />
          <span>{{ acompanhamento.nome }}</span>
        </div>
        <div class="inputs">
          <input type="submit" class="submit-btn" value="Confirmar Pedido" />
        </div>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  name: "PedidoSimplesComponent",
  props: {
    item: null,
  },
  data() {
    return {
      listaAcompanhamentos: [],
      nomeCliente: "",
      listaAcompanhamentosSelecionados: [],
    };
  },
  methods: {
    async getOpcionais() {
      const response = await fetch(`${this.$apiUrl}/acompanhamentos`);
      this.listaAcompanhamentos = await response.json();
    },
    async criarPedido(e) {
      e.preventDefault();

      const dadosPedido = {
        nome: this.nomeCliente,
        acompanhamentos: Array.from(this.listaAcompanhamentosSelecionados),
        item: this.item,
        statusId: 5,
      };

      const dadosJson = JSON.stringify(dadosPedido);

      await fetch(`${this.$apiUrl}/pedidos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: dadosJson,
      });
    },
  },
  mounted() {
    this.getOpcionais();
  },
};
</script>
<style scoped></style>
