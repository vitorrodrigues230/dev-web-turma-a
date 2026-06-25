<template>
  <div>
    <h1>Configuração do Pedido</h1>
    <h2>Escolha seus acompanhamentos e como vai ser a montagem do seu cachorro quente</h2>
    <pedido-component-vue :hotdog="this.hotdogSelecionado" />
  </div>
</template>

<script>
import PedidoComponentVue from "@/components/PedidoComponent.vue";

export default {
  name: "ConfiguracaoPedidoView",
  components: {
    PedidoComponentVue,
  },
  data() {
    return {
      hotdogSelecionado: null,
    };
  },
  mounted() {
    const query = this.$route.query;
    if (query.hotdog) {
      const decodeHotdog = JSON.parse(decodeURIComponent(query.hotdog));
      this.hotdogSelecionado = decodeHotdog;
    }
  },
};
</script>

<style scoped></style>